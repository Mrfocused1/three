import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import './PortfolioPage.css'

const EventsPage = () => {
  const { data, loading } = useData()
  const pageData = data.workPages?.events || { title: 'Events', subtitle: 'Event coverage and live production', items: [] }
  const portfolioItems = pageData.items

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>{pageData.title}</h1>
        <p className="portfolio-subtitle">{pageData.subtitle}</p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading portfolio...</div>
      ) : portfolioItems.length === 0 ? (
        <div className="empty-portfolio">
          <p>No portfolio items yet. Visit the admin panel to add items.</p>
        </div>
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

export default EventsPage
