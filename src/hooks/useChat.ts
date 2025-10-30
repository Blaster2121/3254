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
  const [markdownFullResult, setMarkdownFullResult] = useState<string | null>(null)

  const [uploadedPDF, setUploadedPDF] = useState<UploadedPDF | null>(null)
  // Lightweight auth UI state
  const getLocalCookies = (): string | null => {
    try { return localStorage.getItem('poe_cookies') } catch { return null }
  }
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getLocalCookies())
  const [authSource, setAuthSource] = useState<'environment' | 'session' | 'none'>(getLocalCookies() ? 'session' : 'none')
  const [showAuthPanel, setShowAuthPanel] = useState<boolean>(!isAuthenticated)
  const [authExpanded, setAuthExpanded] = useState<boolean>(false)
  const [userForcedAuthPanel, setUserForcedAuthPanel] = useState<boolean>(false)
  const [manualCookies, setManualCookies] = useState<string>('')
  
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

        // Send query to POE (backend first if configured)
        const poeResponse = await poeService.sendLegalQuery(context)

        if (poeResponse.success) {
          const assistantMessage: Message = { role: 'assistant', content: poeResponse.message }
          setMessages(prev => [...prev, assistantMessage])
          setMarkdownFullResult(poeResponse.markdown || poeResponse.message)

          // Generate analysis result based on POE response
          const analysis: ResultData = {
            summary: poeResponse.message,
            keyPoints: extractKeyPoints(poeResponse.message),
            documentReferences: extractReferences(poeResponse.message),
            recommendations: extractRecommendations(poeResponse.message),
            confidence: 0.95, // High confidence with POE
            legalAreas: extractLegalAreas(poeResponse.message),
            fullResponse: poeResponse.message // Store the complete response
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
      
      // Provide helpful response when backend is not configured
      if (errorMessage === 'POE_NOT_CONFIGURED' || errorMessage === 'BACKEND_NOT_CONFIGURED') {
        const mockResponse: Message = {
          role: 'assistant',
          content: `Thank you for your legal question: "${currentInput}".

🤖 Backend integration is not configured yet. This app is set to use a local backend (no Poe API).

To enable it:
1) In server/.env set POE_COOKIE_STRING to the full Cookie header from a logged-in poe.com tab and set POE_BOT_PATH=/Doccie
2) Start the backend: cd server && npm install && npm run dev
3) In the project .env set REACT_APP_POE_BACKEND_URL=http://localhost:4000/api/poe/ask and restart the app

After that, send your question again and I will forward it to your Poe bot automatically.`
        }
        setMessages(prev => [...prev, mockResponse])
        setMarkdownFullResult(mockResponse.content)

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

  // Auth UI handlers
  const toggleAuthExpanded = () => setAuthExpanded(prev => !prev)
  const openPoeSite = () => {
    const url = 'https://poe.com/Doccie'
    try { window.open(url, '_blank') } catch { window.location.href = url }
  }
  const submitManualCookies = () => {
    const value = manualCookies.trim()
    if (!value || !value.includes('=')) {
      setChatState({ isLoading: false, error: 'Please paste a valid Cookie string.' })
      return
    }
    try { localStorage.setItem('poe_cookies', value) } catch {}
    setIsAuthenticated(true)
    setAuthSource('session')
    setShowAuthPanel(false)
    setAuthExpanded(false)
    setManualCookies('')
    // Let the user know
    const msg: Message = { role: 'assistant', content: '✓ Authentication successful. Cookies saved to your browser.' }
    setMessages(prev => [...prev, msg])
  }
  const clearAuthentication = () => {
    try { localStorage.removeItem('poe_cookies') } catch {}
    setIsAuthenticated(false)
    setAuthSource('none')
    setShowAuthPanel(true)
  }
  // Refresh authentication: prioritize manual cookies; if present, show as authenticated
  const refreshAuthentication = async () => {
    const local = getLocalCookies()
    if (local) {
      setIsAuthenticated(true)
      setAuthSource('session')
      setShowAuthPanel(false)
      return
    }
    try {
      const backendUrl = defaultPOEConfig.backendUrl || 'http://localhost:4000/api/poe/ask'
      const baseUrl = backendUrl.replace('/api/poe/ask', '')
      const res = await fetch(`${baseUrl}/api/poe/status`)
      if (res.ok) {
        const status = await res.json()
        setIsAuthenticated(!!status.authenticated)
        setAuthSource(status.source || 'none')
        setShowAuthPanel(!status.authenticated)
      } else {
        setIsAuthenticated(false)
        setAuthSource('none')
        setShowAuthPanel(true)
      }
    } catch {
      setIsAuthenticated(false)
      setAuthSource('none')
      setShowAuthPanel(true)
    }
  }
  const closeAuthPanel = () => {
    setShowAuthPanel(false)
  }
  const openAuthPanel = () => {
    setUserForcedAuthPanel(true)
    setShowAuthPanel(true)
  }

  // On mount, check backend auth status to detect environment cookies
  // If environment-based, mark authenticated and keep panel visible but collapsible
  ;(async () => {
    try {
      const backendUrl = defaultPOEConfig.backendUrl || 'http://localhost:4000/api/poe/ask'
      const baseUrl = backendUrl.replace('/api/poe/ask', '')
      const res = await fetch(`${baseUrl}/api/poe/status`)
      if (res.ok) {
        const status = await res.json()
        if (status.authenticated) {
          setIsAuthenticated(true)
          setAuthSource(status.source === 'environment' ? 'environment' : 'session')
        } else {
          setIsAuthenticated(!!getLocalCookies())
          setAuthSource(getLocalCookies() ? 'session' : 'none')
        }
      } else {
        setIsAuthenticated(!!getLocalCookies())
        setAuthSource(getLocalCookies() ? 'session' : 'none')
      }
      // Auto-hide panel on initial render only if user hasn't explicitly opened it
      if (!userForcedAuthPanel) {
        const hasCookies = !!getLocalCookies() || authSource === 'environment'
        setShowAuthPanel(!hasCookies)
      }
    } catch {
      setIsAuthenticated(!!getLocalCookies())
      setAuthSource(getLocalCookies() ? 'session' : 'none')
      if (!userForcedAuthPanel) {
        setShowAuthPanel(!getLocalCookies())
      }
    }
  })()

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
    markdownFullResult,
    uploadedPDF,
    clearError,
    // Auth UI
    isAuthenticated,
    authSource,
    showAuthPanel,
    authExpanded,
    toggleAuthExpanded,
    openPoeSite,
    manualCookies,
    setManualCookies,
    submitManualCookies,
    clearAuthentication,
    refreshAuthentication,
    closeAuthPanel,
    openAuthPanel,
  }
}
