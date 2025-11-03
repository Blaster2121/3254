import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CLIC_TEMPLATE_FIELDS, CLIC_SECTIONS, CLICLeaseData, CLICField } from '../../services/clicTemplate'
import { generateCLICLeasePDF } from '../../services/clicPdfGenerator'
import './LeaseForm.css'

interface LeaseFormProps {
  onComplete: (data: CLICLeaseData) => void
}

const LeaseForm: React.FC<LeaseFormProps> = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState<string>('header')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<CLICLeaseData>({
    mode: 'onChange' // Validate on change for better UX
  })
  
  const sections = Object.keys(CLIC_SECTIONS)
  const currentSectionData = CLIC_SECTIONS[currentSection as keyof typeof CLIC_SECTIONS]
  const currentFields = CLIC_TEMPLATE_FIELDS.filter(field => 
    field.section === currentSection
  )
  
  const onSubmit = async (data: CLICLeaseData) => {
    setIsGenerating(true)
    
    try {
      // Generate the CLIC lease document
      generateCLICLeasePDF(data)
      
      // Notify parent component
      onComplete(data)
      
    } catch (error) {
      console.error('Error generating lease:', error)
      alert('Error generating lease document. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }
  
  const renderField = (field: CLICField) => {
    const fieldName = field.id as keyof CLICLeaseData
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...register(fieldName, { 
              required: field.required ? `${field.label} is required` : false 
            })}
            placeholder={field.placeholder}
            className={`form-input ${errors[fieldName] ? 'error' : ''}`}
          />
        )
      
      case 'textarea':
        return (
          <textarea
            {...register(fieldName, { 
              required: field.required ? `${field.label} is required` : false 
            })}
            placeholder={field.placeholder}
            rows={3}
            className={`form-textarea ${errors[fieldName] ? 'error' : ''}`}
          />
        )
      
      case 'date':
        return (
          <input
            type="date"
            {...register(fieldName, { 
              required: field.required ? `${field.label} is required` : false 
            })}
            className={`form-input ${errors[fieldName] ? 'error' : ''}`}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            {...register(fieldName, { 
              required: field.required ? `${field.label} is required` : false 
            })}
            placeholder={field.placeholder}
            className={`form-input ${errors[fieldName] ? 'error' : ''}`}
          />
        )
      
      case 'currency':
        return (
          <div className="currency-input">
            <span className="currency-symbol">HKD</span>
            <input
              type="number"
              {...register(fieldName, { 
                required: field.required ? `${field.label} is required` : false 
              })}
              placeholder={field.placeholder}
              className={`form-input ${errors[fieldName] ? 'error' : ''}`}
            />
          </div>
        )
      
      case 'select':
        return (
          <select
            {...register(fieldName, { 
              required: field.required ? `${field.label} is required` : false,
              validate: (value) => {
                if (field.required && !value) {
                  return `${field.label} is required`
                }
                return true
              }
            })}
            className={`form-select ${errors[fieldName] ? 'error' : ''}`}
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      
      case 'checkbox':
        return (
          <div className="checkbox-group">
            <input
              type="checkbox"
              {...register(fieldName)}
              className="form-checkbox"
            />
            <label className="checkbox-label">Yes</label>
          </div>
        )
      
      default:
        return null
    }
  }
  
  const nextSection = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    // Validate all required fields in current section before proceeding
    const currentSectionFields = currentFields.filter(field => field.required)
    const fieldNames = currentSectionFields.map(field => field.id as keyof CLICLeaseData)
    
    // Trigger validation for all required fields in current section
    const isValid = await trigger(fieldNames)
    
    if (!isValid) {
      // Validation failed, don't proceed to next section
      return
    }
    
    const currentIndex = sections.indexOf(currentSection)
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1])
    }
  }
  
  const prevSection = () => {
    const currentIndex = sections.indexOf(currentSection)
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1])
    }
  }
  
  return (
    <div className="lease-form">
      <div className="form-header">
        <h2>Hong Kong Residential Tenancy Agreement </h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((sections.indexOf(currentSection) + 1) / sections.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          Section {sections.indexOf(currentSection) + 1} of {sections.length}: {currentSectionData}
          {sections.indexOf(currentSection) === sections.length - 1 && (
            <span className="final-section"> (Final Section)</span>
          )}
        </p>
      </div>

      <div style={{
        margin: '0 20px 20px 20px',
        padding: '12px 16px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '6px',
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#856404'
      }}>
        <strong>⚠️ Disclaimer:</strong> Nothing in this Tool is intended to be nor should be construed as legal advice. This is an educational project created by students. Please consult your lawyer for legal advice.
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="form-content">
        <div className="section-content">
          <h3>{currentSectionData}</h3>
          
          <div className="fields-grid">
            {currentFields.map(field => (
              <div key={field.id} className="field-group">
                <label className="field-label">
                  {field.label}
                  {field.required && <span className="required">*</span>}
                </label>
                {renderField(field)}
                {field.description && (
                  <p className="field-description">{field.description}</p>
                )}
                {errors[field.id as keyof CLICLeaseData] && (
                  <p className="field-error">
                    {errors[field.id as keyof CLICLeaseData]?.message || 'This field is required'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-navigation">
          <button
            type="button"
            onClick={prevSection}
            disabled={sections.indexOf(currentSection) === 0}
            className="nav-button prev"
          >
            Previous
          </button>
          
          {sections.indexOf(currentSection) < sections.length - 1 ? (
            <button
              type="button"
              onClick={(e) => nextSection(e)}
              className="nav-button next"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isGenerating}
              className="nav-button generate"
            >
              {isGenerating ? 'Generating PDF...' : 'Generate CLIC Lease Agreement'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default LeaseForm
