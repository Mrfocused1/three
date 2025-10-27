import React, { useState, useEffect } from 'react'
import './EditCardModal.css'

const EditCardModal = ({ isOpen, onClose, card, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    socials: {
      youtube: '',
      instagram: '',
      twitter: '',
      facebook: '',
      twitch: '',
      snapchat: '',
      tiktok: ''
    }
  })
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (isOpen && card) {
      setFormData({
        name: card.name || '',
        description: card.description || '',
        image: card.image || '',
        socials: {
          youtube: card.socials?.youtube || '',
          instagram: card.socials?.instagram || '',
          twitter: card.socials?.twitter || '',
          facebook: card.socials?.facebook || '',
          twitch: card.socials?.twitch || '',
          snapchat: card.socials?.snapchat || '',
          tiktok: card.socials?.tiktok || ''
        }
      })
      setImagePreview(card.image || '')
    }
  }, [isOpen, card])

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
    const { name, value } = e.target
    if (name.startsWith('social-')) {
      const socialName = name.replace('social-', '')
      setFormData(prev => ({
        ...prev,
        socials: {
          ...prev.socials,
          [socialName]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData(prev => ({
          ...prev,
          image: base64String
        }))
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="edit-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="edit-modal-header">
          <h2>Edit Card</h2>
          <p>Update the card details below</p>
        </div>
        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="form-field">
            <label htmlFor="name">Title/Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-field">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="social-fields-section">
            <h3>Social Media Links</h3>
            <p className="social-hint">Leave blank to hide the icon</p>

            <div className="form-field">
              <label htmlFor="social-youtube">YouTube URL</label>
              <input
                type="url"
                id="social-youtube"
                name="social-youtube"
                value={formData.socials.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/@username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="social-instagram">Instagram URL</label>
              <input
                type="url"
                id="social-instagram"
                name="social-instagram"
                value={formData.socials.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="social-twitter">Twitter/X URL</label>
              <input
                type="url"
                id="social-twitter"
                name="social-twitter"
                value={formData.socials.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="social-facebook">Facebook URL</label>
              <input
                type="url"
                id="social-facebook"
                name="social-facebook"
                value={formData.socials.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="social-twitch">Twitch URL</label>
              <input
                type="url"
                id="social-twitch"
                name="social-twitch"
                value={formData.socials.twitch}
                onChange={handleChange}
                placeholder="https://twitch.tv/username"
              />
            </div>
          </div>

          <div className="edit-modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel-edit">
              Cancel
            </button>
            <button type="submit" className="btn-save-edit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCardModal
