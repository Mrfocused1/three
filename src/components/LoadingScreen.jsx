import React from 'react'
import './LoadingScreen.css'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-title">THE THREE BUTTONS</h1>
        <div className="dots-container">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
        <p className="loading-text">LOADING</p>
      </div>
    </div>
  )
}

export default LoadingScreen
