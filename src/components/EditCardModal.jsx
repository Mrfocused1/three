import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './EditCardModal.css'

const EditCardModal = ({ isOpen, onClose, card, onSave, isHeroSection }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    tagline: '',
    socials: {
      youtube: '',
      instagram: '',
      twitter: '',
      facebook: '',
      twitch: '',
      snapchat: '',
      tiktok: ''
    },
    socialIcons: {
      youtube: '',
      instagram: '',
      twitter: '',
      facebook: '',
      snapchat: '',
      tiktok: ''
    }
  })
  const [imagePreview, setImagePreview] = useState('')
  const [currentStep, setCurrentStep] = useState(0)

  // Check if editing a channel
  const isEditingChannel = card?.subtitle !== undefined && card?.youtubeUrl !== undefined

  // Define steps for channels
  const channelSteps = [
    { title: 'Channel Info', fields: ['channelName', 'channelSubtitle'] },
    { title: 'Upload Image', fields: ['image'] },
    { title: 'YouTube URL', fields: ['channelYoutubeUrl'] }
  ]

  // Define steps for non-hero cards
  const nonHeroSteps = [
    { title: 'Basic Info', fields: ['name', 'description'] },
    { title: 'Upload Image', fields: ['image'] },
    { title: 'Social Media (1/2)', fields: ['youtube', 'instagram', 'twitter', 'facebook'] },
    { title: 'Social Media (2/2)', fields: ['twitch'] }
  ]

  // Define steps for hero section
  const heroSteps = [
    { title: 'Hero Tagline', fields: ['tagline'] },
    { title: 'Upload Image', fields: ['mainImage'] },
    { title: 'Social Media (1/2)', fields: ['youtube', 'instagram', 'twitter', 'facebook'] },
    { title: 'Social Media (2/2)', fields: ['snapchat', 'tiktok'] }
  ]

  const steps = isEditingChannel ? channelSteps : (isHeroSection ? heroSteps : nonHeroSteps)
  const totalSteps = steps.length
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  useEffect(() => {
    if (isOpen && card) {
      setCurrentStep(0)
      // Check if editing video URL
      if (card.videoUrl !== undefined && card.subtitle === undefined) {
        setFormData({
          videoUrl: card.videoUrl || ''
        })
      } else if (isEditingChannel) {
        // Editing a channel
        setFormData({
          channelName: card.name || '',
          channelSubtitle: card.subtitle || '',
          image: card.image || '',
          channelYoutubeUrl: card.youtubeUrl || ''
        })
        setImagePreview(card.image || '')
      } else if (isHeroSection) {
        setFormData({
          mainImage: card.mainImage || '',
          tagline: card.tagline || '',
          socialIcons: {
            youtube: card.socialIcons?.youtube || '',
            instagram: card.socialIcons?.instagram || '',
            twitter: card.socialIcons?.twitter || '',
            facebook: card.socialIcons?.facebook || '',
            snapchat: card.socialIcons?.snapchat || '',
            tiktok: card.socialIcons?.tiktok || ''
          }
        })
        setImagePreview(card.mainImage || '')
      } else {
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
    }
  }, [isOpen, card, isHeroSection, isEditingChannel])

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
    if (name.startsWith('socialIcon-')) {
      const socialName = name.replace('socialIcon-', '')
      setFormData(prev => ({
        ...prev,
        socialIcons: {
          ...prev.socialIcons,
          [socialName]: value
        }
      }))
    } else if (name.startsWith('social-')) {
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${fileName}`

        console.log('Uploading image to Supabase Storage...')

        // Upload image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          throw uploadError
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        const publicUrl = publicUrlData.publicUrl

        console.log('Image uploaded successfully:', publicUrl)

        // Update form data with public URL
        if (isHeroSection) {
          setFormData(prev => ({
            ...prev,
            mainImage: publicUrl
          }))
        } else {
          setFormData(prev => ({
            ...prev,
            image: publicUrl
          }))
        }
        setImagePreview(publicUrl)
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Error uploading image: ' + error.message)
      }
    }
  }

  const handleNext = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if editing video URL (bypass step logic)
    const isEditingVideo = card?.videoUrl !== undefined && card?.subtitle === undefined

    // If editing video, save directly without step checking
    if (isEditingVideo) {
      onSave(formData)
      onClose()
      setCurrentStep(0)
      return
    }

    // If not on last step, go to next step instead of submitting
    // This handles the case when user presses Enter in an input field
    if (!isLastStep) {
      handleNext()
      return
    }

    // Transform channel data back to correct format
    if (isEditingChannel) {
      const channelData = {
        name: formData.channelName,
        subtitle: formData.channelSubtitle,
        image: formData.image,
        youtubeUrl: formData.channelYoutubeUrl
      }
      onSave(channelData)
    } else {
      onSave(formData)
    }

    onClose()
    setCurrentStep(0)
  }

  if (!isOpen) return null

  // Check if editing video URL
  const isEditingVideo = card?.videoUrl !== undefined

  // If editing video, render simple form
  if (isEditingVideo) {
    return (
      <div className="edit-modal-overlay" onClick={onClose}>
        <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="edit-modal-close" onClick={onClose}>
            ×
          </button>
          <div className="edit-modal-header">
            <h2>Edit YouTube Video</h2>
            <p>Update the YouTube video URL</p>
          </div>

          <form onSubmit={handleSubmit} className="edit-modal-form">
            <div className="form-field">
              <label htmlFor="videoUrl">YouTube Video URL</label>
              <p className="image-dimension-guide">Paste the YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)</p>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl || ''}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
              />
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

  const renderField = (fieldName) => {
    // Channel fields
    if (fieldName === 'channelName') {
      return (
        <div className="form-field" key="channelName">
          <label htmlFor="channelName">Channel Name</label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            value={formData.channelName || ''}
            onChange={handleChange}
            placeholder="e.g., SIDEMEN"
          />
        </div>
      )
    }

    if (fieldName === 'channelSubtitle') {
      return (
        <div className="form-field" key="channelSubtitle">
          <label htmlFor="channelSubtitle">Channel Subtitle</label>
          <input
            type="text"
            id="channelSubtitle"
            name="channelSubtitle"
            value={formData.channelSubtitle || ''}
            onChange={handleChange}
            placeholder="e.g., XIX, Reacts, Shorts"
          />
        </div>
      )
    }

    if (fieldName === 'channelYoutubeUrl') {
      return (
        <div className="form-field" key="channelYoutubeUrl">
          <label htmlFor="channelYoutubeUrl">YouTube Channel URL</label>
          <p className="image-dimension-guide">Paste the full YouTube channel URL</p>
          <input
            type="text"
            id="channelYoutubeUrl"
            name="channelYoutubeUrl"
            value={formData.channelYoutubeUrl || ''}
            onChange={handleChange}
            placeholder="https://www.youtube.com/@channelname"
          />
        </div>
      )
    }

    // Basic info fields
    if (fieldName === 'name') {
      return (
        <div className="form-field" key="name">
          <label htmlFor="name">Title/Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </div>
      )
    }

    if (fieldName === 'description') {
      return (
        <div className="form-field" key="description">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows="4"
          />
        </div>
      )
    }

    if (fieldName === 'tagline') {
      return (
        <div className="form-field" key="tagline">
          <label htmlFor="tagline">Hero Tagline</label>
          <textarea
            id="tagline"
            name="tagline"
            value={formData.tagline || ''}
            onChange={handleChange}
            rows="4"
            placeholder="A group of friends with a few videos online..."
          />
        </div>
      )
    }

    // Image upload
    if (fieldName === 'image' || fieldName === 'mainImage') {
      return (
        <div className="form-field" key={fieldName}>
          <label htmlFor="image">Upload Image</label>
          <p className="image-dimension-guide">Recommended dimensions: 1920x1080px (16:9 ratio)</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>
      )
    }

    // Social media fields
    const socialPlatforms = {
      youtube: { label: 'YouTube URL', placeholder: 'Paste YouTube URL (e.g., https://youtube.com/@username)' },
      instagram: { label: 'Instagram URL', placeholder: 'Paste Instagram URL (e.g., https://instagram.com/username)' },
      twitter: { label: 'Twitter/X URL', placeholder: 'Paste Twitter URL (e.g., https://twitter.com/username)' },
      facebook: { label: 'Facebook URL', placeholder: 'Paste Facebook URL (e.g., https://facebook.com/username)' },
      twitch: { label: 'Twitch URL', placeholder: 'Paste Twitch URL (e.g., https://twitch.tv/username)' },
      snapchat: { label: 'Snapchat URL', placeholder: 'Paste Snapchat URL (e.g., https://snapchat.com/add/username)' },
      tiktok: { label: 'TikTok URL', placeholder: 'Paste TikTok URL (e.g., https://tiktok.com/@username)' }
    }

    if (socialPlatforms[fieldName]) {
      const platform = socialPlatforms[fieldName]
      const inputName = isHeroSection ? `socialIcon-${fieldName}` : `social-${fieldName}`
      const value = isHeroSection
        ? (formData.socialIcons?.[fieldName] || '')
        : (formData.socials?.[fieldName] || '')

      return (
        <div className="form-field" key={fieldName}>
          <label htmlFor={inputName}>{platform.label}</label>
          <input
            type="text"
            id={inputName}
            name={inputName}
            value={value}
            onChange={handleChange}
            placeholder={platform.placeholder}
          />
        </div>
      )
    }

    return null
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="edit-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="edit-modal-header">
          <h2>Edit Card - {currentStepData.title}</h2>
          <p>Step {currentStep + 1} of {totalSteps}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
          <div className="progress-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`progress-step ${index <= currentStep ? 'active' : ''}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="form-step">
            {currentStepData.fields.map(field => renderField(field))}
          </div>

          <div className="edit-modal-actions">
            {!isFirstStep && (
              <button
                type="button"
                onClick={(e) => handleBack(e)}
                className="btn-back"
              >
                Back
              </button>
            )}
            {!isLastStep ? (
              <button
                type="button"
                onClick={(e) => handleNext(e)}
                className="btn-next"
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn-save-edit">
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCardModal
