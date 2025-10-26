// Hong Kong Residential Tenancy Agreement Template Structure
export interface LeaseField {
  id: string
  label: string
  type: 'text' | 'date' | 'number' | 'currency' | 'select' | 'textarea'
  required: boolean
  placeholder?: string
  options?: string[]
  description?: string
}

export interface LeaseTemplate {
  title: string
  fields: LeaseField[]
  sections: {
    [key: string]: {
      title: string
      fields: string[]
    }
  }
}

export const HK_TENANCY_TEMPLATE: LeaseTemplate = {
  title: "Hong Kong Residential Tenancy Agreement",
  sections: {
    parties: {
      title: "Parties to the Agreement",
      fields: ["landlord_name", "landlord_id", "tenant_name", "tenant_id", "witness_name"]
    },
    property: {
      title: "Property Details",
      fields: ["property_address", "property_type", "property_size", "furniture_included"]
    },
    terms: {
      title: "Terms of Tenancy",
      fields: ["tenancy_period_start", "tenancy_period_end", "rent_amount", "rent_payment_method", "deposit_amount"]
    },
    conditions: {
      title: "Terms and Conditions",
      fields: ["use_of_premises", "maintenance_responsibility", "utilities_responsibility", "pet_policy", "subletting_policy"]
    },
    legal: {
      title: "Legal Provisions",
      fields: ["governing_law", "dispute_resolution", "termination_clause"]
    }
  },
  fields: [
    // Parties Section
    {
      id: "landlord_name",
      label: "Landlord's Full Name",
      type: "text",
      required: true,
      placeholder: "Enter landlord's full name",
      description: "The legal owner of the property"
    },
    {
      id: "landlord_id",
      label: "Landlord's HKID Number",
      type: "text",
      required: true,
      placeholder: "Enter HKID number (e.g., A1234567)",
      description: "Hong Kong Identity Card number"
    },
    {
      id: "tenant_name",
      label: "Tenant's Full Name",
      type: "text",
      required: true,
      placeholder: "Enter tenant's full name",
      description: "The person renting the property"
    },
    {
      id: "tenant_id",
      label: "Tenant's HKID Number",
      type: "text",
      required: true,
      placeholder: "Enter HKID number (e.g., A1234567)",
      description: "Hong Kong Identity Card number"
    },
    {
      id: "witness_name",
      label: "Witness Name (Optional)",
      type: "text",
      required: false,
      placeholder: "Enter witness name if applicable",
      description: "Optional witness for the agreement"
    },
    
    // Property Section
    {
      id: "property_address",
      label: "Property Address",
      type: "textarea",
      required: true,
      placeholder: "Enter complete property address",
      description: "Full address including district, street, building, and unit number"
    },
    {
      id: "property_type",
      label: "Property Type",
      type: "select",
      required: true,
      options: ["Apartment", "House", "Studio", "Serviced Apartment", "Other"],
      description: "Type of residential property"
    },
    {
      id: "property_size",
      label: "Property Size (sq ft)",
      type: "number",
      required: true,
      placeholder: "Enter size in square feet",
      description: "Total area of the property"
    },
    {
      id: "furniture_included",
      label: "Furniture Included",
      type: "select",
      required: true,
      options: ["Furnished", "Unfurnished", "Partially Furnished"],
      description: "Furnishing status of the property"
    },
    
    // Terms Section
    {
      id: "tenancy_period_start",
      label: "Tenancy Start Date",
      type: "date",
      required: true,
      description: "When the tenancy begins"
    },
    {
      id: "tenancy_period_end",
      label: "Tenancy End Date",
      type: "date",
      required: true,
      description: "When the tenancy ends"
    },
    {
      id: "rent_amount",
      label: "Monthly Rent (HKD)",
      type: "currency",
      required: true,
      placeholder: "Enter monthly rent amount",
      description: "Monthly rental amount in Hong Kong Dollars"
    },
    {
      id: "rent_payment_method",
      label: "Rent Payment Method",
      type: "select",
      required: true,
      options: ["Bank Transfer", "Cheque", "Cash", "Other"],
      description: "How rent will be paid"
    },
    {
      id: "deposit_amount",
      label: "Security Deposit (HKD)",
      type: "currency",
      required: true,
      placeholder: "Enter deposit amount",
      description: "Security deposit amount (usually 2-3 months rent)"
    },
    
    // Conditions Section
    {
      id: "use_of_premises",
      label: "Permitted Use",
      type: "select",
      required: true,
      options: ["Residential Only", "Residential and Home Office", "Other"],
      description: "How the property may be used"
    },
    {
      id: "maintenance_responsibility",
      label: "Maintenance Responsibility",
      type: "select",
      required: true,
      options: ["Landlord", "Tenant", "Shared"],
      description: "Who is responsible for maintenance"
    },
    {
      id: "utilities_responsibility",
      label: "Utilities Responsibility",
      type: "select",
      required: true,
      options: ["Landlord", "Tenant", "Shared"],
      description: "Who pays for utilities"
    },
    {
      id: "pet_policy",
      label: "Pet Policy",
      type: "select",
      required: true,
      options: ["Pets Allowed", "No Pets", "Small Pets Only"],
      description: "Pet policy for the property"
    },
    {
      id: "subletting_policy",
      label: "Subletting Policy",
      type: "select",
      required: true,
      options: ["Not Allowed", "Allowed with Permission", "Allowed"],
      description: "Whether subletting is permitted"
    },
    
    // Legal Section
    {
      id: "governing_law",
      label: "Governing Law",
      type: "text",
      required: true,
      placeholder: "Hong Kong Law",
      description: "Legal jurisdiction for the agreement"
    },
    {
      id: "dispute_resolution",
      label: "Dispute Resolution",
      type: "select",
      required: true,
      options: ["Court", "Arbitration", "Mediation"],
      description: "How disputes will be resolved"
    },
    {
      id: "termination_clause",
      label: "Termination Notice Period",
      type: "select",
      required: true,
      options: ["1 Month", "2 Months", "3 Months", "Other"],
      description: "Notice period required for termination"
    }
  ]
}

export interface LeaseData {
  [key: string]: string | number
}

export const generateLeaseDocument = (data: LeaseData): string => {
  return `
RESIDENTIAL TENANCY AGREEMENT

This Tenancy Agreement is made on ${new Date().toLocaleDateString()} between:

LANDLORD: ${data.landlord_name || '[LANDLORD NAME]'} (HKID: ${data.landlord_id || '[LANDLORD ID]'})
TENANT: ${data.tenant_name || '[TENANT NAME]'} (HKID: ${data.tenant_id || '[TENANT ID]'})

1. PROPERTY DETAILS
   Address: ${data.property_address || '[PROPERTY ADDRESS]'}
   Type: ${data.property_type || '[PROPERTY TYPE]'}
   Size: ${data.property_size || '[SIZE]'} sq ft
   Furnishing: ${data.furniture_included || '[FURNITURE STATUS]'}

2. TENANCY TERMS
   Tenancy Period: From ${data.tenancy_period_start || '[START DATE]'} to ${data.tenancy_period_end || '[END DATE]'}
   Monthly Rent: HKD ${data.rent_amount || '[RENT AMOUNT]'}
   Payment Method: ${data.rent_payment_method || '[PAYMENT METHOD]'}
   Security Deposit: HKD ${data.deposit_amount || '[DEPOSIT AMOUNT]'}

3. TERMS AND CONDITIONS
   Permitted Use: ${data.use_of_premises || '[PERMITTED USE]'}
   Maintenance: ${data.maintenance_responsibility || '[MAINTENANCE]'}
   Utilities: ${data.utilities_responsibility || '[UTILITIES]'}
   Pet Policy: ${data.pet_policy || '[PET POLICY]'}
   Subletting: ${data.subletting_policy || '[SUBLETTING POLICY]'}

4. LEGAL PROVISIONS
   Governing Law: ${data.governing_law || 'Hong Kong Law'}
   Dispute Resolution: ${data.dispute_resolution || '[DISPUTE RESOLUTION]'}
   Termination Notice: ${data.termination_clause || '[TERMINATION NOTICE]'}

5. SIGNATURES
   Landlord: _________________________ Date: _________
   Tenant: _________________________ Date: _________
   ${data.witness_name ? `Witness: ${data.witness_name} Date: _________` : ''}

This agreement is subject to Hong Kong law and the Land Registration Ordinance.
  `.trim()
}
