import React, { useState } from 'react'
import { ChatPanel, ResultsPanel } from './components'
import LeaseForm from './components/LeaseForm/LeaseForm'
import { useChat } from './hooks'
import { CLICLeaseData } from './services/clicTemplate'
import './App.css'

type AppMode = 'chat' | 'lease'

function App() {
  const [mode, setMode] = useState<AppMode>('chat')
  const chat = useChat()

  const handleLeaseComplete = (data: CLICLeaseData) => {
    // Show success message or redirect
    alert('Lease agreement generated successfully! Check your downloads folder.')
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Law.Docx</h1>
        <div className="mode-switcher">
          <button 
            className={`mode-button ${mode === 'chat' ? 'active' : ''}`}
            onClick={() => setMode('chat')}
          >
            Tenant & Landlord (Legal Chat)
          </button>
          <button 
            className={`mode-button ${mode === 'lease' ? 'active' : ''}`}
            onClick={() => setMode('lease')}
          >
            Landlord & Real Estate Agent (Lease Generation)
          </button>
        </div>
      </div>

      {mode === 'chat' ? (
        <div className="chat-mode">
          <ChatPanel
            messages={chat.messages}
            inputValue={chat.inputValue}
            onInputChange={chat.setInputValue}
            onSend={chat.handleSend}
            onKeyPress={chat.handleKeyPress}
            onFileUpload={chat.handleFileUpload}
            isLoading={chat.chatState.isLoading}
            error={chat.chatState.error}
            onClearError={chat.clearError}
            // Auth UI
            isAuthenticated={chat.isAuthenticated}
            isEnvAuthenticated={chat.authSource === 'environment'}
            showAuthPanel={chat.showAuthPanel}
            authExpanded={chat.authExpanded}
            toggleAuthExpanded={chat.toggleAuthExpanded}
            openPoeSite={chat.openPoeSite}
            manualCookies={chat.manualCookies}
            onManualCookiesChange={chat.setManualCookies}
            onSubmitManualCookies={chat.submitManualCookies}
            onClearAuthentication={chat.openAuthPanel}
            onCloseAuthPanel={chat.closeAuthPanel}
          />
          <ResultsPanel 
            analysisResult={chat.analysisResult}
            uploadedPDF={chat.uploadedPDF}
            leaseAnalysis={null}
            markdownFullResult={chat.markdownFullResult}
          />
        </div>
      ) : (
        <div className="lease-mode">
          <LeaseForm onComplete={handleLeaseComplete} />
        </div>
      )}
    </div>
  )
}

export default App
