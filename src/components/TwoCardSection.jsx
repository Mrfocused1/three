import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './TwoCardSection.css'

const TwoCardSection = () => {
  const sectionRef = useScrollAnimation({ threshold: 0.1 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)

  const cards = [
    {
      id: 'card7',
      name: 'HARRY',
      image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-36.jpg?raw=true',
      description: 'Harry brings humor and creativity to the Sidemen with his unique content style and entertaining videos.',
      socials: {
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 'card8',
      name: 'JJ',
      image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%208.jpg?raw=true',
      description: 'JJ is a founding member of the Sidemen, known for his music career and entertaining content.',
      socials: {
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        twitch: 'https://twitch.tv'
      }
    }
  ]

  return (
    <section ref={sectionRef} className="two-card-section-wrapper scroll-animate">
      <div className="two-card-section-container">
        <div className={`two-card-section ${expandedCard === 'card7' ? 'portrait-expanded' : ''} ${expandedCard === 'card8' ? 'landscape-expanded' : ''}`}>
          {cards.map((card, index) => {
            const isExpanded = expandedCard === card.id
            const isPortrait = index === 0

            return (
              <div
                key={card.id}
                className={`${isPortrait ? 'portrait-card' : 'landscape-card-large'} ${isExpanded ? 'expanded-two-card' : ''}`}
                onMouseEnter={() => !isExpanded && setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setExpandedCard(isExpanded ? null : card.id)}
              >
                {isExpanded ? (
                  <div className="expanded-content-two">
                    <button className="close-btn-two" onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}>
                      ×
                    </button>
                    <div className="expanded-left-two">
                      <div
                        className="expanded-image-two"
                        style={{
                          backgroundImage: card.image ? `url(${card.image})` : 'none',
                          backgroundColor: card.image ? 'transparent' : '#333'
                        }}
                      >
                        <div className="expanded-name-badge-two">{card.name}</div>
                      </div>
                    </div>
                    <div className="expanded-right-two">
                      <p className="expanded-description-two">{card.description}</p>
                      <div className="expanded-socials-two">
                        {card.socials.youtube && (
                          <a href={card.socials.youtube} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <svg viewBox="0 0 24 24" fill="white">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </a>
                        )}
                        {card.socials.instagram && (
                          <a href={card.socials.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <svg viewBox="0 0 24 24" fill="white">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                        {card.socials.twitter && (
                          <a href={card.socials.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <svg viewBox="0 0 24 24" fill="white">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {card.socials.twitch && (
                          <a href={card.socials.twitch} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <svg viewBox="0 0 24 24" fill="white">
                              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="card-image-wrapper">
                      <div
                        className="card-image-bg"
                        style={{
                          backgroundImage: card.image ? `url(${card.image})` : 'none'
                        }}
                      ></div>
                    </div>
                    <div className={`two-card-overlay ${hoveredCard === card.id ? 'visible' : ''}`}>
                      <span>{card.name}</span>
                      <span className="arrow">→</span>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TwoCardSection
