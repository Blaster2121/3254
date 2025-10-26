import { useState } from 'react'
import { Message, ResultData, ChatState, UploadedPDF } from '../types'
import { createPDFObject } from '../services/pdfService'
import { createPOEService, defaultPOEConfig, LegalQueryContext, isPOEConfigured } from '../services/poeService'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [chatState, setChatState] = useState<ChatState>({
    isLoading: false,
    error: null
  })
  const [analysisResult, setAnalysisResult] = useState<ResultData | null>(null)
  const [uploadedPDF, setUploadedPDF] = useState<UploadedPDF | null>(null)
  
  // Initialize POE service
  const poeService = createPOEService(defaultPOEConfig)

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = { role: 'user', content: inputValue }
    const currentInput = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setChatState({ isLoading: true, error: null })

    try {
      // Check if POE is configured
      console.log('Attempting to send message:', currentInput);
      if (isPOEConfigured()) {
        console.log('POE is configured, attempting to send query...');
        // Prepare context for POE
        const context: LegalQueryContext = {
          query: currentInput,
          uploadedPDF: uploadedPDF ? {
            text: uploadedPDF.text,
            name: uploadedPDF.name
          } : undefined,
          previousMessages: messages.slice(-5) // Include last 5 messages for context
        }

        // Send query to POE
        const poeResponse = await poeService.sendLegalQuery(context)

        if (poeResponse.success) {
          const assistantMessage: Message = { role: 'assistant', content: poeResponse.message }
          setMessages(prev => [...prev, assistantMessage])

          // Generate analysis result based on POE response
          const analysis: ResultData = {
            summary: `Analysis of your query: "${currentInput}". ${poeResponse.message.substring(0, 200)}...`,
            keyPoints: extractKeyPoints(poeResponse.message),
            documentReferences: extractReferences(poeResponse.message),
            recommendations: extractRecommendations(poeResponse.message),
            confidence: 0.85, // Higher confidence with POE
            legalAreas: extractLegalAreas(poeResponse.message)
          }
          setAnalysisResult(analysis)
        } else {
          // Fallback to mock response if POE fails
          throw new Error(poeResponse.error || 'POE service failed')
        }
      } else {
        // POE not configured, use enhanced mock response
        throw new Error('POE_NOT_CONFIGURED')
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      
      // Provide helpful mock response when POE is not configured
      if (errorMessage === 'POE_NOT_CONFIGURED') {
        const mockResponse: Message = {
          role: 'assistant',
          content: `Thank you for your legal question: "${currentInput}".

🤖 **POE Integration Status**: Currently using demo mode. To connect your POE chatbot:

1. **Configure POE API**: Add your POE credentials to the .env file
2. **Restart the application**: Reload the page after configuration
3. **Test the connection**: Try asking another legal question

📋 **Current Features Available**:
- ✅ PDF upload and lease analysis
- ✅ Hong Kong tenancy agreement generation
- ✅ Legal document risk assessment
- 🔄 POE chatbot integration (pending configuration)

For immediate legal assistance, please:
- Upload your lease document for detailed analysis
- Use the Lease Generation tool for tenancy agreements
- Consult with a qualified attorney for specific advice

Would you like help setting up the POE integration?`
        }
        setMessages(prev => [...prev, mockResponse])

        // Generate mock analysis
        const mockAnalysis: ResultData = {
          summary: `Demo analysis of: "${currentInput}". This is a demonstration of the legal analysis system.`,
          keyPoints: [
            'POE integration is available but not yet configured',
            'PDF upload and analysis features are fully functional',
            'Lease generation tool is ready for use'
          ],
          documentReferences: [
            'POE Integration Guide',
            'PDF Upload Documentation',
            'Lease Generation Manual'
          ],
          recommendations: [
            'Configure POE API credentials for enhanced AI responses',
            'Upload lease documents for detailed risk analysis',
            'Use the Lease Generation tool for tenancy agreements'
          ],
          confidence: 0.7,
          legalAreas: ['System Configuration', 'Legal Tools', 'Document Analysis']
        }
        setAnalysisResult(mockAnalysis)
      } else {
        // Other errors - show fallback message
        const errorResponse: Message = {
          role: 'assistant',
          content: `I apologize, but I encountered an error processing your request: "${currentInput}".

Error: ${errorMessage}

Please try again or contact support if the issue persists.`
        }
        setMessages(prev => [...prev, errorResponse])
        setChatState({ isLoading: false, error: errorMessage })
      }
    } finally {
      setChatState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('pdf')) {
      setChatState({ isLoading: false, error: 'Please upload a PDF file only.' })
      return
    }

    setChatState({ isLoading: true, error: null })

    try {
      const pdfObject = await createPDFObject(file)
      setUploadedPDF(pdfObject)
      
      // Clear previous analysis
      setAnalysisResult(null)
      
      // Add a simple message about the upload
      const uploadMessage: Message = {
        role: 'assistant',
        content: `I've successfully uploaded your lease document "${pdfObject.name}". You can now view it in the analysis results panel on the right side.

For detailed lease risk analysis, please visit our specialized POE bot: https://poe.com/Lease_Risks`
      }
      setMessages(prev => [...prev, uploadMessage])
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process PDF'
      setChatState({ isLoading: false, error: errorMessage })
    } finally {
      setChatState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const clearError = () => {
    setChatState(prev => ({ ...prev, error: null }))
  }

  // Helper functions to extract structured data from POE responses
  const extractKeyPoints = (response: string): string[] => {
    const points: string[] = []
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 10)
    
    // Extract key sentences (simple heuristic)
    sentences.forEach(sentence => {
      if (sentence.includes('important') || sentence.includes('note') || sentence.includes('consider')) {
        points.push(sentence.trim())
      }
    })
    
    return points.slice(0, 3) // Limit to 3 key points
  }

  const extractReferences = (response: string): string[] => {
    const references: string[] = []
    
    // Look for legal references
    if (response.toLowerCase().includes('law')) references.push('Relevant legal statutes')
    if (response.toLowerCase().includes('regulation')) references.push('Government regulations')
    if (response.toLowerCase().includes('court')) references.push('Court precedents')
    if (response.toLowerCase().includes('tenant')) references.push('Tenant protection laws')
    
    return references.length > 0 ? references : ['General legal principles']
  }

  const extractRecommendations = (response: string): string[] => {
    const recommendations: string[] = []
    
    // Extract action items
    if (response.toLowerCase().includes('consult')) recommendations.push('Consult with a qualified attorney')
    if (response.toLowerCase().includes('document')) recommendations.push('Document all communications')
    if (response.toLowerCase().includes('review')) recommendations.push('Review your lease agreement carefully')
    if (response.toLowerCase().includes('contact')) recommendations.push('Contact relevant authorities if needed')
    
    return recommendations.length > 0 ? recommendations : ['Seek professional legal advice']
  }

  const extractLegalAreas = (response: string): string[] => {
    const areas: string[] = []
    
    // Identify legal areas mentioned
    if (response.toLowerCase().includes('lease') || response.toLowerCase().includes('rent')) areas.push('Property Law')
    if (response.toLowerCase().includes('tenant')) areas.push('Tenant Rights')
    if (response.toLowerCase().includes('contract')) areas.push('Contract Law')
    if (response.toLowerCase().includes('discrimination')) areas.push('Civil Rights')
    if (response.toLowerCase().includes('eviction')) areas.push('Housing Law')
    
    return areas.length > 0 ? areas : ['General Legal']
  }

  return {
    messages,
    inputValue,
    setInputValue,
    handleSend,
    handleKeyPress,
    handleFileUpload,
    chatState,
    analysisResult,
    uploadedPDF,
    clearError,
  }
}
