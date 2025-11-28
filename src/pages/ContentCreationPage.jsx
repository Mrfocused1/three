import React from 'react'
import { Link } from 'react-router-dom'
import './PortfolioPage.css'

const ContentCreationPage = () => {
  // Sample portfolio items - you can replace with real data
  const portfolioItems = [
    {
      id: 1,
      title: 'Content Project 1',
      description: 'Creative content creation and strategy',
      image: 'https://via.placeholder.com/600x400',
      category: 'Content Creation'
    },
    {
      id: 2,
      title: 'Content Project 2',
      description: 'Creative content creation and strategy',
      image: 'https://via.placeholder.com/600x400',
      category: 'Content Creation'
    },
    {
      id: 3,
      title: 'Content Project 3',
      description: 'Creative content creation and strategy',
      image: 'https://via.placeholder.com/600x400',
      category: 'Content Creation'
    },
    {
      id: 4,
      title: 'Content Project 4',
      description: 'Creative content creation and strategy',
      image: 'https://via.placeholder.com/600x400',
      category: 'Content Creation'
    }
  ]

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Content Creation</h1>
        <p className="portfolio-subtitle">Engaging content for digital platforms</p>
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

export default ContentCreationPage
