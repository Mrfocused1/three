import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import Toast from './Toast'
import './MenuItemsAdmin.css'

const MenuItemsAdmin = () => {
  const { data, updateMenuItem } = useData()
  const [toast, setToast] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [editValue, setEditValue] = useState('')

  const menuItems = data.menuItems || {
    workSubmenu: [],
    otherItems: []
  }

  const handleStartEdit = (category, item) => {
    setEditingItem({ category, id: item.id })
    setEditValue(item.title)
  }

  const handleSave = () => {
    if (editingItem && editValue.trim()) {
      updateMenuItem(editingItem.category, editingItem.id, editValue.trim())
      setToast({ message: 'Menu item updated successfully!', type: 'success' })
      setEditingItem(null)
      setEditValue('')
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
    setEditValue('')
  }

  return (
    <div className="menu-items-admin">
      <div className="section-header-menu">
        <h2>Menu Items Management</h2>
        <p>Edit the titles of menu items that appear in the navigation</p>
      </div>

      {/* Work Submenu */}
      <div className="menu-section">
        <h3>Work Submenu Items</h3>
        <p className="section-desc">These appear under the "Work" dropdown</p>

        <div className="menu-items-list">
          {menuItems.workSubmenu.map((item) => (
            <div key={item.id} className="menu-item-card">
              {editingItem?.category === 'workSubmenu' && editingItem?.id === item.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button className="cancel-btn-small" onClick={handleCancel}>Cancel</button>
                    <button className="save-btn-small" onClick={handleSave}>Save</button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <div className="item-info">
                    <span className="item-title">{item.title}</span>
                    <span className="item-path">{item.path}</span>
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => handleStartEdit('workSubmenu', item)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Other Menu Items */}
      <div className="menu-section">
        <h3>Other Menu Items</h3>
        <p className="section-desc">These open contact forms when clicked</p>

        <div className="menu-items-list">
          {menuItems.otherItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              {editingItem?.category === 'otherItems' && editingItem?.id === item.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button className="cancel-btn-small" onClick={handleCancel}>Cancel</button>
                    <button className="save-btn-small" onClick={handleSave}>Save</button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <div className="item-info">
                    <span className="item-title">{item.title}</span>
                    <span className="item-type">Form: {item.id}</span>
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => handleStartEdit('otherItems', item)}
                  >
                    Edit
                  </button>
                </div>
              )}
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

export default MenuItemsAdmin
