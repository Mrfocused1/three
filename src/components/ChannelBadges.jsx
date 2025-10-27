import React from 'react'
import { useData } from '../context/DataContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './ChannelBadges.css'

const ChannelBadges = () => {
  const { data } = useData()
  const sectionRef = useScrollAnimation({ threshold: 0.2 })

  // Return null if no channels data
  if (!data.channels || data.channels.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="channel-badges scroll-animate-fade">
      <div className="channel-badges-container">
        {data.channels.map((channel) => (
          <a
            key={channel.id}
            href={channel.youtubeUrl || '#'}
            className="channel-badge"
            target={channel.youtubeUrl ? "_blank" : "_self"}
            rel={channel.youtubeUrl ? "noopener noreferrer" : undefined}
            onClick={(e) => !channel.youtubeUrl && e.preventDefault()}
          >
            <div className="channel-image">
              <img src={channel.image} alt={`${channel.name} ${channel.subtitle}`} />
            </div>
            <div className="channel-overlay">
              <div className="badge-content">
                <div className="badge-logo">
                  <span className="badge-name">{channel.name}</span>
                  <span className="badge-subtitle">{channel.subtitle}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ChannelBadges
