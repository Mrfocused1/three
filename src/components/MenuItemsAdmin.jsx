import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import Toast from './Toast'
import './MenuItemsAdmin.css'

const MenuItemsAdmin = () => {
  const { data, updateMenuItem, updateWorkTitle } = useData()
  const [toast, setToast] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [editingWorkTitle, setEditingWorkTitle] = useState(false)
  const [workTitleValue, setWorkTitleValue] = useState('')

  const menuItems = data.menuItems || {
    workTitle: 'Work',
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

  const handleStartEditWorkTitle = () => {
    setEditingWorkTitle(true)
    setWorkTitleValue(menuItems.workTitle)
  }

  const handleSaveWorkTitle = () => {
    if (workTitleValue.trim()) {
      updateWorkTitle(workTitleValue.trim())
      setToast({ message: 'Work menu title updated successfully!', type: 'success' })
      setEditingWorkTitle(false)
      setWorkTitleValue('')
    }
  }

  const handleCancelWorkTitle = () => {
    setEditingWorkTitle(false)
    setWorkTitleValue('')
  }

  return (
    <div className="menu-items-admin">
      <div className="section-header-menu">
        <h2>Menu Items Management</h2>
        <p>Edit the titles of menu items that appear in the navigation</p>
      </div>

      {/* Work Menu Title */}
      <div className="menu-section">
        <h3>Work Menu Title</h3>
        <p className="section-desc">The main "Work" dropdown title in the menu</p>

        <div className="menu-items-list">
          <div className="menu-item-card">
            {editingWorkTitle ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={workTitleValue}
                  onChange={(e) => setWorkTitleValue(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <div className="edit-actions">
                  <button className="cancel-btn-small" onClick={handleCancelWorkTitle}>Cancel</button>
                  <button className="save-btn-small" onClick={handleSaveWorkTitle}>Save</button>
                </div>
              </div>
            ) : (
              <div className="view-mode">
                <div className="item-info">
                  <span className="item-title">{menuItems.workTitle}</span>
                  <span className="item-type">Main menu dropdown</span>
                </div>
                <button
                  className="edit-btn"
                  onClick={handleStartEditWorkTitle}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
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
