import React from 'react'
import { Link } from 'react-router-dom'
import './PortfolioPage.css'

const PhotographyPage = () => {
  // Sample portfolio items - you can replace with real data
  const portfolioItems = [
    {
      id: 1,
      title: 'Photo Shoot 1',
      description: 'Professional photography and visual storytelling',
      image: 'https://via.placeholder.com/600x400',
      category: 'Photography'
    },
    {
      id: 2,
      title: 'Photo Shoot 2',
      description: 'Professional photography and visual storytelling',
      image: 'https://via.placeholder.com/600x400',
      category: 'Photography'
    },
    {
      id: 3,
      title: 'Photo Shoot 3',
      description: 'Professional photography and visual storytelling',
      image: 'https://via.placeholder.com/600x400',
      category: 'Photography'
    },
    {
      id: 4,
      title: 'Photo Shoot 4',
      description: 'Professional photography and visual storytelling',
      image: 'https://via.placeholder.com/600x400',
      category: 'Photography'
    }
  ]

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Photography</h1>
        <p className="portfolio-subtitle">Capturing moments through the lens</p>
      </div>

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
    </div>
  )
}

export default PhotographyPage
