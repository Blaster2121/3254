import React from 'react'
import { ResultData, UploadedPDF, LeaseAnalysis } from '../../types'
import './ResultsPanel.css'

interface ResultsPanelProps {
  analysisResult: ResultData | null
  uploadedPDF: UploadedPDF | null
  leaseAnalysis: LeaseAnalysis | null
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ analysisResult, uploadedPDF, leaseAnalysis }) => {
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
        ) : analysisResult ? (
          <div className="result-display">
            <div className="result-section">
              <h3>Summary</h3>
              <p>{analysisResult.summary}</p>
            </div>
            
            <div className="result-section">
              <h3>Key Points</h3>
              <ul>
                {analysisResult.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="result-section">
              <h3>Recommendations</h3>
              <ul>
                {analysisResult.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
            
            <div className="result-section">
              <h3>Document References</h3>
              <ul>
                {analysisResult.documentReferences.map((reference, index) => (
                  <li key={index}>{reference}</li>
                ))}
              </ul>
            </div>
            
            <div className="result-section">
              <h3>Legal Areas</h3>
              <div className="legal-areas">
                {analysisResult.legalAreas.map((area, index) => (
                  <span key={index} className="legal-area-tag">{area}</span>
                ))}
              </div>
            </div>
            
            <div className="result-section">
              <h3>Confidence Score</h3>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${analysisResult.confidence * 100}%` }}
                ></div>
                <span className="confidence-text">
                  {Math.round(analysisResult.confidence * 100)}%
                </span>
              </div>
            </div>
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
