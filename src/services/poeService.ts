// POE Integration Service for Legal Assistant
// This service can be adapted based on your specific POE setup

export interface POEConfig {
  apiUrl: string
  apiKey?: string
  botId?: string
  model?: string
  timeout?: number
  backendUrl?: string
}

export interface POEMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface POEResponse {
  message: string
  success: boolean
  error?: string
  metadata?: {
    model: string
    tokens?: number
    timestamp: string
  }
}

export interface LegalQueryContext {
  query: string
  uploadedPDF?: {
    text: string
    name: string
  }
  previousMessages?: POEMessage[]
}

// Local helper to read cookies stored by the app
const getPOECookies = (): string | null => {
  try {
    return localStorage.getItem('poe_cookies')
  } catch {
    return null
  }
}

// Stable bot path handling within a page session
export const defaultBotPath = process.env.REACT_APP_POE_DEFAULT_BOT_PATH || '/Doccie'
export const getCurrentBotPath = (): string => {
  try {
    const stored = sessionStorage.getItem('poe_bot_path')
    if (stored && stored.trim()) {
      return stored.startsWith('/') ? stored : `/${stored}`
    }
    return defaultBotPath
  } catch {
    return defaultBotPath
  }
}
export const setCurrentBotPath = (path: string): void => {
  try {
    const normalized = path && path.startsWith('/') ? path : `/${path || ''}`
    sessionStorage.setItem('poe_bot_path', normalized)
  } catch {}
}

class POEService {
  private config: POEConfig

  constructor(config: POEConfig) {
    this.config = config
  }

  /**
   * Send a legal query to POE chatbot
   */
  async sendLegalQuery(context: LegalQueryContext): Promise<POEResponse> {
    try {
      // Prepare the message with legal context
      const legalPrompt = this.buildLegalPrompt(context)
      
      // Send request to POE API
      const response = await this.makePOERequest(legalPrompt)
      
      return {
        message: response.message,
        success: true,
        metadata: {
          model: this.config.model || 'default',
          timestamp: new Date().toISOString()
        }
      }
    } catch (error) {
      return {
        message: 'Sorry, I encountered an error processing your legal query.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Build a comprehensive legal prompt for POE
   */
  private buildLegalPrompt(context: LegalQueryContext): string {
    let prompt = `You are a legal assistant specializing in tenant rights and lease agreements. 

Context:
- User Query: "${context.query}"

Instructions:
- Provide clear, practical legal advice
- Focus on tenant protection and rights
- Suggest specific actions the user can take
- Always recommend consulting with a qualified attorney for complex matters
- Be empathetic and supportive in your responses
`

    // Add PDF context if available
    if (context.uploadedPDF) {
      prompt += `
Document Analysis:
- Document Name: ${context.uploadedPDF.name}
- Document Content: ${context.uploadedPDF.text}

Please analyze this document in relation to the user's query and provide specific insights.
`
    }

    // Add conversation history if available
    if (context.previousMessages && context.previousMessages.length > 0) {
      prompt += `
Previous Conversation:
${context.previousMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
`
    }

    return prompt
  }

  /**
   * Make the actual request to POE API
   * This method needs to be customized based on your POE setup
   */
  private async makePOERequest(prompt: string): Promise<{ message: string }> {
    // Strict mode: require backend URL; do not call Poe API directly
    if (!this.config.backendUrl) {
      throw new Error('BACKEND_NOT_CONFIGURED')
    }
    // Ensure stable bot across requests in this page session
    if (!sessionStorage.getItem('poe_bot_path')) {
      setCurrentBotPath(defaultBotPath)
    }
    const botPath = getCurrentBotPath()

    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    const cookies = getPOECookies()
    if (cookies) {
      headers['x-poe-cookies'] = cookies
    }

    const resp = await fetch(this.config.backendUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message: prompt, botPath })
    })
    if (!resp.ok) {
      const text = await resp.text()
      throw new Error(`Backend Poe error: ${resp.status} - ${text}`)
    }
    const data = await resp.json()
    return { message: data.message || 'No response received' }
  }

  /**
   * POE.com specific integration
   * This handles the POE.com web interface integration
   */
  private async makePOEComRequest(prompt: string): Promise<{ message: string }> {
    try {
      // For POE.com, we need to simulate the web interface interaction
      // This is a simplified approach - you may need to adjust based on POE.com's actual API
      
      const response = await fetch('https://poe.com/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Bot-ID': this.config.botId || ''
        },
        body: JSON.stringify({
          message: prompt,
          bot: this.config.botId,
          model: this.config.model
        })
      })

      if (!response.ok) {
        // If the API endpoint doesn't exist, try alternative approach
        throw new Error(`POE.com API error: ${response.status}`)
      }

      const data = await response.json()
      return { message: data.message || data.response || data.text || 'No response received' }
      
    } catch (error) {
      console.error('POE.com API Error:', error);
      // Fallback: Since POE.com might not have a direct API, 
      // we'll provide a helpful message about the integration
      throw new Error(`POE.com API Error: ${error instanceof Error ? error.message : 'Unknown error'}. POE.com may not have a public API endpoint. Consider using a different AI service or implementing a custom integration.`)
    }
  }

  /**
   * Direct API call to POE
   */
  private async makeDirectAPICall(prompt: string): Promise<{ message: string }> {
    const response = await fetch(this.config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        ...(this.config.botId && { 'X-Bot-ID': this.config.botId })
      },
      body: JSON.stringify({
        message: prompt,
        model: this.config.model,
        ...(this.config.botId && { bot_id: this.config.botId })
      })
    })

    if (!response.ok) {
      throw new Error(`POE API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return { message: data.message || data.response || data.text }
  }

  /**
   * Webhook-based integration
   */
  private async makeWebhookCall(prompt: string): Promise<{ message: string }> {
    // This would trigger a webhook to your POE instance
    // Implementation depends on your POE webhook setup
    const response = await fetch(`${this.config.apiUrl}/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        bot_id: this.config.botId,
        message: prompt,
        callback_url: `${window.location.origin}/api/poe-callback`
      })
    })

    if (!response.ok) {
      throw new Error(`POE webhook error: ${response.status}`)
    }

    // For webhook integration, you might need to implement a polling mechanism
    // or use WebSockets to get the response
    return { message: 'Webhook triggered, waiting for response...' }
  }

  /**
   * Custom integration for self-hosted POE instances
   */
  private async makeCustomIntegration(prompt: string): Promise<{ message: string }> {
    // This is for custom POE implementations
    // You would implement the specific integration logic here
    const response = await fetch(`${this.config.apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.config.apiKey || ''
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`Custom POE error: ${response.status}`)
    }

    const data = await response.json()
    return { message: data.choices?.[0]?.message?.content || data.text || 'No response received' }
  }

  /**
   * Test the POE connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.sendLegalQuery({
        query: 'Test connection'
      })
      return response.success
    } catch {
      return false
    }
  }
}

// Factory function to create POE service instance
export const createPOEService = (config: POEConfig): POEService => {
  return new POEService(config)
}

// Default configuration (update with your actual POE details)
export const defaultPOEConfig: POEConfig = {
  apiUrl: process.env.REACT_APP_POE_API_URL || '', // Empty by default
  apiKey: process.env.REACT_APP_POE_API_KEY || '', // Empty by default
  botId: process.env.REACT_APP_POE_BOT_ID || '', // Empty by default
  model: process.env.REACT_APP_POE_MODEL || 'claude-3-sonnet',
  timeout: parseInt(process.env.REACT_APP_POE_TIMEOUT || '30000'),
  backendUrl: process.env.REACT_APP_POE_BACKEND_URL || 'http://localhost:4000/api/poe/ask'
}

// Check if POE is properly configured
export const isPOEConfigured = (): boolean => {
  const isConfigured = !!defaultPOEConfig.backendUrl;
  console.log('POE Configuration Check:', {
    apiUrl: defaultPOEConfig.apiUrl,
    apiKey: defaultPOEConfig.apiKey ? '***configured***' : 'missing',
    botId: defaultPOEConfig.botId,
    backendUrl: defaultPOEConfig.backendUrl ? '***configured***' : 'missing',
    isConfigured
  });
  return isConfigured;
}
