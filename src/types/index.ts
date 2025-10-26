export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ResultData {
  summary: string
  keyPoints: string[]
  documentReferences: string[]
  recommendations: string[]
  confidence: number
  legalAreas: string[]
}

export interface ChatState {
  isLoading: boolean
  error: string | null
}

export interface UploadedPDF {
  file: File
  url: string
  text: string
  name: string
}

export interface LeaseAnalysis {
  risks: LeaseRisk[]
  recommendations: string[]
  overallRiskLevel: 'low' | 'medium' | 'high'
}

export interface LeaseRisk {
  clause: string
  risk: string
  impact: string
  recommendation: string
  severity: 'low' | 'medium' | 'high'
}
