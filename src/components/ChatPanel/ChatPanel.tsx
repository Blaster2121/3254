import React, { useState } from 'react'
import { Message } from '../../types'
import './ChatPanel.css'

interface ChatPanelProps {
  messages: Message[]
  inputValue: string
  onInputChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onFileUpload: (file: File) => void
  isLoading: boolean
  error: string | null
  onClearError: () => void
  // Auth UI
  isAuthenticated?: boolean
  isEnvAuthenticated?: boolean
  showAuthPanel?: boolean
  authExpanded?: boolean
  toggleAuthExpanded?: () => void
  openPoeSite?: () => void
  manualCookies?: string
  onManualCookiesChange?: (v: string) => void
  onSubmitManualCookies?: () => void
  onClearAuthentication?: () => void
  onCloseAuthPanel?: () => void
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  inputValue,
  onInputChange,
  onSend,
  onKeyPress,
  onFileUpload,
  isLoading,
  error,
  onClearError,
  isAuthenticated = false,
  isEnvAuthenticated = false,
  showAuthPanel = false,
  authExpanded = false,
  toggleAuthExpanded,
  openPoeSite,
  manualCookies = '',
  onManualCookiesChange,
  onSubmitManualCookies,
  onClearAuthentication,
  onCloseAuthPanel,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showDeploymentMessage, setShowDeploymentMessage] = useState(() => {
    try {
      return localStorage.getItem('hide_deployment_message') !== 'true'
    } catch {
      return true
    }
  })
  const [isDeploymentMessageExpanded, setIsDeploymentMessageExpanded] = useState(() => {
    try {
      return localStorage.getItem('deployment_message_expanded') !== 'false'
    } catch {
      return true
    }
  })

  const hideDeploymentMessage = () => {
    try {
      localStorage.setItem('hide_deployment_message', 'true')
    } catch {}
    setShowDeploymentMessage(false)
  }

  const toggleDeploymentMessage = () => {
    const newState = !isDeploymentMessageExpanded
    try {
      localStorage.setItem('deployment_message_expanded', String(newState))
    } catch {}
    setIsDeploymentMessageExpanded(newState)
  }
  
  const formatDisplayContent = (text: string): string => {
    if (!text) return text
    let out = text
    out = out.replace(/^Doccie+/, '')
    out = out.replace(/\s*(?:[|·]\s*)?View\s+sources\s*(?=(\d{1,2}:\d{2}\s?(AM|PM))\s*$)/i, '')
    out = out.replace(/(\d{1,2}:\d{2}\s?(AM|PM))$/i, '[$1]')
    return out
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Legal Assistant</h2>
        {isAuthenticated ? (
          <div style={{ fontSize: '12px', color: '#4caf50', display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '5px' }}>
            <span>✓ Authenticated</span>
            {onClearAuthentication && (
              <button onClick={onClearAuthentication} style={{ background: 'transparent', color: 'lightgrey', border: 'none', borderRadius: 4, padding: '0 6px', cursor: 'pointer' }} title="Clear authentication">
                ↻
              </button>
            )}
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: '#f44336', display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '5px' }}>
            <span>✕ Not authenticated</span>
          </div>
        )}
      </div>

      <div style={{
        margin: '10px 10px 4px 10px',
        padding: '12px 16px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '6px',
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#856404'
      }}>
        <strong>⚠️ Disclaimer:</strong> Nothing in this Tool is intended to be nor should be construed as legal advice. This is an educational project created by students. Please consult your lawyer for legal advice.
      </div>

       {showDeploymentMessage && (
        <div style={{
          margin: '10px',
          padding: isDeploymentMessageExpanded ? '12px 16px' : '4px 16px',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '6px',
          fontSize: '12px',
          lineHeight: '1.5',
          color: '#856404'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={toggleDeploymentMessage}>
            <strong>⚠️ Message:</strong>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                toggleDeploymentMessage()
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#856404',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                fontWeight: 600,
                opacity: 0.8
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.background = 'rgba(133, 100, 4, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8'
                e.currentTarget.style.background = 'transparent'
              }}
              aria-label={isDeploymentMessageExpanded ? "Hide message" : "Show message"}
              title={isDeploymentMessageExpanded ? "Hide message" : "Show message"}
            >
              {isDeploymentMessageExpanded ? 'Hide' : 'Show'}
            </button>
          </div>
          {isDeploymentMessageExpanded && (
            <div style={{ marginTop: '8px' }}>
              The infrastructure and code we developed are fully capable of integrating our POE bot into this webpage, enabling users to interact with it directly in this chat space. This is demonstrated in our presenation video. However, due to budget constraints, we couldn't find suitable deployment tools that can deploy both the frontend and backend of our software. As a result, currently the backend of the software is not deployed and users cannot chat with our POE bot directly on our website. To try our POE legal bot, please visit <a href="https://poe.com/Doccie" target="_blank" rel="noreferrer" style={{ color: '#856404', textDecoration: 'underline' }}>https://poe.com/Doccie</a> directly.
            </div>
          )}
        </div>
      )}

      {showAuthPanel && (
        <div className="auth-prompt-banner" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '12px 16px', margin: '4px 10px 10px 10px', borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>POE Authentication</strong>
              <div style={{ fontSize: 12, opacity: 0.95, color: isAuthenticated ? 'white' : '#ffcccc' }}>
                {isAuthenticated ? 'Authenticated' : 'Not authenticated — click Show to proceed'}
              </div>
            </div>
            {toggleAuthExpanded && (
              <button onClick={toggleAuthExpanded} style={{ background: 'white', color: '#667eea', border: 'none', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}>
                {authExpanded ? 'Hide' : 'Show'}
              </button>
            )}
            {onCloseAuthPanel && (
              <button onClick={onCloseAuthPanel} style={{ background: 'transparent', color: 'white', border: 'none', padding: '6px 10px', cursor: 'pointer', marginLeft: 8 }} aria-label="Close auth panel">×</button>
            )}
          </div>
          {authExpanded && (
            <div style={{ marginTop: 10, background: 'rgba(0,0,0,0.12)', padding: 12, borderRadius: 6 }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                {openPoeSite && (
                  <button onClick={openPoeSite} style={{ background: '#fff', color: '#333', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                    Open poe.com
                  </button>
                )}
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ display: 'block', fontSize: 12 }}>Or paste cookies:</label>
                  <button
                    onClick={() => setShowInfo(true)}
                    title="How to find cookies and risks"
                    style={{
                      background: 'transparent',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.7)',
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      lineHeight: 1,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    aria-label="Authentication help"
                  >
                    i
                  </button>
                </div>
                <textarea rows={3} value={manualCookies} onChange={(e) => onManualCookiesChange && onManualCookiesChange(e.target.value)} style={{ width: '100%', borderRadius: 6, padding: 8, border: 'none', outline: 'none' }} placeholder="p-b=...; p-l=...; ..." />
                {onSubmitManualCookies && (
                  <button onClick={onSubmitManualCookies} style={{ marginTop: 8, background: '#4caf50', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                    Save Cookies
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={onClearError} className="error-close">×</button>
        </div>
      )}

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>Upload your lease document or ask me anything about legal matters!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">{formatDisplayContent(msg.content)}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant loading">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <div className="file-upload-section">
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                onFileUpload(file)
              }
            }}
            style={{ display: 'none' }}
          />
          <label htmlFor="pdf-upload" className="upload-button">
            📄 Upload Lease PDF
          </label>
        </div>
        
        <textarea
          className="chat-input"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          rows={3}
          disabled={isLoading}
          placeholder={isLoading ? "AI is thinking..." : "Type your legal question here..."}
        />
        <button 
          className="send-button" 
          onClick={onSend}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* (floating info button removed; info icon moved into auth box) */}

      {/* Info modal */}
      {showInfo && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowInfo(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(680px, 92vw)',
              maxHeight: '80vh',
              overflowY: 'auto',
              background: 'white',
              borderRadius: 10,
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              padding: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0 }}>Authentication Help & Risks</h3>
              <button onClick={() => setShowInfo(false)} style={{ border: 'none', background: 'transparent', fontSize: 22, cursor: 'pointer' }} aria-label="Close">×</button>
            </div>

            <div style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>
              <div style={{ marginBottom: 14, padding: '10px 12px', background: '#fff8e1', borderLeft: '4px solid #ffb300', borderRadius: 6 }}>
                This app can authenticate with POE in two ways: opening poe.com to log in, or pasting your Cookie string manually.
              </div>

              <h4 style={{ margin: '14px 0 6px' }}>How to find your POE cookies (Chrome/Edge/Brave):</h4>
              <ol style={{ paddingLeft: 20, margin: '6px 0 12px' }}>
                <li>Open <a href="https://poe.com/Doccie" target="_blank" rel="noreferrer">poe.com/Doccie</a> and log in.</li>
                <li>Press F12 (or Cmd+Opt+I) to open DevTools.</li>
                <li>Go to Network → receive_POST → Cookie.</li>
                <li>Copy the values of relevant cookies (for example: <code>p-b=...; p-l=...; other=...</code>).</li>
                <li>Paste into the app.</li>
              </ol>

              <h4 style={{ margin: '14px 0 6px' }}>Potential risks:</h4>
              <ul style={{ paddingLeft: 20, margin: '6px 0 12px' }}>
                <li>Anyone with access to your browser profile can potentially use saved cookies.</li>
                <li>Cookies can expire; you may need to re-authenticate or paste again.</li>
                <li>Only paste your cookies into apps you trust. Clearing them removes access.</li>
              </ul>

              <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowInfo(false)}
                  style={{ background: '#667eea', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPanel
