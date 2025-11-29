import React, { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import './ImageUpload.css'

const ImageUpload = ({ value, onChange, label = "Image", accept = "image/*,video/*" }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState('url') // 'url' or 'upload'
  const [urlInput, setUrlInput] = useState(value || '')
  const fileInputRef = useRef(null)

  const handleFileUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      // Check file size (max 50MB)
      const maxSize = 50 * 1024 * 1024 // 50MB
      if (file.size > maxSize) {
        alert('File size too large. Maximum size is 50MB.')
        setUploading(false)
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`
      const bucketName = 'media'

      // Attempt upload directly - simpler approach
      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)

        // If bucket doesn't exist, show helpful message
        if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('bucket')) {
          alert('File upload is not configured yet.\n\nPlease use the URL tab instead:\n1. Upload your image/video to Imgur, Cloudinary, or GitHub\n2. Copy the direct URL\n3. Click the "URL" tab above\n4. Paste the URL and click Apply')
          // Auto-switch to URL mode
          setUploadMode('url')
        } else {
          alert(`Upload failed: ${uploadError.message}\n\nPlease use the URL tab instead.`)
          setUploadMode('url')
        }
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      onChange(publicUrl)
      setUrlInput(publicUrl)
      alert('File uploaded successfully!')
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(`Upload error. Please use the URL tab instead.\n\nHow to use URL tab:\n1. Upload to Imgur or similar service\n2. Copy the direct image/video URL\n3. Switch to URL tab\n4. Paste and click Apply`)
      setUploadMode('url')
    } finally {
      setUploading(false)
      // Reset file input
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
            {uploading ? 'Uploading...' : 'Choose File'}
          </label>
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
