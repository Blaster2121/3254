// CLIC PDF Generator - Client-side function
// This function generates a PDF by making a request to a backend service
import { CLICLeaseData } from './clicTemplate';

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
{}${escapeLatex(data.depositAmount)} key(s) of the Premises\\hspace{6.27cm})\\\\
{}by the Tenant.\\hspace{8.78cm})\\hfill\\underline{\\hspace{3.61cm}}\\\\
\\vspace{3cm}
\\hfill Tenant's signature\\\\
\\end{document}
`;
}

// Main function to generate PDF (makes HTTP request to backend)
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
      'rentPaymentDay', 'depositAmount'
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof CLICLeaseData]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const latexContent = generateLatexContent(data)
    const backendUrl = process.env.REACT_APP_PDF_BACKEND_URL || 'http://localhost:4000/api/pdf/generate'
    const resp = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latex: latexContent, filename: 'Tenancy_Agreement' })
    })
    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      throw new Error(`PDF backend error: ${resp.status} ${text}`)
    }
    const pdfBlob = await resp.blob()
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CLIC_Tenancy_Agreement_${data.tenantName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
