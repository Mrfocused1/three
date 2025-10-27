import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './ChannelBadges.css'

const ChannelBadges = () => {
  const sectionRef = useScrollAnimation({ threshold: 0.2 })
  const channels = [
    { id: 1, name: 'SIDEMEN', subtitle: 'XIX', color: 'dark' },
    { id: 2, name: 'SIDEMEN', subtitle: 'Reacts', color: 'red' },
    { id: 3, name: 'More SIDEMEN', subtitle: 'XIX', color: 'white' },
    { id: 4, name: 'SIDEMEN', subtitle: 'Shorts', color: 'blue' },
  ]

  return (
    <section ref={sectionRef} className="channel-badges scroll-animate-fade">
      <div className="channel-badges-container">
        {channels.map((channel) => (
          <a key={channel.id} href="#" className={`channel-badge ${channel.color}`}>
            <div className="badge-content">
              <div className="badge-logo">
                <span className="badge-name">{channel.name}</span>
                <span className="badge-subtitle">{channel.subtitle}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ChannelBadges
