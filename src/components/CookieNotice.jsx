import React, { useState } from 'react'
import './CookieNotice.css'

const CookieNotice = () => {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="cookie-notice">
      <div className="cookie-content">
        <span className="cookie-text">We use 🍪</span>
        <button onClick={() => setVisible(false)} className="cookie-close">
          ×
        </button>
      </div>
    </div>
  )
}

export default CookieNotice
