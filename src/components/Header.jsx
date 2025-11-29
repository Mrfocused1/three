import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workSubmenuOpen, setWorkSubmenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setWorkSubmenuOpen(false)
  }

  const toggleWorkSubmenu = (e) => {
    e.preventDefault()
    setWorkSubmenuOpen(!workSubmenuOpen)
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
        </nav>
      </div>
    </>
  )
}

export default Header
