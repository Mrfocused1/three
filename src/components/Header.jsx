import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import './Header.css'
import ContactForm from './ContactForm'

const Header = () => {
  const { data } = useData()
  const [menuOpen, setMenuOpen] = useState(false)
  const [workSubmenuOpen, setWorkSubmenuOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [formType, setFormType] = useState('')

  const menuItems = data.menuItems || {
    workTitle: 'Work',
    workSubmenu: [
      { id: 'production', title: 'Production', path: '/work/production' },
      { id: 'headshots', title: 'Taking Headshots', path: '/work/headshots' },
      { id: 'content-creation', title: 'Content Creation', path: '/work/content-creation' },
      { id: 'events', title: 'Events', path: '/work/events' }
    ],
    otherItems: [
      { id: 'work-with-us', title: 'Work With Us', type: 'form' },
      { id: 'contact', title: 'Get In Touch', type: 'form' },
      { id: 'book-studio', title: 'Book Our Studio', type: 'form' }
    ]
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setWorkSubmenuOpen(false)
  }

  const toggleWorkSubmenu = (e) => {
    e.preventDefault()
    setWorkSubmenuOpen(!workSubmenuOpen)
  }

  const openForm = (type) => {
    setFormType(type)
    setFormOpen(true)
    setMenuOpen(false)
  }

  const closeForm = () => {
    setFormOpen(false)
    setFormType('')
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <Link to="/">
              <img src="https://github.com/Mrfocused1/trimline-barbershop/blob/main/t3b.jpg?raw=true" alt="The Three Buttons" />
            </Link>
          </div>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="menu-close" onClick={toggleMenu} aria-label="Close menu">
          ×
        </button>
        <nav className="mobile-nav">
          <div className="menu-item-with-submenu">
            <a href="#" onClick={toggleWorkSubmenu} className={`menu-item ${workSubmenuOpen ? 'active' : ''}`}>
              {menuItems.workTitle}
              <span className={`arrow ${workSubmenuOpen ? 'open' : ''}`}>›</span>
            </a>
            <div className={`submenu ${workSubmenuOpen ? 'open' : ''}`}>
              {menuItems.workSubmenu.map(item => (
                <Link key={item.id} to={item.path} onClick={toggleMenu}>{item.title}</Link>
              ))}
            </div>
          </div>
          {menuItems.otherItems.map(item => (
            <a
              key={item.id}
              href="#"
              className="menu-item"
              onClick={(e) => { e.preventDefault(); openForm(item.id); }}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
      <ContactForm isOpen={formOpen} onClose={closeForm} formType={formType} />
    </>
  )
}

export default Header
