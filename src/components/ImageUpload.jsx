import React, { useState, useRef } from 'react'
import './ImageUpload.css'

const ImageUpload = ({ value, onChange, label = "Image", accept = "image/*,video/*" }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState('upload') // 'url' or 'upload' - default to upload since it works now!
  const [urlInput, setUrlInput] = useState(value || '')
  const fileInputRef = useRef(null)

  const handleFileUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      // Check file size - smaller limit for base64 storage (5MB recommended)
      const maxSize = 5 * 1024 * 1024 // 5MB for base64 encoding
      if (file.size > maxSize) {
        alert('File size too large. Maximum size is 5MB.\n\nFor larger files, please:\n1. Upload to Imgur (supports up to 20MB)\n2. Use the URL tab to paste the link')
        setUploading(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        return
      }

      // Convert file to base64 data URL (no backend needed!)
      const reader = new FileReader()

      reader.onload = (e) => {
        const dataUrl = e.target.result
        onChange(dataUrl)
        setUrlInput(dataUrl)
        setUploading(false)
        alert('File uploaded successfully! Saved to browser storage.')
      }

      reader.onerror = (error) => {
        console.error('Error reading file:', error)
        alert('Error reading file. Please try again or use the URL tab.')
        setUploading(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again or use the URL tab.')
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlChange = (e) => {
    const newUrl = e.target.value
    setUrlInput(newUrl)
    // Auto-apply URL as user types (with debounce effect via onChange)
    if (newUrl.trim()) {
      onChange(newUrl)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput)
      alert('URL applied successfully!')
    }
  }

  const isVideo = accept.includes('video')
  const displayLabel = isVideo && label === "Image" ? "Image/Video" : label

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{displayLabel}</label>

      <div className="upload-mode-tabs">
        <button
          type="button"
          className={`mode-tab ${uploadMode === 'url' ? 'active' : ''}`}
          onClick={() => setUploadMode('url')}
        >
          URL
        </button>
        <button
          type="button"
          className={`mode-tab ${uploadMode === 'upload' ? 'active' : ''}`}
          onClick={() => setUploadMode('upload')}
        >
          Upload File
        </button>
      </div>

      {uploadMode === 'url' ? (
        <div className="url-input-section">
          <div>
            <input
              type="url"
              value={urlInput}
              onChange={handleUrlChange}
              onBlur={handleUrlSubmit}
              placeholder="Paste image or video URL here"
              className="url-input"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="url-submit-btn"
            >
              Apply
            </button>
          </div>
          <div className="upload-hint">
            Need hosting? Upload to: <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer">Imgur</a> · <a href="https://cloudinary.com/users/register_free" target="_blank" rel="noopener noreferrer">Cloudinary</a> · <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      ) : (
        <div className="file-upload-section">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="file-input"
            id={`file-upload-${label}`}
          />
          <label htmlFor={`file-upload-${label}`} className="file-upload-label">
            {uploading ? 'Processing...' : '📁 Choose File from Device'}
          </label>
          <div className="upload-hint">
            Max size: 5MB. Supports images and videos.
          </div>
        </div>
      )}

      {value && (
        <div className="image-preview-container">
          {value.match(/\.(mp4|webm|mov|avi|mkv)$/i) ? (
            <video src={value} controls className="image-preview" />
          ) : (
            <img src={value} alt="Preview" className="image-preview" />
          )}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
