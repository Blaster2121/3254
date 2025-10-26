// CLIC Hong Kong Tenancy Agreement Template - Complete Field Mapping
export interface CLICField {
  id: string
  label: string
  type: 'text' | 'date' | 'number' | 'currency' | 'select' | 'textarea' | 'checkbox'
  required: boolean
  placeholder?: string
  options?: string[]
  description?: string
  section: string
}

export interface CLICLeaseData {
  // Header Information
  agreementDay: string
  agreementMonth: string
  agreementYear: string
  
  // Parties
  landlordName: string
  landlordHKID: string
  landlordAddress: string
  tenantName: string
  tenantHKID: string
  
  // Property
  premisesAddress: string
  
  // Term Details
  termYears: string
  termStartDay: string
  termStartMonth: string
  termStartYear: string
  termEndDay: string
  termEndMonth: string
  termEndYear: string
  
  // Rent Details
  monthlyRent: string
  rentInclusive: 'inclusive' | 'exclusive'
  managementFees: 'landlord' | 'tenant'
  governmentRates: 'landlord' | 'tenant'
  
  // Payment Terms
  rentPaymentDay: string
  
  // Deposit
  depositAmount: string
  
  // Furniture
  furnitureProvided: boolean
  furnitureList: string
  
  // Early Termination
  hasEarlyTermination: boolean
  terminationNoticeMonths: string
  terminationNoticeRentMonths: string
  earliestTerminationDate: string
  
  // Additional Terms
  additionalTerms: string
}

export const CLIC_TEMPLATE_FIELDS: CLICField[] = [
  // Header Section
  {
    id: 'agreementDay',
    label: 'Agreement Day',
    type: 'number',
    required: true,
    placeholder: 'e.g., 15',
    description: 'Day of the month when agreement is signed',
    section: 'header'
  },
  {
    id: 'agreementMonth',
    label: 'Agreement Month',
    type: 'text',
    required: true,
    placeholder: 'e.g., January',
    description: 'Month when agreement is signed',
    section: 'header'
  },
  {
    id: 'agreementYear',
    label: 'Agreement Year',
    type: 'number',
    required: true,
    placeholder: 'e.g., 2024',
    description: 'Year when agreement is signed',
    section: 'header'
  },
  
  // Parties Section
  {
    id: 'landlordName',
    label: 'Landlord\'s Full Name',
    type: 'text',
    required: true,
    placeholder: 'Enter landlord\'s full name',
    description: 'Legal name of the property owner',
    section: 'parties'
  },
  {
    id: 'landlordHKID',
    label: 'Landlord\'s HKID Number',
    type: 'text',
    required: true,
    placeholder: 'e.g., A1234567',
    description: 'Hong Kong Identity Card number',
    section: 'parties'
  },
  {
    id: 'landlordAddress',
    label: 'Landlord\'s Address',
    type: 'textarea',
    required: true,
    placeholder: 'Enter landlord\'s address',
    description: 'Landlord\'s residential or business address',
    section: 'parties'
  },
  {
    id: 'tenantName',
    label: 'Tenant\'s Full Name',
    type: 'text',
    required: true,
    placeholder: 'Enter tenant\'s full name',
    description: 'Legal name of the tenant',
    section: 'parties'
  },
  {
    id: 'tenantHKID',
    label: 'Tenant\'s HKID Number',
    type: 'text',
    required: true,
    placeholder: 'e.g., A1234567',
    description: 'Hong Kong Identity Card number',
    section: 'parties'
  },
  
  // Property Section
  {
    id: 'premisesAddress',
    label: 'Premises Address',
    type: 'textarea',
    required: true,
    placeholder: 'Enter complete premises address',
    description: 'Full address of the rental property',
    section: 'property'
  },
  
  // Term Section
  {
    id: 'termYears',
    label: 'Tenancy Term (Years)',
    type: 'number',
    required: true,
    placeholder: 'e.g., 2',
    description: 'Number of years for the tenancy',
    section: 'term'
  },
  {
    id: 'termStartDay',
    label: 'Term Start Day',
    type: 'number',
    required: true,
    placeholder: 'e.g., 1',
    description: 'Day when tenancy starts',
    section: 'term'
  },
  {
    id: 'termStartMonth',
    label: 'Term Start Month',
    type: 'text',
    required: true,
    placeholder: 'e.g., January',
    description: 'Month when tenancy starts',
    section: 'term'
  },
  {
    id: 'termStartYear',
    label: 'Term Start Year',
    type: 'number',
    required: true,
    placeholder: 'e.g., 2024',
    description: 'Year when tenancy starts',
    section: 'term'
  },
  {
    id: 'termEndDay',
    label: 'Term End Day',
    type: 'number',
    required: true,
    placeholder: 'e.g., 31',
    description: 'Day when tenancy ends',
    section: 'term'
  },
  {
    id: 'termEndMonth',
    label: 'Term End Month',
    type: 'text',
    required: true,
    placeholder: 'e.g., December',
    description: 'Month when tenancy ends',
    section: 'term'
  },
  {
    id: 'termEndYear',
    label: 'Term End Year',
    type: 'number',
    required: true,
    placeholder: 'e.g., 2026',
    description: 'Year when tenancy ends',
    section: 'term'
  },
  
  // Rent Section
  {
    id: 'monthlyRent',
    label: 'Monthly Rent (HKD)',
    type: 'currency',
    required: true,
    placeholder: 'e.g., 15000',
    description: 'Monthly rental amount in Hong Kong Dollars',
    section: 'rent'
  },
  {
    id: 'rentInclusive',
    label: 'Rent Inclusive/Exclusive',
    type: 'select',
    required: true,
    options: ['inclusive', 'exclusive'],
    description: 'Whether rent includes management fees and rates',
    section: 'rent'
  },
  {
    id: 'managementFees',
    label: 'Management Fees Paid By',
    type: 'select',
    required: true,
    options: ['landlord', 'tenant'],
    description: 'Who pays the management fees',
    section: 'rent'
  },
  {
    id: 'governmentRates',
    label: 'Government Rates Paid By',
    type: 'select',
    required: true,
    options: ['landlord', 'tenant'],
    description: 'Who pays the government rates',
    section: 'rent'
  },
  {
    id: 'rentPaymentDay',
    label: 'Rent Payment Day',
    type: 'number',
    required: true,
    placeholder: 'e.g., 1',
    description: 'Day of each month when rent is due',
    section: 'rent'
  },
  
  // Deposit Section
  {
    id: 'depositAmount',
    label: 'Security Deposit (HKD)',
    type: 'currency',
    required: true,
    placeholder: 'e.g., 30000',
    description: 'Security deposit amount (usually 2-3 months rent)',
    section: 'deposit'
  },
  
  // Furniture Section
  {
    id: 'furnitureProvided',
    label: 'Furniture Provided',
    type: 'checkbox',
    required: false,
    description: 'Whether landlord provides furniture',
    section: 'furniture'
  },
  {
    id: 'furnitureList',
    label: 'Furniture List',
    type: 'textarea',
    required: false,
    placeholder: 'e.g., 1 split type air-conditioner\n1 washing machine\n1 refrigerator',
    description: 'List of furniture provided by landlord (one item per line)',
    section: 'furniture'
  },
  
  // Early Termination Section
  {
    id: 'hasEarlyTermination',
    label: 'Include Early Termination Clause',
    type: 'checkbox',
    required: false,
    description: 'Whether to include break clause for early termination',
    section: 'termination'
  },
  {
    id: 'terminationNoticeMonths',
    label: 'Termination Notice (Months)',
    type: 'number',
    required: false,
    placeholder: 'e.g., 2',
    description: 'Months of notice required for early termination',
    section: 'termination'
  },
  {
    id: 'terminationNoticeRentMonths',
    label: 'Termination Rent in Lieu (Months)',
    type: 'number',
    required: false,
    placeholder: 'e.g., 2',
    description: 'Months of rent to pay instead of notice',
    section: 'termination'
  },
  {
    id: 'earliestTerminationDate',
    label: 'Earliest Termination Date',
    type: 'text',
    required: false,
    placeholder: 'e.g., 1st January 2025',
    description: 'Earliest date when termination clause can be used',
    section: 'termination'
  },
  
  // Additional Terms
  {
    id: 'additionalTerms',
    label: 'Additional Terms',
    type: 'textarea',
    required: false,
    placeholder: 'Any additional terms agreed by both parties',
    description: 'Any special conditions or additional terms',
    section: 'additional'
  }
]

export const CLIC_SECTIONS = {
  header: 'Agreement Details',
  parties: 'Parties Information',
  property: 'Property Details',
  term: 'Tenancy Term',
  rent: 'Rent and Payment',
  deposit: 'Security Deposit',
  furniture: 'Furniture and Appliances',
  termination: 'Early Termination',
  additional: 'Additional Terms'
}
