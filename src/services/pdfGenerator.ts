import jsPDF from 'jspdf'

export interface PDFOptions {
  filename?: string
  title?: string
  author?: string
  subject?: string
}

export const generateLeasePDF = (content: string, options: PDFOptions = {}): void => {
  const doc = new jsPDF()
  
  // Set document properties
  doc.setProperties({
    title: options.title || 'Residential Tenancy Agreement',
    author: options.author || 'Legal Tools Generator',
    subject: options.subject || 'Hong Kong Tenancy Agreement'
  })
  
  // Set font
  doc.setFont('helvetica')
  
  // Split content into lines and add to PDF
  const lines = content.split('\n')
  let yPosition = 20
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  const lineHeight = 7
  
  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage()
      yPosition = 20
    }
    
    // Handle different line types
    if (line.trim() === '') {
      yPosition += lineHeight
    } else if (line.includes('RESIDENTIAL TENANCY AGREEMENT')) {
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text(line, margin, yPosition)
      yPosition += lineHeight * 2
    } else if (line.match(/^\d+\./)) {
      // Section headers
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(line, margin, yPosition)
      yPosition += lineHeight * 1.5
    } else if (line.startsWith('   ')) {
      // Indented content
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text(line.trim(), margin + 10, yPosition)
      yPosition += lineHeight
    } else if (line.includes('LANDLORD:') || line.includes('TENANT:')) {
      // Party information
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(line, margin, yPosition)
      yPosition += lineHeight * 1.2
    } else {
      // Regular content
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.text(line, margin, yPosition)
      yPosition += lineHeight
    }
  })
  
  // Save the PDF
  const filename = options.filename || `tenancy_agreement_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}

export const generateSimplePDF = (text: string, filename: string = 'document.pdf'): void => {
  const doc = new jsPDF()
  
  // Set font
  doc.setFont('helvetica')
  doc.setFontSize(12)
  
  // Split text into lines
  const lines = doc.splitTextToSize(text, 180)
  
  // Add text to PDF
  doc.text(lines, 20, 20)
  
  // Save the PDF
  doc.save(filename)
}
