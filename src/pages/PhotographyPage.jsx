import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PortfolioPage.css'

const PhotographyPage = () => {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.pexels.com/v1/search?query=professional photography studio&per_page=8', {
          headers: {
            Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp'
          }
        })
        const data = await response.json()

        const items = data.photos.map((photo, index) => ({
          id: photo.id,
          title: `Photography Project ${index + 1}`,
          description: photo.alt || 'Professional photography and visual storytelling',
          image: photo.src.large,
          category: 'Photography',
          photographer: photo.photographer
        }))

        setPortfolioItems(items)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching images:', error)
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Photography</h1>
        <p className="portfolio-subtitle">Capturing moments through the lens</p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading portfolio...</div>
      ) : (
        <div className="portfolio-grid">
          {portfolioItems.map(item => (
            <div key={item.id} className="portfolio-item">
              <div className="portfolio-image">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <span className="category-tag">{item.category}</span>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotographyPage
