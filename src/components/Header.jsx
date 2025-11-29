import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import ContactForm from './ContactForm'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workSubmenuOpen, setWorkSubmenuOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [formType, setFormType] = useState('')

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
              Work
              <span className={`arrow ${workSubmenuOpen ? 'open' : ''}`}>›</span>
            </a>
            <div className={`submenu ${workSubmenuOpen ? 'open' : ''}`}>
              <Link to="/work/production" onClick={toggleMenu}>Production</Link>
              <Link to="/work/headshots" onClick={toggleMenu}>Taking Headshots</Link>
              <Link to="/work/content-creation" onClick={toggleMenu}>Content Creation</Link>
              <Link to="/work/events" onClick={toggleMenu}>Events</Link>
            </div>
          </div>
          <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); openForm('work-with-us'); }}>Work With Us</a>
          <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); openForm('contact'); }}>Get In Touch</a>
          <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); openForm('book-studio'); }}>Book Our Studio</a>
        </nav>
      </div>
      <ContactForm isOpen={formOpen} onClose={closeForm} formType={formType} />
    </>
  )
}

export default Header
