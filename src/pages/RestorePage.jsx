import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const RestorePage = () => {
  const [status, setStatus] = useState('ready')
  const [message, setMessage] = useState('')

  const correctedData = {
    "hero": {
      "tagline": "Premium production studio partnering with creators, influencers, and streamers to deliver exceptional live and pre-recorded content",
      "mainImage": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/hero%20image.jpg?raw=true",
      "socialIcons": {
        "tiktok": "",
        "twitter": "",
        "youtube": "",
        "facebook": "",
        "snapchat": "",
        "instagram": ""
      }
    },
    "heroCards": [
      {
        "id": "work",
        "type": "work-card",
        "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761911772237-lcg3g.png",
        "title": "WORK WITH US"
      },
      {
        "id": "contact",
        "type": "touch-card",
        "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761912173012-irbcq.png",
        "title": "GET IN TOUCH"
      },
      {
        "id": "studio",
        "type": "clothing-card",
        "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761912173012-irbcq.png",
        "title": "BOOK OUR STUDIO"
      }
    ],
    "contentGrid": {
      "videoUrl": "https://www.youtube.com/embed/8oi2OcFeEew",
      "members": [
        {
          "id": 1,
          "name": "Zeze Millz",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618039352-mj6p29.jpeg",
          "socials": {"twitch": "", "twitter": "", "youtube": "", "instagram": ""},
          "description": "Content creator and influencer known for engaging content and unique personality."
        },
        {
          "id": 2,
          "name": "Rimzee",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618051711-hhrw9p.jpeg",
          "socials": {"twitter": "", "youtube": "", "facebook": "", "instagram": ""},
          "description": "Multi-talented artist bringing fresh energy to the creative scene."
        },
        {
          "id": 3,
          "name": "Layos Choice",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618062282-pyls2.jpeg",
          "socials": {"youtube": "", "instagram": ""},
          "special": true,
          "description": "Creative visionary pushing boundaries in content and entertainment."
        },
        {
          "id": 4,
          "name": "Maggie Mayhem",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618076115-r42t8r.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Dynamic personality known for authentic content and engaging storytelling."
        },
        {
          "id": 5,
          "name": "Paul Bridges",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618156593-mytj1k.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Creative professional bringing innovation and expertise to every project."
        },
        {
          "id": 6,
          "name": "Bugzy Malone",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618088901-b64cvq.jpeg",
          "socials": {"youtube": "", "instagram": ""},
          "description": "Award-winning artist and influential voice in music and entertainment."
        }
      ]
    },
    "twoCardSection": {
      "cards": [
        {
          "id": "card7",
          "name": "HARRY",
          "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-36.jpg?raw=true",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Harry brings humor and creativity to the Sidemen with his unique content style and entertaining videos."
        },
        {
          "id": "card8",
          "name": "JJ",
          "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%208.jpg?raw=true",
          "socials": {"twitch": "", "twitter": "", "youtube": "", "instagram": ""},
          "description": "JJ is a founding member of the Sidemen, known for his music career and entertaining content."
        }
      ]
    },
    "channels": [
      {"id": "channel1", "name": "SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true", "subtitle": "XIX", "youtubeUrl": ""},
      {"id": "channel2", "name": "SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true", "subtitle": "Reacts", "youtubeUrl": ""},
      {"id": "channel3", "name": "More SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true", "subtitle": "XIX", "youtubeUrl": ""},
      {"id": "channel4", "name": "SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%204.jpg?raw=true", "subtitle": "Shorts", "youtubeUrl": ""}
    ]
  }

  const handleRestore = async () => {
    setStatus('loading')
    setMessage('Restoring your images...')

    try {
      // Save to localStorage
      localStorage.setItem('siteData', JSON.stringify(correctedData))

      // Save to Supabase
      const { error } = await supabase
        .from('site_data')
        .upsert({ id: 'main', data: correctedData })

      if (error) {
        setStatus('warning')
        setMessage(`Saved to localStorage! (Supabase warning: ${error.message})`)
      } else {
        setStatus('success')
        setMessage('Success! All 9 images have been restored to both localStorage and Supabase!')
      }
    } catch (error) {
      setStatus('error')
      setMessage(`Error: ${error.message}`)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 Restore Your Images</h1>
        <p style={styles.subtitle}>Click the button below to restore your lost images</p>

        <div style={styles.stats}>
          <div style={styles.stat}>
            <div style={styles.statNumber}>3</div>
            <div style={styles.statLabel}>Hero Cards</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>6</div>
            <div style={styles.statLabel}>Team Members</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>9</div>
            <div style={styles.statLabel}>Total Images</div>
          </div>
        </div>

        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>What This Will Do:</h3>
          <ul style={styles.list}>
            <li>✅ Restore all your uploaded images</li>
            <li>✅ Save data to localStorage (instant backup)</li>
            <li>✅ Save data to Supabase (cloud backup)</li>
            <li>✅ Fix applied - no more data loss!</li>
          </ul>
        </div>

        {status === 'ready' && (
          <button onClick={handleRestore} style={styles.button}>
            🚀 Restore My Images Now
          </button>
        )}

        {status === 'loading' && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{...styles.message, ...styles.success}}>
            <h2>🎉 {message}</h2>
            <div style={styles.actions}>
              <a href="/" style={styles.link}>View Website</a>
              <a href="/admin" style={{...styles.link, ...styles.linkSecondary}}>Admin Panel</a>
            </div>
            <p style={styles.note}>Refresh the page to see your images!</p>
          </div>
        )}

        {status === 'warning' && (
          <div style={{...styles.message, ...styles.warning}}>
            <h3>⚠️ {message}</h3>
            <div style={styles.actions}>
              <a href="/" style={styles.link}>View Website</a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div style={{...styles.message, ...styles.error}}>
            <h3>❌ {message}</h3>
            <button onClick={handleRestore} style={styles.retryButton}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxWidth: '600px',
    width: '100%',
    padding: '40px',
    textAlign: 'center'
  },
  title: {
    color: '#667eea',
    fontSize: '2.5em',
    marginBottom: '10px',
    marginTop: 0
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1em',
    marginBottom: '30px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '30px 0',
    gap: '15px',
    flexWrap: 'wrap'
  },
  stat: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    flex: 1,
    minWidth: '150px'
  },
  statNumber: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#667eea'
  },
  statLabel: {
    color: '#666',
    fontSize: '0.9em',
    marginTop: '5px'
  },
  infoBox: {
    background: '#e7f3ff',
    borderLeft: '4px solid #2196F3',
    padding: '20px',
    borderRadius: '5px',
    margin: '20px 0',
    textAlign: 'left'
  },
  infoTitle: {
    color: '#2196F3',
    marginTop: 0,
    marginBottom: '10px'
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: '#555'
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '18px 50px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    transition: 'transform 0.2s',
    marginTop: '20px'
  },
  loading: {
    padding: '20px',
    color: '#2563eb'
  },
  spinner: {
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #667eea',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '20px auto'
  },
  message: {
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px'
  },
  success: {
    background: '#d4edda',
    color: '#155724'
  },
  warning: {
    background: '#fff3cd',
    color: '#856404'
  },
  error: {
    background: '#f8d7da',
    color: '#721c24'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  link: {
    display: 'inline-block',
    padding: '15px 40px',
    background: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: 'bold',
    transition: 'transform 0.2s'
  },
  linkSecondary: {
    background: '#6c757d'
  },
  retryButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  note: {
    marginTop: '15px',
    fontSize: '0.9em',
    color: '#666'
  }
}

export default RestorePage
