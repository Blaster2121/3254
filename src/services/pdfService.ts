import * as pdfjsLib from 'pdfjs-dist'
import { UploadedPDF } from '../types'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

export const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      
      let fullText = ''
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
        
        fullText += pageText + '\n\n'
      }
      
      return fullText.trim()
    } catch (error) {
      console.error('Error extracting text from PDF:', error)
      throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.')
    }
  }
  
export const createPDFObject = async (file: File): Promise<UploadedPDF> => {
  const text = await extractTextFromPDF(file)
  const url = URL.createObjectURL(file)
  
  return {
    file,
    url,
    text,
    name: file.name
  }
}

export const analyzeLeaseDocument = (text: string) => {
  // Simple analysis - just return empty results for now
  // In the future, this could be replaced with real AI analysis
  return {
    risks: [],
    recommendations: [],
    overallRiskLevel: 'low' as const
  }
}
