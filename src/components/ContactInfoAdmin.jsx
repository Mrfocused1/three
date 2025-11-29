import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import Toast from './Toast'
import './ContactInfoAdmin.css'

const ContactInfoAdmin = () => {
  const { data, updateContactInfo } = useData()
  const [toast, setToast] = useState(null)
  const [editedData, setEditedData] = useState(data.contactInfo || {
    email: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    instagram: ''
  })

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    updateContactInfo(editedData)
    setToast({ message: 'Contact information updated successfully!', type: 'success' })
  }

  const handleReset = () => {
    setEditedData(data.contactInfo)
    setToast({ message: 'Changes reset', type: 'info' })
  }

  return (
    <div className="contact-info-admin">
      <div className="section-header-contact">
        <h2>Contact Information</h2>
        <p>Update the contact details displayed in the hero and footer sections</p>
      </div>

      <div className="contact-form-section">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={editedData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="hello@example.com"
            className="form-input"
          />
          <span className="field-hint">Used in hero and footer sections</span>
        </div>

        <div className="form-group">
          <label htmlFor="addressLine1">Address Line 1</label>
          <input
            id="addressLine1"
            type="text"
            value={editedData.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            placeholder="128 City Road"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="addressLine2">Address Line 2</label>
          <input
            id="addressLine2"
            type="text"
            value={editedData.addressLine2}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
            placeholder="London, United Kingdom"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            value={editedData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="EC1V 2NX"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instagram">Instagram URL</label>
          <input
            id="instagram"
            type="url"
            value={editedData.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
            placeholder="https://instagram.com/thethreebuttons"
            className="form-input"
          />
          <span className="field-hint">Displayed in footer</span>
        </div>

        <div className="action-buttons">
          <button onClick={handleReset} className="reset-btn">
            Reset Changes
          </button>
          <button onClick={handleSave} className="save-btn">
            Save Contact Info
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default ContactInfoAdmin
