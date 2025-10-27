import React, { useState, useEffect } from 'react'
import './FormModal.css'

const FormModal = ({ isOpen, onClose, formType }) => {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    onClose()
    setFormData({})
  }

  if (!isOpen) return null

  const getFormContent = () => {
    switch (formType) {
      case 'work':
        return {
          title: 'Work With Us',
          description: 'Interested in collaborating? Fill out the form below and we\'ll get back to you.',
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'company', label: 'Company/Organization', type: 'text', required: false },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
            { name: 'project', label: 'Project Type', type: 'select', required: true, options: ['Sponsorship', 'Partnership', 'Brand Collaboration', 'Content Creation', 'Other'] },
            { name: 'message', label: 'Tell us about your project', type: 'textarea', required: true }
          ]
        }
      case 'studio':
        return {
          title: 'Book Our Studio',
          description: 'Reserve our studio space for your next project.',
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
            { name: 'date', label: 'Preferred Date', type: 'date', required: true },
            { name: 'time', label: 'Preferred Time', type: 'time', required: true },
            { name: 'duration', label: 'Duration', type: 'select', required: true, options: ['1-2 hours', '3-4 hours', '5-8 hours', 'Full day', 'Multiple days'] },
            { name: 'type', label: 'Project Type', type: 'select', required: true, options: ['Video Production', 'Photography', 'Podcast Recording', 'Live Streaming', 'Other'] },
            { name: 'details', label: 'Additional Details', type: 'textarea', required: false }
          ]
        }
      case 'contact':
        return {
          title: 'Get In Touch',
          description: 'Have a question or want to reach out? Send us a message.',
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Your Message', type: 'textarea', required: true }
          ]
        }
      default:
        return { title: '', description: '', fields: [] }
    }
  }

  const content = getFormContent()

  return (
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="form-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="form-modal-header">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <form onSubmit={handleSubmit} className="form-modal-form">
          {content.fields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                  rows="4"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="form-modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormModal
