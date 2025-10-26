import jsPDF from 'jspdf'
import { CLICLeaseData } from './clicTemplate'

export const generateCLICLeasePDF = (data: CLICLeaseData): void => {
  const doc = new jsPDF()
  
  // Set document properties
  doc.setProperties({
    title: 'Hong Kong Residential Tenancy Agreement',
    author: 'CLIC Template Generator',
    subject: 'Residential Tenancy Agreement'
  })
  
  // Set font
  doc.setFont('times')
  
  let yPosition = 20
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  const lineHeight = 6
  
  // Helper function to add text with proper formatting
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false, isItalic: boolean = false) => {
    if (yPosition > pageHeight - margin) {
      doc.addPage()
      yPosition = 20
    }
    
    doc.setFontSize(fontSize)
    doc.setFont('times', isBold ? 'bold' : isItalic ? 'italic' : 'normal')
    
    // Split long text into lines
    const lines = doc.splitTextToSize(text, 170)
    doc.text(lines, margin, yPosition)
    yPosition += lines.length * lineHeight + 2
  }
  
  // Helper function to add blank line
  const addBlankLine = () => {
    yPosition += lineHeight
  }
  //Page 1
  // Header
  addText(`Dated the ${data.agreementDay} day of ${data.agreementMonth} of 20${data.agreementYear}`, 12, true)
  addBlankLine()
  addBlankLine()
  
  // Landlord and Tenant names
  addText(data.landlordName, 12, true)
  addText('AND', 12, true)
  addText(data.tenantName, 12, true)
  addBlankLine()
  addBlankLine()
  
  // Title
  addText('TENANCY AGREEMENT', 16, true)
  addBlankLine()
  addText('In respect of', 12)
  addBlankLine()
  addText(data.premisesAddress, 12, true)
  addText('("the Premises")', 12)
  addBlankLine()
  addBlankLine()
  addBlankLine()
  addBlankLine()

  // Start "TENANCY AGREEMENT" on a new page
  doc.addPage();
  yPosition = 20;

  // Main Agreement Title
  addText('TENANCY AGREEMENT', 16, true)
  addBlankLine()
  
  // Agreement date
  addText(`An Agreement made on the ${data.agreementDay} day of ${data.agreementMonth} of 20${data.agreementYear}`, 12)
  addBlankLine()
  addText('BETWEEN', 12, true)
  addBlankLine()
  
  // Parties
  addText(`1) ${data.landlordName} (Holder of Hong Kong Identity Card No ${data.landlordHKID}) of ${data.landlordAddress} (the "Landlord"); and`, 10)
  addBlankLine()
  addText(`2) ${data.tenantName} (Holder of Hong Kong Identity Card No ${data.tenantHKID}) of ${data.premisesAddress} (the "Tenant").`, 10)
  addBlankLine()
  
  // Clause 1
  addText('1. THE PARTIES AGREE AS FOLLOWS:-', 12, true)
  addBlankLine()
  
  // Clause 1a
  addText('a. The Landlord lets and the Tenant takes ALL THAT', 10)
  addText(`${data.premisesAddress} (the "Premises") together with the use in common with the Landlord and all others having the like right of all the common areas, common access, entrances, staircase, lifts, passages of the building of which the Premises form part (the "Building") and all the easements and rights appurtenant to the Premises AND together with the furniture and appliances (if any) as set out in Part 1 of the Schedule in this Agreement ("the Furniture") for the Term and at the Rent more particularised in Clauses 1b and 1c of this Agreement.`, 10)
  addBlankLine()
  
  // Clause 1b
  addText(`b. The term of this Tenancy Agreement is ${data.termYears} YEARS from the ${data.termStartDay} day of ${data.termStartMonth} of ${data.termStartYear} to the ${data.termEndDay} day of ${data.termEndMonth} of ${data.termEndYear} both days inclusive (the "Term").`, 10)
  addBlankLine()
  
  // Clause 1c
  const rentInclusiveText = data.rentInclusive === 'inclusive' ? 'inclusive' : 'exclusive'
  const managementText = data.managementFees === 'landlord' ? 'management fees' : ''
  const ratesText = data.governmentRates === 'landlord' ? 'Government rates' : ''
  const inclusiveText = [managementText, ratesText].filter(Boolean).join(' and ')
  
  addText(`c. During the Term, the monthly rent for the Premises payable by the Tenant to the Landlord is Hong Kong Dollars $${data.monthlyRent} (the "Rent"), ${rentInclusiveText} of ${inclusiveText}.`, 10)
  addBlankLine()
  
  // Clause 2
  addText('2. DURING THE TERM, THE TENANT AGREES WITH THE LANDLORD AS FOLLOWS:', 12, true)
  addBlankLine()
  
  // Clause 2a
  addText('a.', 10, true)
  addText(`i) To pay the Landlord the Rent in advance on or before the ${data.rentPaymentDay} day of each and every calendar month during the Term at the manner which the Landlord shall specify to the Tenant from time to time;`, 10)
  addBlankLine()
  
  if (data.managementFees === 'tenant') {
    addText('ii) To pay all the management fees and service fees payable by the owner or occupier of Premises pursuant to the Deed of Mutual Covenant and Management Agreement (if any) relating to the Building; and', 10)
    addBlankLine()  
  }

  
  if (data.governmentRates === 'tenant') {
    addText('iii) To pay all the Government rates assessed and imposed by the Government on the Premises.', 10)
    addBlankLine()  
  }
  
  // Continue with other clauses under clause 2
  addText('b. To pay all utility charges including water, gas, electricity, and telephone and the deposits for the supply of such utilities and other similar charges payable in respect of the Premises.', 10)
  addBlankLine()
  
  addText('c. To use the Premises for private residential purpose and as a single residence for the Tenant and the Tenant\'s immediate family members and any other person agreed by the Landlord only.', 10)
  addBlankLine()
  
  addText('d. Not to do or permit to be done any act or thing which amounts to a breach of any term or condition contained in the Government Lease or Conditions of Grant under which the land of the Building is held from the Government.', 10)
  addBlankLine()

  addText('e. To comply with all ordinances, regulations, bye-laws, rules, orders and requirements of the Government or any other competent authority relating to the use and occupation of the Premises.', 10)
  addBlankLine()

  addText('f. To observe and perform all the covenants, terms, and provisions in the Deed of Mutual Covenant, Sub-Deed of Mutual Covenant (if any), Management Agreement (if any), or House Rules (if any) in relation to the Building and the Premises and to observe all the rules, regulations and orders made by the manager or incorporated owners of the Building.', 10)
  addBlankLine()

  addText('g. Not to use or permit the Premises or any part of the Premises to be used for any illegal or immoral purpose.', 10)
  addBlankLine()

  addText('h. To maintain and keep the interior of the Premises including all the Landlord’s fixtures and fittings and the Furniture (if any) in good and tenantable repair and condition (fair wear and tear and damage caused by inherent defects excepted). ', 10)
  addBlankLine()

  addText('i. Not to make any alteration, demolition or addition to the Premises and not to carry out any works which may interfere with the condition or the wiring or the piping of the Premises without the prior written consent of the Landlord, such consent shall not be unreasonably withheld.', 10)
  addBlankLine()

  addText('j. Not to do or permit to be done any act or thing which may become a nuisance, annoyance, disturbance or unlawful interference to the Landlord or to the tenants or occupiers of other premises in the Building or in any adjoining or neighbouring building.', 10)
  addBlankLine()

  addText('k. Not to assign, transfer, sublet or part with possession of the Premises or any part of the Premises and not to enter into any arrangement which any person who is not a party to this Agreement can obtain possession and use of the Premises.  ', 10)
  addBlankLine()

  addText('l. To permit the Landlord and all persons authorised by the Landlord at all reasonable times to enter into the Premises for viewing the condition of the Premises, taking inventories of the fixtures and fittings in the Premises or carrying out any repair works under the Landlord’s responsibility in this Agreement provided that the Landlord shall give prior oral or written reasonable notice to the Tenant (except in case of emergency).', 10)
  addBlankLine()

  addText('m. To permit the Landlord and any persons authorised by the Landlord, during the last 3 months of the Term, to show the Premises or any part of the Premises to prospective tenants or purchasers at all reasonable times provided that the Landlord shall give prior oral or written reasonable notice to the Tenant.', 10)
  addBlankLine()

  addText('n. At the expiration or early termination of this Agreement, to quietly yield up the Premises including the Landlord’s fixtures and fittings and the Furniture (if any) in good repair and condition (fair wear and tear and damage caused by inherent defects excepted).', 10)
  addBlankLine()

  addText('o. At the expiration or early termination of this Agreement, to re-instate the Premises to its original condition at the commencement of this Agreement and to make good all the damage caused by the erection or removal of any alteration, addition or works which the Tenant may have carried out in the Premises with or without the consent of the Landlord.', 10)
  addBlankLine()

  addText('p. To repair or replace, at the Tenant’s expenses, any item of the Furniture if it is damaged due to the fault, omission or neglect of the Tenant (fair wear and tear and damage caused by inherent defects excepted). If replacement of any item of the Furniture is required, the replacement shall be of the same brand and model or same grade as the damaged item unless otherwise agreed between the Landlord and the Tenant.', 10)
  addBlankLine()


  // Clause 3
  addText('3. DURING THE TERM, THE LANDLORD AGREES WITH THE TENANT AS FOLLOWS:', 12, true)
  addBlankLine()
  
  addText('a.', 10, true)
  addText('i) To pay all the Government rent and property tax which may be imposed by the Government on the Premises;', 10)
  addBlankLine()
  
  if (data.managementFees === 'landlord') {
    addText('ii) To pay all the management fees and service fees payable by the owner or occupier of Premises pursuant to the Deed of Mutual Covenant and Management Agreement (if any) relating to the Building; and', 10)
    addBlankLine() 
} 
  
  if (data.governmentRates === 'landlord') {
    addText('iii) To pay all the Government rates assessed and imposed by the Government on the Premises.', 10)
    addBlankLine() 
} 
  
  addText('b. Provided the Tenant has paid the Rent in accordance with this Agreement and has duly observed and performed all the terms in this Agreement, the Tenant may peacefully hold and enjoy the Premises during the Term without any interruption by the Landlord.', 10)
  addBlankLine()
  
  addText('c. To keep and maintain the external and structural parts of the Premises in a proper state of repair but the Landlord\'s liability shall not be incurred unless and until written notice of any defect or need of repair has been given by the Tenant to the Landlord and the Landlord shall have failed to take reasonable steps to repair and remedy the same after the lapse of a reasonable time from the date of service of such notice.', 10)
  addBlankLine()
  
  // Clause 4
  addText('4. DURING THE TERM, THE PARTIES FURTHER AGREE AS FOLLOWS:-', 12, true)
  addBlankLine()
  
  addText(`a. Upon the signing of this Agreement, the Tenant shall pay to the Landlord a deposit of Hong Kong Dollars $${data.depositAmount} to secure the due observance and performance of the terms in this Agreement by the Tenant (the "Deposit").`, 10)
  addBlankLine()
  
  addText(`b. If the Rent or any payment payable by the Tenant under this Agreement shall be unpaid wholly or partially for 15 days after the due date (whether legally or formally demanded or not) or if the Landlord shall suffer any loss or damages or incur any expenses due to the breach of any term of this Agreement by the Tenant, the Landlord shall deduct any outstanding sum or any loss, damages and expense suffered or incurred by the Landlord from the Deposit without prejudice to the Landlord's right to claim any further damages and any other right or remedy which the Landlord may have against the Tenant in respect of such non-payment or breach of this Agreement. Upon such deduction, the Tenant shall immediately deposit the deducted amount with the Landlord to maintain the Deposit at the sum of Hong Kong Dollars $${data.depositAmount} throughout the Term.`, 10)
  addBlankLine()
  
  addText('c. At the expiration or early termination of this Agreement and provided there is no outstanding Rent and payment owed by the Tenant and there is no breach of any term of this Agreement by the Tenant, the Landlord shall refund the Deposit (less any deductions which the Landlord can make according to this Agreement) to the Tenant without interest within 14 days after the delivery of vacant possession of the Premises (including the Furniture, if any) to the Landlord or after full settlement of any outstanding payment payable by Tenant under this Agreement, whichever is later.', 10)
  addBlankLine()

  addText('d. If the Rent or any payment payable by the Tenant under this Agreement shall be unpaid wholly or partially for 15 days after the due date (whether legally or formally demanded or not) or if the Tenant shall commit a breach of any term in this Agreement or if the Tenant shall become bankrupt or if the Tenant shall suffer any distress or execution to be levied on the Tenant’s furniture or chattels, the Landlord is entitled, at any time after the happening of any such event, to re-enter the Premises and this Agreement shall absolutely cease and determine but without prejudice to any right or remedy that the Landlord may have against the Tenant in respect of any breach of this Agreement.', 10)
  addBlankLine()

  addText('e. If the Premises is subject to an existing mortgage or charge, then this Agreement is subject to the mortgagee or chargee’s prior consent.  If the Landlord fails to obtain such consent and consequently the mortgagee or chargee seeks repossession of the Premises, the Tenant shall have the option to terminate this Agreement by written notice, the Landlord shall return to the Tenant the Deposit without interest within 7 days from the termination of this Agreement and shall indemnify the Tenant against all liabilities, claims, damages and costs incurred by the Tenant as a consequence of such repossession or termination, including relocation costs.', 10)
  addBlankLine()

  addText('f. A written notice served by the Landlord on the Tenant or left at the Premises to the effect that the Landlord exercises the power of re-entry shall be a full and sufficient exercise of such power without actual entry on the part of the Landlord.', 10)
  addBlankLine()

  addText('g. For the purpose of this Agreement, any act, default, neglect, or omission of any guest, visitor, employee, agent, licensee or invitee of the Tenant shall be deemed to be the act, default, neglect or omission of the Tenant.', 10)
  addBlankLine()

  addText('h. The stamp duty payable on this Agreement and its counterpart shall be borne by the Landlord and the Tenant in equal shares.', 10)
  addBlankLine()

  addText('i. This Agreement supersedes all prior negotiation, representation, understanding and agreement made by the parties.  This Agreement constitutes the entire agreement of the parties relating to the letting of the Premises.', 10)
  addBlankLine()

  addText('j. Unless the context requires otherwise, words importing the singular include the plural and vice versa, and words importing a gender include every gender.', 10)
  addBlankLine()

  addText('k. The Landlord and the Tenant further agree to be bound by the additional term contained in Part 2 of the Schedule of this Agreement (if any). ', 10)
  addBlankLine()
  
  // Start Schedule on a new page
  doc.addPage();
  yPosition = 20;

  // Schedule
  addText('THE SCHEDULE REFERRED TO ABOVE', 12, true)
  addBlankLine()
  addText('PART 1', 12, true)
  addBlankLine()
  addText('THE FURNITURE', 12, true)
  addBlankLine()
  
  if (data.furnitureProvided && data.furnitureList) {
    const furnitureItems = data.furnitureList.split('\n').filter(item => item.trim())
    furnitureItems.forEach((item, index) => {
      addText(`${index + 1} ${item.trim()}`, 10)
    })
  } else {
    addText('Nil', 10)
  }
  
  addBlankLine()
  
  // Part 2 - Additional Terms
  if (data.hasEarlyTermination || (data.additionalTerms && data.additionalTerms.trim())) {
    addText('PART 2', 12, true)
    addBlankLine()
    addText('ADDITIONAL TERM AGREED BY THE PARTIES', 12, true)
    addBlankLine()
    
    let termNumber = 5
    
    // Early termination clause
    if (data.hasEarlyTermination) {
      addText(`${termNumber}. Notwithstanding any contrary provision in this Agreement, the parties agree that either the Landlord or the Tenant shall be entitled to early terminate this Tenancy Agreement during the Term, by giving not less than ${data.terminationNoticeMonths} month's prior written notice of such intention of early termination to the other party or by paying ${data.terminationNoticeRentMonths} month's Rent in lieu of such notice to the other party provided this Agreement cannot be terminated before ${data.earliestTerminationDate} pursuant to this Clause. Upon the date of the expiration of such notice or upon payment in lieu of such notice (the "Early Termination Date"), this Agreement shall absolutely cease and determine without prejudice to any claim or right or remedy that either party may have against the other party in respect of any breach of this Agreement. The Tenant shall deliver vacant possession of the Premises to the Landlord in accordance with this Agreement on the Early Termination Date.`, 10)
      termNumber++
    }
    
    // Additional terms
    if (data.additionalTerms && data.additionalTerms.trim()) {
      addBlankLine()
      addText(`${termNumber}. ${data.additionalTerms.trim()}`, 10)
    }
  }
  
  // Start Signatures on a new page
  doc.addPage();
  yPosition = 20;

  // Signatures
  addBlankLine()
  addBlankLine()
  addText('SIGNED BY', 12, true)
  addText(`the Landlord (Holder of HKID Card No ${data.landlordHKID})`, 10)
  addText('________________', 10)
  addText('Landlord\'s signature', 10)
  addBlankLine()
  addBlankLine()
  
  addText('RECEIVED the Sum of HONG KONG DOLLARS', 10)
  addText(`_______________ HK$ ${data.depositAmount} ONLY being the Deposit`, 10)
  addText('paid by the Tenant to the Landlord.', 10)
  addText('________________', 10)
  addText('Landlord\'s signature', 10)
  addBlankLine()
  addBlankLine()
  
  addText('SIGNED BY', 12, true)
  addText(`the Tenant (Holder of HKID Card No ${data.tenantHKID})`, 10)
  addText('________________', 10)
  addText('Tenant\'s signature', 10)
  addBlankLine()
  addBlankLine()
  
  addText('RECEIVED from the Landlord', 10)
  addText('_________ key(s) of the Premises', 10)
  addText('by the Tenant.', 10)
  addText('________________', 10)
  addText('Tenant\'s signature', 10)
  
  // Save the PDF
  const filename = `CLIC_Tenancy_Agreement_${data.tenantName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}
