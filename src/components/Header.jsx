import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
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
            <img src="https://github.com/Mrfocused1/trimline-barbershop/blob/main/t3b.jpg?raw=true" alt="The Three Buttons" />
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
          <a href="#" onClick={toggleMenu}>Work With Us</a>
          <a href="#" onClick={toggleMenu}>Get In Touch</a>
          <a href="#" onClick={toggleMenu}>Book Our Studio</a>
        </nav>
      </div>
    </>
  )
}

export default Header
