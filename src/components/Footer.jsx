import React, { useState } from 'react'
import FormModal from './FormModal'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [activeForm, setActiveForm] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  const openForm = (formType) => {
    setActiveForm(formType)
  }

  const closeForm = () => {
    setActiveForm(null)
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <img src="https://github.com/Mrfocused1/trimline-barbershop/blob/main/t3b.jpg?raw=true" alt="The Three Buttons" />
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Work With Us</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); openForm('work'); }}>Work With Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openForm('contact'); }}>Get In Touch</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openForm('studio'); }}>Book Our Studio</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:info@thethreebuttons.co.uk">
                  info@thethreebuttons.co.uk
                </a>
              </li>
              <li>
                <span style={{ color: '#999', cursor: 'default' }}>
                  Lock Studios<br />
                  7 Corsica Square<br />
                  London, E3 3YD
                </span>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </div>

          <div className="footer-column newsletter">
            <h4 className="footer-heading">Latest News</h4>
            <p className="newsletter-text">
              Stay up to date with all things The Three Buttons,
              direct to your inbox
            </p>
            <p className="newsletter-terms">
              By adding your email you accept our terms and conditions
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            Copyright © The Three Buttons All Rights Reserved
          </p>
        </div>
      </div>
      <FormModal
        isOpen={activeForm !== null}
        onClose={closeForm}
        formType={activeForm}
      />
    </footer>
  )
}

export default Footer
