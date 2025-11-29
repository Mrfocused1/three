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
        return
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Try to create bucket if it doesn't exist
      const bucketName = 'media'

      // First, check if bucket exists by trying to get it
      const { data: buckets, error: listError } = await supabase.storage.listBuckets()

      if (!listError && buckets) {
        const bucketExists = buckets.some(b => b.name === bucketName)

        if (!bucketExists) {
          // Try to create the bucket
          const { error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 52428800 // 50MB
          })

          if (createError) {
            console.error('Error creating bucket:', createError)
            alert('Storage bucket not configured. Please contact administrator or use URL input instead.')
            return
          }
        }
      }

      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      onChange(publicUrl)
      setUrlInput(publicUrl)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(`Error uploading file: ${error.message}\n\nPlease use the URL tab to paste an image/video URL instead.`)
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlSubmit = () => {
    onChange(urlInput)
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
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter image URL"
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
