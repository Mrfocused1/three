import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import WorkPageItemModal from './WorkPageItemModal'
import Toast from './Toast'
import './WorkPagesAdmin.css'

const WorkPagesAdmin = () => {
  const {
    data,
    updateWorkPageMetadata,
    addWorkPageItem,
    updateWorkPageItem,
    deleteWorkPageItem
  } = useData()

  const [selectedPage, setSelectedPage] = useState('production')
  const [editingItem, setEditingItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [editingMetadata, setEditingMetadata] = useState(false)
  const [metadataForm, setMetadataForm] = useState({ title: '', subtitle: '' })

  const workPageKeys = {
    production: 'Production',
    headshots: 'Headshots',
    contentCreation: 'Content Creation',
    events: 'Events'
  }

  const handleAddItem = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleSaveItem = (item) => {
    if (editingItem) {
      updateWorkPageItem(selectedPage, item.id, item)
      setToast({ message: 'Portfolio item updated successfully!', type: 'success' })
    } else {
      addWorkPageItem(selectedPage, item)
      setToast({ message: 'Portfolio item added successfully!', type: 'success' })
    }
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (itemId) => {
    deleteWorkPageItem(selectedPage, itemId)
    setToast({ message: 'Portfolio item deleted successfully!', type: 'success' })
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleEditMetadata = () => {
    const currentPage = data.workPages[selectedPage]
    setMetadataForm({
      title: currentPage.title,
      subtitle: currentPage.subtitle
    })
    setEditingMetadata(true)
  }

  const handleSaveMetadata = () => {
    updateWorkPageMetadata(selectedPage, metadataForm)
    setEditingMetadata(false)
    setToast({ message: 'Page metadata updated successfully!', type: 'success' })
  }

  const currentPage = data.workPages[selectedPage]

  return (
    <div className="work-pages-admin">
      <div className="work-pages-header">
        <h2>Work Pages Management</h2>
        <div className="page-selector">
          {Object.entries(workPageKeys).map(([key, label]) => (
            <button
              key={key}
              className={`page-tab ${selectedPage === key ? 'active' : ''}`}
              onClick={() => setSelectedPage(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="page-metadata-section">
        {editingMetadata ? (
          <div className="metadata-edit">
            <div className="metadata-fields">
              <div className="form-group">
                <label>Page Title</label>
                <input
                  type="text"
                  value={metadataForm.title}
                  onChange={(e) => setMetadataForm({ ...metadataForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Page Subtitle</label>
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
              <h3>{currentPage.title}</h3>
              <p>{currentPage.subtitle}</p>
            </div>
            <button className="edit-metadata-btn" onClick={handleEditMetadata}>
              Edit Page Info
            </button>
          </div>
        )}
      </div>

      <div className="portfolio-items-section">
        <div className="section-header">
          <h3>Portfolio Items ({currentPage.items.length})</h3>
          <button className="add-item-btn" onClick={handleAddItem}>
            + Add Item
          </button>
        </div>

        <div className="portfolio-items-grid">
          {currentPage.items.length === 0 ? (
            <div className="empty-state">
              <p>No portfolio items yet. Click "Add Item" to get started.</p>
            </div>
          ) : (
            currentPage.items.map((item) => (
              <div key={item.id} className="portfolio-item-card" onClick={() => handleEditItem(item)}>
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                  <div className="item-overlay">
                    <span className="edit-text">Click to edit</span>
                  </div>
                </div>
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p className="item-category">{item.category}</p>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <WorkPageItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
        }}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />

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

export default WorkPagesAdmin
