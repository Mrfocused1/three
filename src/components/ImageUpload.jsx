import React, { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import './ImageUpload.css'

const ImageUpload = ({ value, onChange, label = "Image", accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState('url') // 'url' or 'upload'
  const [urlInput, setUrlInput] = useState(value || '')
  const fileInputRef = useRef(null)

  const handleFileUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      onChange(publicUrl)
      setUrlInput(publicUrl)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleUrlSubmit = () => {
    onChange(urlInput)
  }

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>

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
          <img src={value} alt="Preview" className="image-preview" />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
