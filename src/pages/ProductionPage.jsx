import React from 'react'
import { Link } from 'react-router-dom'
import './PortfolioPage.css'

const ProductionPage = () => {
  // Sample portfolio items - you can replace with real data
  const portfolioItems = [
    {
      id: 1,
      title: 'Project Title 1',
      description: 'Description of the production project',
      image: 'https://via.placeholder.com/600x400',
      category: 'Production'
    },
    {
      id: 2,
      title: 'Project Title 2',
      description: 'Description of the production project',
      image: 'https://via.placeholder.com/600x400',
      category: 'Production'
    },
    {
      id: 3,
      title: 'Project Title 3',
      description: 'Description of the production project',
      image: 'https://via.placeholder.com/600x400',
      category: 'Production'
    },
    {
      id: 4,
      title: 'Project Title 4',
      description: 'Description of the production project',
      image: 'https://via.placeholder.com/600x400',
      category: 'Production'
    }
  ]

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Production</h1>
        <p className="portfolio-subtitle">Professional production work and projects</p>
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

export default ProductionPage
