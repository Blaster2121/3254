import React from 'react'
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
}) => {
  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Legal Assistant</h2>
      </div>

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
              <div className="message-content">{msg.content}</div>
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
    </div>
  )
}

export default ChatPanel
