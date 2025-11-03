// CLIC PDF Generator - Client-side function
// This function generates a PDF using jsPDF
import { CLICLeaseData } from './clicTemplate';
import jsPDF from 'jspdf';

// Function to escape LaTeX special characters
function escapeLatex(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\$/g, '\\$')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/_/g, '\\_')
    .replace(/~/g, '\\textasciitilde{}');
}

// Generate LaTeX content from tenancy data
export function generateLatexContent(data: CLICLeaseData): string {
  return `
\\documentclass[a4paper,12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{setspace}
\\usepackage{enumitem}
\\usepackage{ulem}
\\geometry{margin=1in}
\\begin{document}
% Agreement date section
\\begin{center}
\\hspace{6cm} Dated the ${escapeLatex(data.agreementDay)} day of ${escapeLatex(data.agreementMonth)} of ${escapeLatex(data.agreementYear)}
\\vspace{3em}
\\hspace{6cm} \\underline{\\hspace{10cm}}\\\\
\\hspace{6cm} \\textbf{${escapeLatex(data.landlordName)}} \\\\
\\vspace{1em}
\\hspace{6cm} AND \\\\
\\vspace{1em}
\\hspace{6cm} \\textbf{${escapeLatex(data.tenantName)}}
\\vspace{3em}
\\hspace{6cm} \\underline{\\hspace{10cm}}\\\\
\\vspace{1em}
\\hspace{6cm} \\textbf{TENANCY AGREEMENT}\\\\
\\vspace{1em}
\\hspace{6cm} \\textbf{In respect of}\\\\
\\vspace{1em}
\\hspace{6cm} \\textbf{${escapeLatex(data.landlordAddress)}} \\\\
\\hspace{6cm} \\textbf{("the Premises")} \\\\
\\vspace{3em}
\\hspace{6cm}
\\vspace{3em}
\\hspace{6cm} \\underline{\\hspace{10cm}}\\\\
\\end{center}
\\newpage
\\begin{center}
\\textbf{TENANCY AGREEMENT} \\\\
\\end{center}
{}An Agreement made on the ${escapeLatex(data.agreementDay)} day of ${escapeLatex(data.agreementMonth)} of ${escapeLatex(data.agreementYear)}\\\\[2em]
{}BETWEEN\\\\
\\begin{enumerate}[label=\\arabic*), left=0pt, itemsep=1em, topsep=1em]
\\item ${escapeLatex(data.landlordName)} (Holder of Hong Kong Identity Card No ${escapeLatex(data.landlordHKID)}) of ${escapeLatex(data.landlordAddress)} (the "Landlord"); and 
\\item ${escapeLatex(data.tenantName)} (Holder of Hong Kong Identity Card No ${escapeLatex(data.tenantHKID)}) of ${escapeLatex(data.premisesAddress)} (the "Tenant").
\\end{enumerate}
\\begin{enumerate}[left=0pt, itemsep=1em, topsep=1em]
\\item THE PARTIES AGREE AS FOLLOWS:-
\\begin{enumerate}[label=\\alph*., itemsep=1em, topsep=1em]
\\item The Landlord lets and the Tenant takes ALL THAT ${escapeLatex(data.premisesAddress)} (the "Premises") together with the use in common with the Landlord and all others having the like right of all the common areas, common access, entrances, staircase, lifts, passages of the building of which the Premises form part (the "Building") and all the easements and rights appurtenant to the Premises AND together with the furniture and appliances (if any) as set out in Part 1 of the Schedule in this Agreement ("the Furniture") for the Term and at the Rent more particularised in Clauses 1b and 1c of this Agreement. 
\\item The term of this Tenancy Agreement is ${escapeLatex(data.termYears)} YEARS from the ${escapeLatex(data.termStartDay)} day of ${escapeLatex(data.termStartMonth)} of ${escapeLatex(data.termStartYear)} to the ${escapeLatex(data.termEndDay)} day of ${escapeLatex(data.termEndMonth)} of ${escapeLatex(data.termEndYear)} both days inclusive (the "Term").
\\item During the Term, the monthly rent for the Premises payable by the Tenant to the Landlord is Hong Kong Dollars \\$${escapeLatex(data.monthlyRent)} (the "Rent"), ${escapeLatex(data.rentInclusive)} of ${data.managementFees === 'landlord' ? 'management fees' : ''} ${data.governmentRates === 'landlord' ? 'Government rates' : ''}.
\\end{enumerate}
\\item DURING THE TERM, THE TENANT AGREES WITH THE LANDLORD AS FOLLOWS:
\\begin{enumerate}[label=\\alph*., itemsep=1em, topsep=1em]
\\item
\\begin{enumerate}[label=\\roman*., itemsep=1em, topsep=1em]
\\item To pay the Landlord the Rent in advance on or before the ${escapeLatex(data.rentPaymentDay)} day of each calendar month during the Term
${data.managementFees === 'tenant' ? '\\item To pay all the management fees and service fees payable by the owner or occupier of Premises pursuant to the Deed of Mutual Covenant and Management Agreement (if any) relating to the Building; ' : ''}
${data.governmentRates === 'tenant' ? '\\item To pay all the Government rates assessed and imposed by the Government on the Premises. ' : ''}
\\end{enumerate}
\\item To pay all utility charges including water, gas, electricity, and telephone and the deposits for the supply of such utilities and other similar charges payable in respect of the Premises.
\\item To use the Premises for private residential purpose and as a single residence for the Tenant and the Tenant's immediate family members and any other person agreed by the Landlord only.
\\item Not to do or permit to be done any act or thing which amounts to a breach of any term or condition contained in the Government Lease or Conditions of Grant under which the land of the Building is held from the Government.
\\item To comply with all ordinances, regulations, bye-laws, rules, orders and requirements of the Government or any other competent authority relating to the use and occupation of the Premises.
\\item To observe and perform all the covenants, terms, and provisions in the Deed of Mutual Covenant, Sub-Deed of Mutual Covenant (if any), Management Agreement (if any), or House Rules (if any) in relation to the Building and the Premises and to observe all the rules, regulations and orders made by the manager or incorporated owners of the Building.
\\item Not to use or permit the Premises or any part of the Premises to be used for any illegal or immoral purpose.
\\item To maintain and keep the interior of the Premises including all the Landlord's fixtures and fittings and the Furniture (if any) in good and tenantable repair and condition (fair wear and tear and damage caused by inherent defects excepted).
\\item Not to make any alteration, demolition or addition to the Premises and not to carry out any works which may interfere with the condition or the wiring or the piping of the Premises without the prior written consent of the Landlord, such consent shall not be unreasonably withheld.
\\item Not to do or permit to be done any act or thing which may become a nuisance, annoyance, disturbance or unlawful interference to the Landlord or to the tenants or occupiers of other premises in the Building or in any adjoining or neighbouring building.
\\item Not to assign, transfer, sublet or part with possession of the Premises or any part of the Premises and not to enter into any arrangement which any person who is not a party to this Agreement can obtain possession and use of the Premises.
\\item To permit the Landlord and all persons authorised by the Landlord at all reasonable times to enter into the Premises for viewing the condition of the Premises, taking inventories of the fixtures and fittings in the Premises or carrying out any repair works under the Landlord's responsibility in this Agreement provided that the Landlord shall give prior oral or written reasonable notice to the Tenant (except in case of emergency).
\\item To permit the Landlord and any persons authorised by the Landlord, during the last 3 months of the Term, to show the Premises or any part of the Premises to prospective tenants or purchasers at all reasonable times provided that the Landlord shall give prior oral or written reasonable notice to the Tenant.
\\item At the expiration or early termination of this Agreement, to quietly yield up the Premises including the Landlord's fixtures and fittings and the Furniture (if any) in good repair and condition (fair wear and tear and damage caused by inherent defects excepted).
\\item At the expiration or early termination of this Agreement, to re-instate the Premises to its original condition at the commencement of this Agreement and to make good all the damage caused by the erection or removal of any alteration, addition or works which the Tenant may have carried out in the Premises with or without the consent of the Landlord.
\\item To repair or replace, at the Tenant's expenses, any item of the Furniture if it is damaged due to the fault, omission or neglect of the Tenant (fair wear and tear and damage caused by inherent defects excepted). If replacement of any item of the Furniture is required, the replacement shall be of the same brand and model or same grade as the damaged item unless otherwise agreed between the Landlord and the Tenant.
\\end{enumerate}
\\item DURING THE TERM, THE LANDLORD AGREES WITH THE TENANT AS FOLLOWS:
\\begin{enumerate}[label=\\alph*., itemsep=1em, topsep=1em]
\\item
\\begin{enumerate}[label=\\roman*., itemsep=1em, topsep=1em]
\\item To pay all the Government rent and property tax which may be imposed by the Government on the Premises;
${data.managementFees === 'landlord' ? '\\item To pay all the management fees and service fees payable by the owner or occupier of Premises pursuant to the Deed of Mutual Covenant and Management Agreement (if any) relating to the Building;' : ''}
${data.governmentRates === 'landlord' ? '\\item To pay all the Government rates assessed and imposed by the Government on the Premises. ' : ''}
\\end{enumerate}
\\item Provided the Tenant has paid the Rent in accordance with this Agreement and has duly observed and performed all the terms in this Agreement, the Tenant may peacefully hold and enjoy the Premises during the Term without any interruption by the Landlord.
\\item To keep and maintain the external and structural parts of the Premises in a proper state of repair but the Landlord's liability shall not be incurred unless and until written notice of any defect or need of repair has been given by the Tenant to the Landlord and the Landlord shall have failed to take reasonable steps to repair and remedy the same after the lapse of a reasonable time from the date of service of such notice.
\\end{enumerate}
\\item DURING THE TERM, THE PARTIES FURTHER AGREE AS FOLLOWS:
\\begin{enumerate}[label=\\alph*., itemsep=1em, topsep=1em]
\\item Upon the signing of this Agreement, the Tenant shall pay to the Landlord a deposit of Hong Kong Dollars \\$${escapeLatex(data.depositAmount)} to secure the due observance and performance of the terms in this Agreement by the Tenant (the "Deposit").
\\item If the Rent or any payment payable by the Tenant under this Agreement shall be unpaid wholly or partially for 15 days after the due date (whether legally or formally demanded or not) or if the Landlord shall suffer any loss or damages or incur any expenses due to the breach of any term of this Agreement by the Tenant, the Landlord shall deduct any outstanding sum or any loss, damages and expense suffered or incurred by the Landlord from the Deposit without prejudice to the Landlord's right to claim any further damages and any other right or remedy which the Landlord may have against the Tenant in respect of such non-payment or breach of this Agreement. Upon such deduction, the Tenant shall immediately deposit the deducted amount with the Landlord to maintain the Deposit at the sum of Hong Kong Dollars \\$${escapeLatex(data.depositAmount)} throughout the Term.
\\item At the expiration or early termination of this Agreement and provided there is no outstanding Rent and payment owed by the Tenant and there is no breach of any term of this Agreement by the Tenant, the Landlord shall refund the Deposit (less any deductions which the Landlord can make according to this Agreement) to the Tenant without interest within 14 days after the delivery of vacant possession of the Premises (including the Furniture, if any) to the Landlord or after full settlement of any outstanding payment payable by Tenant under this Agreement, whichever is later.
\\item If the Rent or any payment payable by the Tenant under this Agreement shall be unpaid wholly or partially for 15 days after the due date (whether legally or formally demanded or not) or if the Tenant shall commit a breach of any term in this Agreement or if the Tenant shall become bankrupt or if the Tenant shall suffer any distress or execution to be levied on the Tenant's furniture or chattels, the Landlord is entitled, at any time after the happening of any such event, to re-enter the Premises and this Agreement shall absolutely cease and determine but without prejudice to any right or remedy that the Landlord may have against the Tenant in respect of any breach of this Agreement.
\\item If the Premises is subject to an existing mortgage or charge, then this Agreement is subject to the mortgagee or chargee's prior consent. If the Landlord fails to obtain such consent and consequently the mortgagee or chargee seeks repossession of the Premises, the Tenant shall have the option to terminate this Agreement by written notice, the Landlord shall return to the Tenant the Deposit without interest within 7 days from the termination of this Agreement and shall indemnify the Tenant against all liabilities, claims, damages and costs incurred by the Tenant as a consequence of such repossession or termination, including relocation costs.
\\item A written notice served by the Landlord on the Tenant or left at the Premises to the effect that the Landlord exercises the power of re-entry shall be a full and sufficient exercise of such power without actual entry on the part of the Landlord.
\\item For the purpose of this Agreement, any act, default, neglect, or omission of any guest, visitor, employee, agent, licensee or invitee of the Tenant shall be deemed to be the act, default, neglect or omission of the Tenant.
\\item The stamp duty payable on this Agreement and its counterpart shall be borne by the Landlord and the Tenant in equal shares.
\\item This Agreement supersedes all prior negotiation, representation, understanding and agreement made by the parties. This Agreement constitutes the entire agreement of the parties relating to the letting of the Premises.
\\item Unless the context requires otherwise, words importing the singular include the plural and vice versa, and words importing a gender include every gender.
${data.hasEarlyTermination ? '\\item The Landlord and the Tenant further agree to be bound by the additional term contained in Part 2 of the Schedule of this Agreement.' : ''}
\\end{enumerate}
\\end{enumerate}
\\newpage
${data.furnitureProvided ? `
\\begin{center}
\\textbf{THE SCHEDULE REFERRED TO ABOVE} \\\\
\\vspace{1em}
\\textbf{PART 1} \\\\
\\vspace{1em}
\\textbf{THE FURNITURE} \\\\
\\end{center}
${escapeLatex(data.furnitureList)}` : ''}
${data.hasEarlyTermination ? `
\\begin{center}
\\vspace{1em}
\\textbf{PART 2} \\\\
\\vspace{1em}
\\textbf{ADDITIONAL TERM AGREED BY THE PARTIES}
\\end{center}
5.    Notwithstanding any contrary provision in this Agreement, the parties agree that either the Landlord or the Tenant shall be entitled to early terminate this Tenancy Agreement during the Term, by giving not less than ${escapeLatex(data.terminationNoticeMonths)} month's prior written notice of such intention of early termination to the other party or by paying ${escapeLatex(data.terminationNoticeRentMonths)} month's Rent in lieu of such notice to the other party provided this Agreement cannot be terminated before ${escapeLatex(data.earliestTerminationDate)} pursuant to this Clause.` : ''}
\\newpage
\\noindent
{}SIGNED BY \\hspace{8.95cm})\\\\
{}the Landlord (Holder of HKID Card No ${escapeLatex(data.landlordHKID)}) \\hspace{2cm})\\hfill\\underline{\\hspace{3.8cm}}\\\\
\\vspace{3cm}
\\hfill Landlord’s signature\\\\
{}RECEIVED the Sum of HONG KONG DOLLARS \\hspace{2cm})\\\\
${escapeLatex(data.depositAmount)} HK\\$${escapeLatex(data.depositAmount)} ONLY being the Deposit\\hspace{3.74cm})\\\\
{}paid by the Tenant to the Landlord.\\hspace{4.88cm})\\hfill\\underline{\\hspace{3.8cm}}\\\\
\\vspace{3cm}
\\hfill Landlord’s signature\\\\
{}SIGNED BY \\hspace{8.95cm})\\\\
{}the Tenant (Holder of HKID Card No ${escapeLatex(data.tenantHKID)}) \\hspace{2.41cm})\\hfill\\underline{\\hspace{3.8cm}}\\\\
\\vspace{3cm}
\\hfill Tenant's signature\\\\
{}RECEIVED from the Landlord \\hspace{5.6cm})\\\\
${escapeLatex(data.numberOfKeys)} key(s) of the Premises\\hspace{6.27cm})\\\\
{}by the Tenant.\\hspace{8.78cm})\\hfill\\underline{\\hspace{3.61cm}}\\\\
\\vspace{3cm}
\\hfill Tenant's signature\\\\
\\end{document}
`;
}

// Generate PDF using jsPDF
function generatePDFClientSide(data: CLICLeaseData): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  
  const pageWidth = 595.28
  const pageHeight = 841.89
  // Standard margins: 1 inch (72 points) on all sides for A4 paper
  const margin = 72
  const leftMargin = margin
  const rightMargin = margin
  const topMargin = margin
  const bottomMargin = margin
  const fontSize = 12
  const lineHeight = 14.4
  
  // Available width respects both left and right margins
  const availableWidth = pageWidth - leftMargin - rightMargin
  
  const cmToPt = (cm: number) => cm * 28.35
  const emToPt = (em: number) => em * fontSize
  
  let yPos = topMargin

  // Helper function to check if there's enough space for content height
  const hasEnoughSpace = (requiredHeight: number): boolean => {
    return (yPos + requiredHeight) <= (pageHeight - bottomMargin)
  }

  const addSpace = (space: number) => {
    yPos += space
    // Check if content would exceed bottom margin - respect standard margins
    if (yPos > pageHeight - bottomMargin) {
      doc.addPage()
      yPos = topMargin // Reset to top margin on new page
    }
  }

  // Helper function to ensure content doesn't exceed bottom margin
  const ensureSpace = (requiredHeight: number) => {
    if (!hasEnoughSpace(requiredHeight)) {
      doc.addPage()
      yPos = topMargin // Reset to top margin on new page
    }
  }

  const drawLine = (x: number, y: number, width: number) => {
    doc.line(x, y + 2, x + width, y + 2)
  }

  // Helper function for hanging indent (label at left, text indented, wrapped lines align with text start)
  const addClauseWithHangingIndent = (label: string, text: string, indentLevel: number = 20) => {
    const labelWidth = doc.getTextWidth(label + ' ')
    const labelX = leftMargin + indentLevel // Position label at the indent level
    const textX = labelX + labelWidth
    const textWidth = availableWidth - indentLevel - labelWidth
    
    // Place label at the left position
    doc.text(label, labelX, yPos)
    
    // Split and place text with hanging indent (all lines aligned to textX)
    const lines = doc.splitTextToSize(text, textWidth)
    if (lines.length > 0) {
      // First line at textX, subsequent lines also at textX for hanging indent
      doc.text(lines, textX, yPos)
      yPos += lines.length * lineHeight
    }
  }

  // Cover page - content in right top corner with centered text
  doc.setFontSize(fontSize)
  doc.setFont('helvetica', 'normal')
  
  // Start from top, offset to right (matching LaTeX \hspace{6cm})
  yPos = topMargin + 40 // Start near top (topMargin + small offset)
  const hSpace6cm = cmToPt(6) // 170.1 points - offset to right
  const contentCenterX = leftMargin + hSpace6cm + (cmToPt(10) / 2) // Center point for content block (6cm + 5cm)
  
  // Dated the... (centered in content block)
  const dateText = `Dated the ${data.agreementDay} day of ${data.agreementMonth} of ${data.agreementYear}`
  doc.text(dateText, contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(3)) // \vspace{3em} = 36 points
  
  // Horizontal line (centered in content block, ~10cm wide)
  const hSpace10cm = cmToPt(10) // 283.5 points
  const lineX = contentCenterX - (hSpace10cm / 2)
  drawLine(lineX, yPos, hSpace10cm)
  addSpace(emToPt(3)) // Large space after line
  
  // \textbf{landlordName} (centered in content block)
  doc.setFont('helvetica', 'bold')
  doc.text(data.landlordName, contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(1)) // \vspace{1em} = 12 points
  
  // AND (centered in content block)
  doc.setFont('helvetica', 'normal')
  doc.text('AND', contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(1)) // \vspace{1em}
  
  // \textbf{tenantName} (centered in content block)
  doc.setFont('helvetica', 'bold')
  doc.text(data.tenantName, contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(3)) // \vspace{3em}
  
  // Horizontal line (centered in content block)
  drawLine(lineX, yPos, hSpace10cm)
  addSpace(emToPt(3)) // Large space after line
  
  // \textbf{TENANCY AGREEMENT} (centered in content block)
  doc.text('TENANCY AGREEMENT', contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(1)) // \vspace{1em}
  
  // \textbf{In respect of} (centered in content block)
  doc.text('In respect of', contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(1)) // \vspace{1em}
  
  // \textbf{landlordAddress} (centered in content block, may wrap)
  const addrLines = doc.splitTextToSize(data.landlordAddress, hSpace10cm)
  addrLines.forEach((line: string) => {
    doc.text(line, contentCenterX, yPos, { align: 'center' })
    addSpace(lineHeight)
  })
  yPos -= lineHeight // Adjust back one line
  addSpace(lineHeight)
  
  // \textbf{("the Premises")} (centered in content block)
  doc.text('("the Premises")', contentCenterX, yPos, { align: 'center' })
  addSpace(emToPt(3)) // \vspace{3em}
  
  // Horizontal line (centered in content block)
  drawLine(lineX, yPos, hSpace10cm)

  // PAGE 2: Main agreement (\newpage)
  doc.addPage()
  yPos = topMargin

  // \begin{center} \textbf{TENANCY AGREEMENT} \end{center}
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  const titleWidth = doc.getTextWidth('TENANCY AGREEMENT')
  doc.text('TENANCY AGREEMENT', (pageWidth - titleWidth) / 2, yPos)
  addSpace(lineHeight * 2)
  
  // {}An Agreement made on... \\[2em]
  doc.setFontSize(fontSize)
  doc.setFont('helvetica', 'normal')
  doc.text(`An Agreement made on the ${data.agreementDay} day of ${data.agreementMonth} of ${data.agreementYear}`, leftMargin, yPos)
  addSpace(emToPt(2)) // \\[2em] = 24 points
  
  // {}BETWEEN
  doc.setFont('helvetica', 'bold')
  doc.text('BETWEEN', leftMargin, yPos)
  addSpace(lineHeight * 2) // Extra blank line after BETWEEN before first item
  
  // \begin{enumerate}[label=\arabic*), left=0pt, itemsep=1em, topsep=1em]
  doc.setFont('helvetica', 'normal')
  const party1 = `1) ${data.landlordName} (Holder of Hong Kong Identity Card No ${data.landlordHKID}) of ${data.landlordAddress} (the "Landlord"); and`
  const lines1 = doc.splitTextToSize(party1, availableWidth - 10)
  doc.text(lines1, leftMargin + 10, yPos)
  yPos += lines1.length * lineHeight
  addSpace(emToPt(1)) // itemsep=1em
  
  const party2 = `2) ${data.tenantName} (Holder of Hong Kong Identity Card No ${data.tenantHKID}) of ${data.premisesAddress} (the "Tenant").`
  const lines2 = doc.splitTextToSize(party2, availableWidth - 10)
  doc.text(lines2, leftMargin + 10, yPos)
  yPos += lines2.length * lineHeight
  addSpace(emToPt(1)) // topsep=1em for next enumerate
  
  // 1. THE PARTIES AGREE AS FOLLOWS: (not bold, period format)
  doc.setFont('helvetica', 'normal')
  doc.text('1. THE PARTIES AGREE AS FOLLOWS:', leftMargin, yPos)
  addSpace(lineHeight * 2) // Extra blank line after big title
  
  // Clauses a, b, c (with hanging indent and spacing)
  addClauseWithHangingIndent('a.', `The Landlord lets and the Tenant takes ALL THAT ${data.premisesAddress} (the "Premises") together with the use in common with the Landlord and all others having the like right of all the common areas, common access, entrances, staircase, lifts, passages of the building of which the Premises form part (the "Building") and all the easements and rights appurtenant to the Premises AND together with the furniture and appliances (if any) as set out in Part 1 of the Schedule in this Agreement ("the Furniture") for the Term and at the Rent more particularised in Clauses 1b and 1c of this Agreement.`, 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('b.', `The term of this Tenancy Agreement is ${data.termYears} YEARS from the ${data.termStartDay} day of ${data.termStartMonth} of ${data.termStartYear} to the ${data.termEndDay} day of ${data.termEndMonth} of ${data.termEndYear} both days inclusive (the "Term").`, 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  const rentText = data.rentInclusive === 'inclusive' ? 'inclusive' : 'exclusive'
  const mgmtText = data.managementFees === 'landlord' ? 'management fees' : ''
  const ratesText = data.governmentRates === 'landlord' ? 'Government rates' : ''
  addClauseWithHangingIndent('c.', `During the Term, the monthly rent for the Premises payable by the Tenant to the Landlord is Hong Kong Dollars $${data.monthlyRent} (the "Rent"), ${rentText} of ${mgmtText} ${ratesText}.`.replace(/\s+/g, ' ').trim(), 20)
  addSpace(lineHeight * 1.2) // More spacing after last clause
  
  // 2. DURING THE TERM, THE TENANT AGREES WITH THE LANDLORD AS FOLLOWS:
  doc.setFont('helvetica', 'normal')
  doc.text('2. DURING THE TERM, THE TENANT AGREES WITH THE LANDLORD AS FOLLOWS:', leftMargin, yPos)
  addSpace(lineHeight * 2) // Extra blank line after big title
  
  // \begin{enumerate}[label=\alph*., itemsep=1em, topsep=1em]
  doc.setFont('helvetica', 'normal')
  
  // Sub-bullet points (i., ii., iii.) with hanging indent and same spacing as main bullets
  doc.text('a.', leftMargin + 20, yPos)
  addClauseWithHangingIndent('i.', `To pay the Landlord the Rent in advance on or before the ${data.rentPaymentDay} day of each calendar month during the Term`, 40)
  addSpace(lineHeight * 1.2) // Same spacing as main bullets (a., b., c.)
  
  if (data.managementFees === 'tenant') {
    addClauseWithHangingIndent('ii.', 'To pay all the management fees and service fees payable by the owner or occupier of Premises pursuant to the Deed of Mutual Covenant and Management Agreement (if any) relating to the Building;', 40)
    addSpace(lineHeight * 1.2) // Same spacing as main bullets (a., b., c.)
  }
  
  if (data.governmentRates === 'tenant') {
    addClauseWithHangingIndent('iii.', 'To pay all the Government rates assessed and imposed by the Government on the Premises.', 40)
    addSpace(lineHeight * 1.2) // Same spacing as main bullets (a., b., c.)
  }
  
  // Continue with all remaining clauses 2b through 2p... (with hanging indent)
  addClauseWithHangingIndent('b.', 'To pay all utility charges including water, gas, electricity, and telephone and the deposits for the supply of such utilities and other similar charges payable in respect of the Premises.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('c.', 'To use the Premises for private residential purpose and as a single residence for the Tenant and the Tenant\'s immediate family members and any other person agreed by the Landlord only.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('d.', 'Not to do or permit to be done any act or thing which amounts to a breach of any term or condition contained in the Government Lease or Conditions of Grant under which the land of the Building is held from the Government.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('e.', 'To comply with all ordinances, regulations, bye-laws, rules, orders and requirements of the Government or any other competent authority relating to the use and occupation of the Premises.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('f.', 'To observe and perform all the covenants, terms, and provisions in the Deed of Mutual Covenant, Sub-Deed of Mutual Covenant (if any), Management Agreement (if any), or House Rules (if any) in relation to the Building and the Premises and to observe all the rules, regulations and orders made by the manager or incorporated owners of the Building.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('g.', 'Not to use or permit the Premises or any part of the Premises to be used for any illegal or immoral purpose.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('h.', 'To maintain and keep the interior of the Premises including all the Landlord\'s fixtures and fittings and the Furniture (if any) in good and tenantable repair and condition (fair wear and tear and damage caused by inherent defects excepted).', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('i.', 'Not to make any alteration, demolition or addition to the Premises and not to carry out any works which may interfere with the condition or the wiring or the piping of the Premises without the prior written consent of the Landlord, such consent shall not be unreasonably withheld.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('j.', 'Not to do or permit to be done any act or thing which may become a nuisance, annoyance, disturbance or unlawful interference to the Landlord or to the tenants or occupiers of other premises in the Building or in any adjoining or neighbouring building.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('k.', 'Not to assign, transfer, sublet or part with possession of the Premises or any part of the Premises and not to enter into any arrangement which any person who is not a party to this Agreement can obtain possession and use of the Premises.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('l.', 'To permit the Landlord and all persons authorised by the Landlord at all reasonable times to enter into the Premises for viewing the condition of the Premises, taking inventories of the fixtures and fittings in the Premises or carrying out any repair works under the Landlord\'s responsibility in this Agreement provided that the Landlord shall give prior oral or written reasonable notice to the Tenant (except in case of emergency).', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('m.', 'To permit the Landlord and any persons authorised by the Landlord, during the last 3 months of the Term, to show the Premises or any part of the Premises to prospective tenants or purchasers at all reasonable times provided that the Landlord shall give prior oral or written reasonable notice to the Tenant.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('n.', 'At the expiration or early termination of this Agreement, to quietly yield up the Premises including the Landlord\'s fixtures and fittings and the Furniture (if any) in good repair and condition (fair wear and tear and damage caused by inherent defects excepted).', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('o.', 'At the expiration or early termination of this Agreement, to re-instate the Premises to its original condition at the commencement of this Agreement and to make good all the damage caused by the erection or removal of any alteration, addition or works which the Tenant may have carried out in the Premises with or without the consent of the Landlord.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('p.', 'To repair or replace, at the Tenant\'s expenses, any item of the Furniture if it is damaged due to the fault, omission or neglect of the Tenant (fair wear and tear and damage caused by inherent defects excepted). If replacement of any item of the Furniture is required, the replacement shall be of the same brand and model or same grade as the damaged item unless otherwise agreed between the Landlord and the Tenant.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  // 3. DURING THE TERM, THE LANDLORD AGREES WITH THE TENANT AS FOLLOWS:
  doc.setFont('helvetica', 'normal')
  doc.text('3. DURING THE TERM, THE LANDLORD AGREES WITH THE TENANT AS FOLLOWS:', leftMargin, yPos)
  addSpace(lineHeight * 2) // Extra blank line after big title
  
  doc.setFont('helvetica', 'normal')
  doc.text('a.', leftMargin + 20, yPos)
  addClauseWithHangingIndent('i.', 'To pay all the Government rent and property tax which may be imposed by the Government on the Premises;', 40)
  addSpace(lineHeight * 1.2) // Same spacing as main bullets (a., b., c.)
  
  if (data.managementFees === 'landlord') {
    addClauseWithHangingIndent('ii.', 'To pay all the management fees and service fees payable by the owner or occupier of Premises pursuant to the Deed of Mutual Covenant and Management Agreement (if any) relating to the Building;', 40)
    addSpace(lineHeight * 1.2) // Same spacing as main bullets (a., b., c.)
  }
  
  if (data.governmentRates === 'landlord') {
    addClauseWithHangingIndent('iii.', 'To pay all the Government rates assessed and imposed by the Government on the Premises.', 40)
    addSpace(lineHeight * 1.2) // Same spacing as main bullets (a., b., c.)
  }
  
  addClauseWithHangingIndent('b.', 'Provided the Tenant has paid the Rent in accordance with this Agreement and has duly observed and performed all the terms in this Agreement, the Tenant may peacefully hold and enjoy the Premises during the Term without any interruption by the Landlord.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('c.', 'To keep and maintain the external and structural parts of the Premises in a proper state of repair but the Landlord\'s liability shall not be incurred unless and until written notice of any defect or need of repair has been given by the Tenant to the Landlord and the Landlord shall have failed to take reasonable steps to repair and remedy the same after the lapse of a reasonable time from the date of service of such notice.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  // 5. DURING THE TERM, THE PARTIES FURTHER AGREE AS FOLLOWS:
  doc.setFont('helvetica', 'normal')
  doc.text('5. DURING THE TERM, THE PARTIES FURTHER AGREE AS FOLLOWS:', leftMargin, yPos)
  addSpace(lineHeight * 2) // Extra blank line after big title
  
  doc.setFont('helvetica', 'normal')
  addClauseWithHangingIndent('a.', `Upon the signing of this Agreement, the Tenant shall pay to the Landlord a deposit of Hong Kong Dollars $${data.depositAmount} to secure the due observance and performance of the terms in this Agreement by the Tenant (the "Deposit").`, 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('b.', `If the Rent or any payment payable by the Tenant under this Agreement shall be unpaid wholly or partially for 15 days after the due date (whether legally or formally demanded or not) or if the Landlord shall suffer any loss or damages or incur any expenses due to the breach of any term of this Agreement by the Tenant, the Landlord shall deduct any outstanding sum or any loss, damages and expense suffered or incurred by the Landlord from the Deposit without prejudice to the Landlord's right to claim any further damages and any other right or remedy which the Landlord may have against the Tenant in respect of such non-payment or breach of this Agreement. Upon such deduction, the Tenant shall immediately deposit the deducted amount with the Landlord to maintain the Deposit at the sum of Hong Kong Dollars $${data.depositAmount} throughout the Term.`, 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses

  addClauseWithHangingIndent('c.', 'At the expiration or early termination of this Agreement and provided there is no outstanding Rent and payment owed by the Tenant and there is no breach of any term of this Agreement by the Tenant, the Landlord shall refund the Deposit (less any deductions which the Landlord can make according to this Agreement) to the Tenant without interest within 14 days after the delivery of vacant possession of the Premises (including the Furniture, if any) to the Landlord or after full settlement of any outstanding payment payable by Tenant under this Agreement, whichever is later.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('d.', 'If the Rent or any payment payable by the Tenant under this Agreement shall be unpaid wholly or partially for 15 days after the due date (whether legally or formally demanded or not) or if the Tenant shall commit a breach of any term in this Agreement or if the Tenant shall become bankrupt or if the Tenant shall suffer any distress or execution to be levied on the Tenant\'s furniture or chattels, the Landlord is entitled, at any time after the happening of any such event, to re-enter the Premises and this Agreement shall absolutely cease and determine but without prejudice to any right or remedy that the Landlord may have against the Tenant in respect of any breach of this Agreement.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('e.', 'If the Premises is subject to an existing mortgage or charge, then this Agreement is subject to the mortgagee or chargee\'s prior consent. If the Landlord fails to obtain such consent and consequently the mortgagee or chargee seeks repossession of the Premises, the Tenant shall have the option to terminate this Agreement by written notice, the Landlord shall return to the Tenant the Deposit without interest within 7 days from the termination of this Agreement and shall indemnify the Tenant against all liabilities, claims, damages and costs incurred by the Tenant as a consequence of such repossession or termination, including relocation costs.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('f.', 'A written notice served by the Landlord on the Tenant or left at the Premises to the effect that the Landlord exercises the power of re-entry shall be a full and sufficient exercise of such power without actual entry on the part of the Landlord.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('g.', 'For the purpose of this Agreement, any act, default, neglect, or omission of any guest, visitor, employee, agent, licensee or invitee of the Tenant shall be deemed to be the act, default, neglect or omission of the Tenant.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('h.', 'The stamp duty payable on this Agreement and its counterpart shall be borne by the Landlord and the Tenant in equal shares.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('i.', 'This Agreement supersedes all prior negotiation, representation, understanding and agreement made by the parties. This Agreement constitutes the entire agreement of the parties relating to the letting of the Premises.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  addClauseWithHangingIndent('j.', 'Unless the context requires otherwise, words importing the singular include the plural and vice versa, and words importing a gender include every gender.', 20)
  addSpace(lineHeight * 1.2) // More spacing between clauses
  
  if (data.hasEarlyTermination) {
    addClauseWithHangingIndent('k.', 'The Landlord and the Tenant further agree to be bound by the additional term contained in Part 2 of the Schedule of this Agreement.', 20)
    addSpace(lineHeight * 1.2) // More spacing between clauses
  }
  
  // Schedule page (\newpage) - Always start on new page
  if (data.furnitureProvided || data.hasEarlyTermination) {
    doc.addPage()
    yPos = topMargin
    
    if (data.furnitureProvided) {
      doc.setFont('helvetica', 'bold')
      doc.text('THE SCHEDULE REFERRED TO ABOVE', pageWidth / 2, yPos, { align: 'center' })
      addSpace(emToPt(1) + lineHeight)
      doc.text('PART 1', pageWidth / 2, yPos, { align: 'center' })
      addSpace(emToPt(1) + lineHeight)
      doc.text('THE FURNITURE', pageWidth / 2, yPos, { align: 'center' })
      addSpace(lineHeight * 2)
      doc.setFont('helvetica', 'normal')
      const furnitureLines = data.furnitureList.split('\n')
      furnitureLines.forEach(line => {
        if (line.trim()) {
          doc.text(line.trim(), leftMargin, yPos)
          addSpace(lineHeight)
        }
      })
    }
    
    if (data.hasEarlyTermination) {
      if (data.furnitureProvided) {
        addSpace(emToPt(1))
      }
      doc.setFont('helvetica', 'bold')
      doc.text('PART 2', pageWidth / 2, yPos, { align: 'center' })
      addSpace(emToPt(1) + lineHeight)
      doc.text('ADDITIONAL TERM AGREED BY THE PARTIES', pageWidth / 2, yPos, { align: 'center' })
      addSpace(lineHeight * 2)
      doc.setFont('helvetica', 'normal')
      const termClause = `5.    Notwithstanding any contrary provision in this Agreement, the parties agree that either the Landlord or the Tenant shall be entitled to early terminate this Tenancy Agreement during the Term, by giving not less than ${data.terminationNoticeMonths} month's prior written notice of such intention of early termination to the other party or by paying ${data.terminationNoticeRentMonths} month's Rent in lieu of such notice to the other party provided this Agreement cannot be terminated before ${data.earliestTerminationDate} pursuant to this Clause.`
      const termLines = doc.splitTextToSize(termClause, availableWidth)
      doc.text(termLines, leftMargin, yPos)
      yPos += termLines.length * lineHeight
    }
  }

  // Additional Terms page (if provided)
  if (data.additionalTerms && data.additionalTerms.trim()) {
    doc.addPage()
    yPos = topMargin
    doc.setFont('helvetica', 'bold')
    doc.text('ADDITIONAL TERMS', pageWidth / 2, yPos, { align: 'center' })
    addSpace(lineHeight)
    doc.setFont('helvetica', 'normal')
    const addLines = doc.splitTextToSize(data.additionalTerms.trim(), availableWidth)
    addLines.forEach((line: string) => {
      doc.text(line, leftMargin, yPos)
      addSpace(lineHeight)
    })
  }

  // Signature page (\newpage \noindent) - Always start on new page
  doc.addPage()
  yPos = topMargin
  
  doc.setFontSize(fontSize)
  doc.setFont('helvetica', 'normal')
  
  // Signature line positions - respect right margin by ending at (pageWidth - rightMargin)
  // Line starts at (pageWidth - rightMargin - lineWidth) and extends for lineWidth
  const sigX = pageWidth - rightMargin - cmToPt(3.8) // Right align signature line position (respects right margin)
  const sigX2 = pageWidth - rightMargin - cmToPt(3.61) // Right align signature line position for section 4 (respects right margin)
  const parenX = sigX - 15 // Position for closing parentheses, with more space before the signing line
  const parenX2 = sigX2 - 15 // Position for closing parentheses in section 4, with more space before the signing line
  
  // Section 1: {}SIGNED BY \hspace{8.95cm})
  // Ensure enough space for signature block (line + label + large spacing after)
  ensureSpace(lineHeight + cmToPt(3))
  doc.text('SIGNED BY', leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  addSpace(lineHeight)
  
  // {}the Landlord (Holder of HKID Card No...) \hspace{2cm})\hfill\underline{\hspace{3.8cm}}
  const landlordText = `the Landlord (Holder of HKID Card No ${data.landlordHKID})`
  doc.text(landlordText, leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  drawLine(sigX, yPos, cmToPt(3.8))
  const sigLabel1 = "Landlord's signature"
  const sigLabel1Width = doc.getTextWidth(sigLabel1)
  doc.text(sigLabel1, sigX + (cmToPt(3.8) / 2) - (sigLabel1Width / 2), yPos + lineHeight)
  addSpace(cmToPt(5)) // Large space after signature
  
  // Section 2: {}RECEIVED the Sum of HONG KONG DOLLARS \hspace{2cm})
  // Ensure enough space for signature block (line + label + large spacing after)
  ensureSpace(lineHeight + cmToPt(3))
  doc.text('RECEIVED the Sum of HONG KONG DOLLARS', leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  addSpace(lineHeight)
  
  const depositText1 = `${data.depositAmount} HK$${data.depositAmount} ONLY being the Deposit`
  doc.text(depositText1, leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  addSpace(lineHeight)
  
  doc.text('paid by the Tenant to the Landlord.', leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  drawLine(sigX, yPos, cmToPt(3.8))
  const sigLabel2 = "Landlord's signature"
  const sigLabel2Width = doc.getTextWidth(sigLabel2)
  doc.text(sigLabel2, sigX + (cmToPt(3.8) / 2) - (sigLabel2Width / 2), yPos + lineHeight)
  addSpace(cmToPt(5)) // Large space after signature
  
  // Section 3: {}SIGNED BY \hspace{8.95cm})
  // Ensure enough space for signature block (line + label + large spacing after)
  ensureSpace(lineHeight + cmToPt(3))
  doc.text('SIGNED BY', leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  addSpace(lineHeight)
  
  // {}the Tenant (Holder of HKID Card No...) \hspace{2.41cm})\hfill\underline{\hspace{3.8cm}}
  const tenantText = `the Tenant (Holder of HKID Card No ${data.tenantHKID})`
  doc.text(tenantText, leftMargin, yPos)
  doc.text(')', parenX, yPos) // Closing parenthesis aligned with line
  drawLine(sigX, yPos, cmToPt(3.8))
  const sigLabel3 = "Tenant's signature"
  const sigLabel3Width = doc.getTextWidth(sigLabel3)
  doc.text(sigLabel3, sigX + (cmToPt(3.8) / 2) - (sigLabel3Width / 2), yPos + lineHeight)
  addSpace(cmToPt(5)) // Large space after signature
  
  // Section 4: {}RECEIVED from the Landlord \hspace{5.6cm})
  // Ensure enough space for signature block (line + label + large spacing after)
  ensureSpace(lineHeight + cmToPt(3))
  doc.text('RECEIVED from the Landlord', leftMargin, yPos)
  doc.text(')', parenX2, yPos) // Closing parenthesis aligned with line, just before signing line
  addSpace(lineHeight)
  
  doc.text(`${data.numberOfKeys} key(s) of the Premises`, leftMargin, yPos)
  doc.text(')', parenX2, yPos) // Closing parenthesis aligned with line, just before signing line
  addSpace(lineHeight)
  
  doc.text('by the Tenant.', leftMargin, yPos)
  doc.text(')', parenX2, yPos) // Closing parenthesis aligned with line, just before signing line
  drawLine(sigX2, yPos, cmToPt(3.61))
  const sigLabel4 = "Tenant's signature"
  const sigLabel4Width = doc.getTextWidth(sigLabel4)
  doc.text(sigLabel4, sigX2 + (cmToPt(3.61) / 2) - (sigLabel4Width / 2), yPos + lineHeight)
  addSpace(cmToPt(5)) // Large space after signature

  // Download
  const filename = `CLIC_Tenancy_Agreement_${data.tenantName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}

// Main function - uses jsPDF by default
export async function generateCLICLeasePDF(data: CLICLeaseData): Promise<void> {
  try {
    // Validate required fields
    const requiredFields = [
      'agreementDay', 'agreementMonth', 'agreementYear',
      'landlordName', 'tenantName', 'premisesAddress',
      'landlordHKID', 'landlordAddress', 'tenantHKID',
      'termYears', 'termStartDay', 'termStartMonth', 'termStartYear',
      'termEndDay', 'termEndMonth', 'termEndYear',
      'monthlyRent', 'rentInclusive', 'managementFees', 'governmentRates',
      'rentPaymentDay', 'depositAmount', 'numberOfKeys'
    ]

    for (const field of requiredFields) {
      if (!data[field as keyof CLICLeaseData]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    // Default: Generate PDF client-side using jsPDF
    generatePDFClientSide(data)
    
    // FIXME Remove LaTeX backend code after testing
    // Legacy LaTeX backend option (kept for reference, to be removed)
    /*
    const backendUrl = process.env.REACT_APP_PDF_BACKEND_URL || 'http://localhost:4000/api/pdf/generate'
    try {
      const latexContent = generateLatexContent(data)
    const resp = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latex: latexContent, filename: 'Tenancy_Agreement' })
    })
      
      if (resp.ok) {
    const pdfBlob = await resp.blob()
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CLIC_Tenancy_Agreement_${data.tenantName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
        return
      }
    } catch (backendError) {
      console.log('Backend PDF generation unavailable, using client-side generation')
    }
    */
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
