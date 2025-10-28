import React, { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'
import LoadingScreen from '../components/LoadingScreen'
import EditCardModal from '../components/EditCardModal'
import './AdminPage.css'

const AdminPage = () => {
  const { data, updateCard, updateHero } = useData()
  const [loading, setLoading] = useState(true)
  const [editingCard, setEditingCard] = useState(null)
  const [editingSection, setEditingSection] = useState(null)
  const [isHeroEdit, setIsHeroEdit] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)

  useEffect(() => {
    // Collect all images from data
    const imageUrls = [
      data.hero.mainImage,
      ...data.contentGrid.members.map(m => m.image).filter(Boolean),
      ...data.twoCardSection.cards.map(c => c.image).filter(Boolean)
    ]

    let loadedCount = 0
    const totalImages = imageUrls.length

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        setTimeout(() => setLoading(false), 300)
      }
    }

    // Preload all images
    imageUrls.forEach(url => {
      const img = new Image()
      img.onload = checkAllLoaded
      img.onerror = checkAllLoaded
      img.src = url
    })

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      setLoading(false)
    }, 10000)

    return () => clearTimeout(fallbackTimer)
  }, [data])

  const handleEditClick = (card, section) => {
    setEditingCard(card)
    setEditingSection(section)
    setIsHeroEdit(false)
  }

  const handleEditHero = () => {
    setEditingCard(data.hero)
    setIsHeroEdit(true)
  }

  const handleSaveCard = (updatedCard) => {
    if (isHeroEdit) {
      updateHero(updatedCard)
    } else if (editingSection === 'videoUrl') {
      // Update video URL
      updateData('contentGrid', {
        ...data.contentGrid,
        videoUrl: updatedCard.videoUrl
      })
    } else if (editingSection && editingCard) {
      updateCard(editingSection, editingCard.id, updatedCard)
    }
    setEditingCard(null)
    setEditingSection(null)
    setIsHeroEdit(false)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Click the edit icon on any card to update its content</p>
        <a href="/" className="back-to-site">← Back to Site</a>
      </div>

      {/* Hero Section */}
      <section className="admin-hero">
        <button className="edit-icon" onClick={handleEditHero}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <div className="hero-content">
          <div className="hero-left-section">
            <div className="logo-box">
              <div className="logo">
                <img src={data.hero.mainImage} alt="The Three Buttons" />
              </div>
            </div>
            <div className="hero-middle">
              <p className="tagline" dangerouslySetInnerHTML={{ __html: data.hero.tagline }} />
            </div>
            <div className="social-box">
              <div className="social-icons">
                {data.hero.socialIcons.youtube && (
                  <a href={data.hero.socialIcons.youtube} className="social-icon" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {data.hero.socialIcons.instagram && (
                  <a href={data.hero.socialIcons.instagram} className="social-icon" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {data.hero.socialIcons.twitter && (
                  <a href={data.hero.socialIcons.twitter} className="social-icon" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {data.hero.socialIcons.facebook && (
                  <a href={data.hero.socialIcons.facebook} className="social-icon" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {data.hero.socialIcons.snapchat && (
                  <a href={data.hero.socialIcons.snapchat} className="social-icon" aria-label="Snapchat">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3 0 .719-.084 1.03-.214.288-.118.488-.196.664-.196.177 0 .297.045.419.106.245.12.434.287.497.435.056.132.073.293.048.434-.067.375-.267.613-.54.865-.094.09-.19.176-.297.264l-.032.026c-.23.198-.429.372-.618.633-.137.19-.218.381-.252.572-.01.061-.016.123-.016.184 0 .196.052.364.142.519.187.281.456.487.751.663.294.174.613.312.921.458l.05.024c.329.158.669.321.962.54.293.22.524.507.64.827.105.293.101.604-.008.865-.11.26-.291.469-.519.614-.228.145-.483.25-.759.313-.265.062-.533.099-.776.123l-.046.005c-.269.026-.527.05-.756.1-.234.054-.444.147-.594.31-.155.166-.238.375-.238.612 0 .268.115.566.334.885.187.27.441.575.722.915l.062.075c.349.425.732.895 1.042 1.465.168.309.21.572.131.814-.075.235-.24.426-.448.563-.206.135-.471.211-.772.241-.596.062-1.169-.011-1.667-.096l-.125-.022c-.281-.05-.545-.096-.797-.096-.153 0-.3.014-.442.042-.288.057-.547.197-.783.435-.53.53-.862 1.184-1.034 1.895-.19.785-.216 1.609-.216 2.191 0 .188-.029.314-.096.39-.07.079-.177.125-.344.125-.152 0-.324-.047-.536-.142-.204-.091-.46-.229-.801-.404-.662-.342-1.539-.758-2.63-.758-.547 0-1.124.126-1.714.335-.589.209-1.191.499-1.77.817-.18.099-.344.193-.492.27-.147.076-.293.134-.434.16-.012.002-.023.004-.035.005-.061.008-.117.012-.171.012-.153 0-.26-.047-.33-.125-.067-.076-.096-.202-.096-.39 0-.582-.025-1.406-.216-2.191-.172-.711-.504-1.365-1.034-1.895-.236-.238-.495-.378-.783-.435-.142-.028-.289-.042-.442-.042-.252 0-.516.046-.797.096l-.125.022c-.498.085-1.071.158-1.667.096-.3-.03-.566-.106-.772-.241-.208-.137-.373-.328-.448-.563-.079-.242-.037-.505.131-.814.31-.57.693-1.04 1.042-1.465l.062-.075c.281-.34.535-.645.722-.915.219-.319.334-.617.334-.885 0-.237-.083-.446-.238-.612-.15-.163-.36-.256-.594-.31-.229-.05-.487-.074-.756-.1l-.046-.005c-.243-.024-.511-.061-.776-.123-.276-.063-.531-.168-.759-.313-.228-.145-.409-.354-.519-.614-.109-.261-.113-.572-.008-.865.116-.32.347-.607.64-.827.293-.219.633-.382.962-.54l.05-.024c.308-.146.627-.284.921-.458.295-.176.564-.382.751-.663.09-.155.142-.323.142-.519 0-.061-.006-.123-.016-.184-.034-.191-.115-.382-.252-.572-.189-.261-.388-.435-.618-.633l-.032-.026c-.107-.088-.203-.174-.297-.264-.273-.252-.473-.49-.54-.865-.025-.141-.008-.302.048-.434.063-.148.252-.315.497-.435.122-.061.242-.106.419-.106.176 0 .376.078.664.196.311.13.73.214 1.03.214.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847 1.583-3.545 4.94-3.821 5.93-3.821z"/>
                    </svg>
                  </a>
                )}
                {data.hero.socialIcons.tiktok && (
                  <a href={data.hero.socialIcons.tiktok} className="social-icon" aria-label="TikTok">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="featured-grid">
              <div className="featured-card work-card">
                <div className="card-overlay">
                  <h3>{data.heroCards[0].title}</h3>
                </div>
              </div>
              <div className="featured-card touch-card">
                <div className="card-overlay">
                  <h3>{data.heroCards[1].title}</h3>
                </div>
              </div>
              <div className="featured-card clothing-card full-width">
                <div className="card-label">
                  <span>{data.heroCards[2].title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid Section */}
      <section className="admin-content-grid">
        <div className="content-grid-container">
          {/* Large video card */}
          <div className="large-video-card admin-card">
            <button
              className="edit-icon"
              onClick={() => {
                setEditingCard({ videoUrl: data.contentGrid.videoUrl })
                setEditingSection('videoUrl')
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <div className="video-overlay"></div>
            <iframe
              width="100%"
              height="100%"
              src={data.contentGrid.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Member cards grid */}
          <div className="members-grid">
            {data.contentGrid.members.map((member, index) => {
              const isExpanded = expandedCard === member.id
              const expandedIndex = data.contentGrid.members.findIndex(m => m.id === expandedCard)
              const currentRow = Math.floor(index / 3)
              const expandedRow = expandedIndex !== -1 ? Math.floor(expandedIndex / 3) : -1
              const shouldShrink = !isExpanded && expandedCard !== null && currentRow === expandedRow

              return (
                <div
                  key={member.id}
                  className={`member-card admin-card ${member.special ? 'special-card' : ''} ${isExpanded ? 'expanded' : ''} ${shouldShrink ? 'shrink' : ''}`}
                  onMouseEnter={() => !isExpanded && setHoveredCard(member.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedCard(isExpanded ? null : member.id)}
                >
                  <button
                    className="edit-icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditClick(member, 'contentGrid')
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  {isExpanded ? (
                    <div className="expanded-content">
                      <button className="close-btn" onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}>
                        ×
                      </button>
                      <div className="expanded-left">
                        <div
                          className="expanded-image"
                          style={{
                            backgroundImage: member.image ? `url(${member.image})` : 'none',
                            backgroundColor: member.image ? 'transparent' : '#333'
                          }}
                        >
                          <div className="expanded-name-badge">{member.name}</div>
                        </div>
                      </div>
                      <div className="expanded-right">
                        <p className="expanded-description">{member.description}</p>
                        <div className="expanded-socials">
                          {member.socials?.youtube && (
                            <a href={member.socials.youtube} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <svg viewBox="0 0 24 24" fill="white">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                            </a>
                          )}
                          {member.socials?.instagram && (
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <svg viewBox="0 0 24 24" fill="white">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </a>
                          )}
                          {member.socials?.twitter && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <svg viewBox="0 0 24 24" fill="white">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </a>
                          )}
                          {member.socials?.facebook && (
                            <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <svg viewBox="0 0 24 24" fill="white">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                            </a>
                          )}
                          {member.socials?.twitch && (
                            <a href={member.socials.twitch} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
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
                      <div className="member-image">
                        {member.image ? (
                          <div
                            className="image-placeholder"
                            style={{
                              backgroundImage: `url(${member.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>
                        ) : (
                          <div className="image-placeholder"></div>
                        )}
                      </div>
                      <div className={`member-overlay ${hoveredCard === member.id ? 'visible' : ''}`}>
                        <span>{member.name}</span>
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

      {/* YouTube Channels Section */}
      {data.channels && data.channels.length > 0 && (
        <section className="admin-channels-section">
          <h2 className="admin-section-title">YouTube Channels</h2>
          <div className="admin-channels-container">
            {data.channels.map((channel) => (
            <div
              key={channel.id}
              className="admin-channel-badge"
            >
              <button
                className="edit-icon"
                onClick={() => handleEditClick(channel, 'channels')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <div className="channel-image">
                <img src={channel.image} alt={`${channel.name} ${channel.subtitle}`} />
              </div>
              <div className="channel-info">
                <div className="badge-name">{channel.name}</div>
                <div className="badge-subtitle">{channel.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Two Card Section */}
      <section className="admin-two-card-section">
        <div className="two-card-section-container">
          <div className="two-card-section">
            {data.twoCardSection.cards.map((card, index) => {
              const isPortrait = index === 0

              return (
                <div
                  key={card.id}
                  className={`${isPortrait ? 'portrait-card' : 'landscape-card-large'} admin-card`}
                >
                  <button
                    className="edit-icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditClick(card, 'twoCardSection')
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <div className="card-image-wrapper">
                    <div
                      className="card-image-bg"
                      style={{
                        backgroundImage: card.image ? `url(${card.image})` : 'none'
                      }}
                    ></div>
                  </div>
                  <div className="two-card-overlay visible">
                    <span>{card.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <EditCardModal
        isOpen={editingCard !== null}
        onClose={() => {
          setEditingCard(null)
          setEditingSection(null)
          setIsHeroEdit(false)
        }}
        card={editingCard}
        onSave={handleSaveCard}
        isHeroSection={isHeroEdit}
      />
    </div>
  )
}

export default AdminPage
