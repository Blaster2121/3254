import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ResultData, UploadedPDF, LeaseAnalysis } from '../../types'
import './ResultsPanel.css'

interface ResultsPanelProps {
  analysisResult: ResultData | null
  uploadedPDF: UploadedPDF | null
  leaseAnalysis: LeaseAnalysis | null
  markdownFullResult?: string | null
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ analysisResult, uploadedPDF, leaseAnalysis, markdownFullResult }) => {
  const formatDisplayContent = (text: string): string => {
    if (!text) return text
    let out = text
    out = out.replace(/^Doccie+/, '')
    out = out.replace(/\s*(?:[|·]\s*)?View\s+sources\s*(?=(\d{1,2}:\d{2}\s?(AM|PM))\s*$)/i, '')
    out = out.replace(/(\d{1,2}:\d{2}\s?(AM|PM))$/i, '[$1]')
    return out
  }
  const hasMarkdown = !!markdownFullResult
  const hasAnalysis = !!analysisResult
  return (
    <div className="results-panel">
      <div className="results-header">
        <h2>Analysis Results</h2>
      </div>
      <div className="results-content">
        {uploadedPDF ? (
          <div className="pdf-display">
            <div className="pdf-viewer-section">
              <h3>📄 Uploaded Document: {uploadedPDF.name}</h3>
              <div className="pdf-viewer">
                <iframe
                  src={uploadedPDF.url}
                  width="100%"
                  height="600px"
                  style={{ border: '1px solid #ddd', borderRadius: '8px' }}
                  title="PDF Viewer"
                />
              </div>
            </div>
          </div>
        ) : (hasAnalysis || hasMarkdown) ? (
          <div className="result-display">
            {/* Show full POE response if available */}
            {(hasMarkdown || analysisResult!.fullResponse) && (
              <div className="result-section full-response">
                <h3>🤖 Complete Legal Analysis</h3>
                <div className="full-response-content">
                  <div style={{ 
                    fontSize: '14px',
                    lineHeight: '1.6',
                    backgroundColor: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    maxHeight: '600px',
                    overflowY: 'auto'
                  }}>
                    <ReactMarkdown
                      components={{
                        h1: ({children}) => <h1 style={{fontSize: '1.5em', marginTop: '1em', marginBottom: '0.5em'}}>{children}</h1>,
                        h2: ({children}) => <h2 style={{fontSize: '1.3em', marginTop: '1em', marginBottom: '0.5em'}}>{children}</h2>,
                        h3: ({children}) => <h3 style={{fontSize: '1.2em', marginTop: '0.8em', marginBottom: '0.4em'}}>{children}</h3>,
                        h4: ({children}) => <h4 style={{fontSize: '1.1em', marginTop: '0.6em', marginBottom: '0.3em'}}>{children}</h4>,
                        p: ({children}) => <p style={{marginBottom: '0.8em'}}>{children}</p>,
                        ul: ({children}) => <ul style={{marginBottom: '0.8em', paddingLeft: '1.5em'}}>{children}</ul>,
                        ol: ({children}) => <ol style={{marginBottom: '0.8em', paddingLeft: '1.5em'}}>{children}</ol>,
                        li: ({children}) => <li style={{marginBottom: '0.3em'}}>{children}</li>,
                        strong: ({children}) => <strong style={{fontWeight: 'bold'}}>{children}</strong>,
                        em: ({children}) => <em style={{fontStyle: 'italic'}}>{children}</em>,
                        code: ({children}) => <code style={{backgroundColor: '#e9ecef', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em'}}>{children}</code>,
                        blockquote: ({children}) => <blockquote style={{borderLeft: '4px solid #007bff', paddingLeft: '1em', marginLeft: '0', fontStyle: 'italic'}}>{children}</blockquote>,
                        table: ({children}) => <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '1em'}}>{children}</table>,
                        th: ({children}) => <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f8f9fa', fontWeight: 'bold'}}>{children}</th>,
                        td: ({children}) => <td style={{border: '1px solid #ddd', padding: '8px'}}>{children}</td>,
                        hr: () => <hr style={{border: 'none', borderTop: '2px solid #e9ecef', margin: '1.5em 0'}} />
                      }}
                    >
                      {formatDisplayContent((markdownFullResult || analysisResult!.fullResponse) as string)}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
            {hasAnalysis && (
              <>
                <div className="result-section">
                  <h3>Summary</h3>
                  <p>{analysisResult!.summary}</p>
                </div>
                <div className="result-section">
                  <h3>Key Points</h3>
                  <ul>
                    {analysisResult!.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>Recommendations</h3>
                  <ul>
                    {analysisResult!.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>Document References</h3>
                  <ul>
                    {analysisResult!.documentReferences.map((reference, index) => (
                      <li key={index}>{reference}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>Legal Areas</h3>
                  <div className="legal-areas">
                    {analysisResult!.legalAreas.map((area, index) => (
                      <span key={index} className="legal-area-tag">{area}</span>
                    ))}
                  </div>
                </div>
                <div className="result-section">
                  <h3>Confidence Score</h3>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${analysisResult!.confidence * 100}%` }}
                    ></div>
                    <span className="confidence-text">
                      {Math.round(analysisResult!.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <p>Upload your lease document or ask a legal question to see analysis results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultsPanel
