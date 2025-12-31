import React, { useState, useEffect, useRef } from 'react'
import { useData } from '../context/DataContext'
import FormModal from './FormModal'
import { RandomLetterSwapPingPong } from './RandomLetterSwap'
import './Footer.css'

const Footer = () => {
  const { data } = useData()
  const [activeForm, setActiveForm] = useState(null)
  const ctaRef = useRef(null)

  const openForm = (formType) => {
    setActiveForm(formType)
  }

  const closeForm = () => {
    setActiveForm(null)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [])

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column logo-column">
            <div className="footer-logo">
              <img src="https://github.com/Mrfocused1/trimline-barbershop/blob/main/t3b.jpg?raw=true" alt="The Three Buttons" />
            </div>
            <div className="footer-cta">
              <p ref={ctaRef} className="cta-text">
                Got a Project in mind?<br />
                <RandomLetterSwapPingPong
                  label="Let's Talk."
                  className="letter-swap-container"
                  style={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit',
                    lineHeight: 'inherit'
                  }}
                />
              </p>
              {data.contactInfo?.instagram && (
                <a
                  href={data.contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-link"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="footer-column">
            <ul className="footer-links footer-links-heading">
              <li>
                <a
                  href="http://www.calendly.com/hello-thethreebuttons"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Work With Us
                </a>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openForm('contact'); }}>Get In Touch</a></li>
              <li>
                <a
                  href="https://www.eastdockstudios.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Our Studio
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              {data.contactInfo?.email && (
                <li>
                  <a href={`mailto:${data.contactInfo.email}`}>
                    {data.contactInfo.email}
                  </a>
                </li>
              )}
              {(data.contactInfo?.addressLine1 || data.contactInfo?.addressLine2 || data.contactInfo?.postalCode) && (
                <li>
                  <span style={{ color: '#999', cursor: 'default' }}>
                    {data.contactInfo.addressLine1 && <>{data.contactInfo.addressLine1}<br /></>}
                    {data.contactInfo.addressLine2 && <>{data.contactInfo.addressLine2}<br /></>}
                    {data.contactInfo.postalCode}
                  </span>
                </li>
              )}
            </ul>
          </div>
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
