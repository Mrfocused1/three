import React, { useState } from 'react'
import './ContactForm.css'

const ContactForm = ({ isOpen, onClose, formType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData, 'Type:', formType)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    onClose()
  }

  const getFormTitle = () => {
    switch(formType) {
      case 'work-with-us':
        return 'Work With Us'
      case 'contact':
        return 'Get In Touch'
      case 'book-studio':
        return 'Book Our Studio'
      default:
        return 'Contact Us'
    }
  }

  const getFormDescription = () => {
    switch(formType) {
      case 'work-with-us':
        return 'Interested in collaborating? Tell us about your project.'
      case 'contact':
        return 'Have a question? We\'d love to hear from you.'
      case 'book-studio':
        return 'Ready to book our studio? Let us know your requirements.'
      default:
        return 'Fill out the form below and we\'ll get back to you soon.'
    }
  }

  if (!isOpen) return null

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <button className="form-close" onClick={onClose} aria-label="Close form">
          ×
        </button>
        <div className="form-content">
          <h2>{getFormTitle()}</h2>
          <p className="form-description">{getFormDescription()}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
