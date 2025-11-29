import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import ImageUpload from './ImageUpload'
import Toast from './Toast'
import './ExploreWorkAdmin.css'

const ExploreWorkAdmin = () => {
  const { data, updateExploreWork, updateExploreWorkImage } = useData()
  const [toast, setToast] = useState(null)
  const [editingMetadata, setEditingMetadata] = useState(false)
  const [metadataForm, setMetadataForm] = useState({
    title: '',
    subtitle: ''
  })

  const exploreData = data.exploreWork || {
    title: 'Explore Our Work',
    subtitle: 'Discover our portfolio across different creative services',
    images: Array(9).fill('')
  }

  const handleEditMetadata = () => {
    setMetadataForm({
      title: exploreData.title,
      subtitle: exploreData.subtitle
    })
    setEditingMetadata(true)
  }

  const handleSaveMetadata = () => {
    updateExploreWork(metadataForm)
    setEditingMetadata(false)
    setToast({ message: 'Section updated successfully!', type: 'success' })
  }

  const handleImageChange = (index, url) => {
    updateExploreWorkImage(index, url)
    setToast({ message: `Image ${index + 1} updated!`, type: 'success' })
  }

  return (
    <div className="explore-work-admin">
      <div className="section-header-explore">
        <h2>Explore Our Work Section</h2>
        <p>Manage the portfolio gallery images and section text</p>
      </div>

      {/* Metadata Section */}
      <div className="metadata-section">
        {editingMetadata ? (
          <div className="metadata-edit">
            <div className="metadata-fields">
              <div className="form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  value={metadataForm.title}
                  onChange={(e) => setMetadataForm({ ...metadataForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Section Subtitle</label>
                <input
                  type="text"
                  value={metadataForm.subtitle}
                  onChange={(e) => setMetadataForm({ ...metadataForm, subtitle: e.target.value })}
                />
              </div>
            </div>
            <div className="metadata-actions">
              <button className="cancel-btn" onClick={() => setEditingMetadata(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveMetadata}>Save</button>
            </div>
          </div>
        ) : (
          <div className="metadata-display">
            <div className="metadata-info">
              <h3>{exploreData.title}</h3>
              <p>{exploreData.subtitle}</p>
            </div>
            <button className="edit-metadata-btn" onClick={handleEditMetadata}>
              Edit Section Info
            </button>
          </div>
        )}
      </div>

      {/* Images Grid */}
      <div className="images-grid-section">
        <h3>Gallery Images (9 slots)</h3>
        <p className="hint-text">Upload images that will appear in the expanding hover gallery on the homepage</p>

        <div className="images-grid">
          {Array(9).fill(null).map((_, index) => (
            <div key={index} className="image-slot">
              <div className="image-slot-header">
                <span className="slot-number">Image {index + 1}</span>
              </div>
              <ImageUpload
                value={exploreData.images[index] || ''}
                onChange={(url) => handleImageChange(index, url)}
                label={`Image ${index + 1}`}
                accept="image/*"
              />
            </div>
          ))}
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

export default ExploreWorkAdmin
