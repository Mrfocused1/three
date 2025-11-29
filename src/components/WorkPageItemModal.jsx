import React, { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'
import './WorkPageItemModal.css'

const WorkPageItemModal = ({ isOpen, onClose, item, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    category: ''
  })

  useEffect(() => {
    if (item) {
      setFormData(item)
    } else {
      setFormData({
        id: Date.now(),
        title: '',
        description: '',
        image: '',
        category: ''
      })
    }
  }, [item])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(formData.id)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content work-item-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <ImageUpload
            label="Image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            accept="image/*,video/*"
          />
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            {item && (
              <button type="button" className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            )}
            <div className="right-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkPageItemModal
