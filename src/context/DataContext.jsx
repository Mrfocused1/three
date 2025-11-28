import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

const initialData = {
  hero: {
    mainImage: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/hero%20image.jpg?raw=true',
    tagline: 'Premium production studio partnering with creators, influencers, and streamers to deliver exceptional live and pre-recorded content',
    socialIcons: {
      youtube: '',
      instagram: '',
      twitter: '',
      facebook: '',
      snapchat: '',
      tiktok: ''
    }
  },
  heroCards: [
    {
      id: 'work',
      title: 'WORK WITH US',
      type: 'work-card',
      image: ''
    },
    {
      id: 'contact',
      title: 'GET IN TOUCH',
      type: 'touch-card',
      image: ''
    },
    {
      id: 'studio',
      title: 'BOOK OUR STUDIO',
      type: 'clothing-card',
      image: ''
    }
  ],
  contentGrid: {
    videoUrl: 'https://www.youtube.com/embed/8oi2OcFeEew',
    members: [
      {
        id: 1,
        name: 'Zeze Millz',
        image: '',
        description: 'Content creator and influencer known for engaging content and unique personality.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: '',
          twitch: ''
        }
      },
      {
        id: 2,
        name: 'Rimzee',
        image: '',
        description: 'Multi-talented artist bringing fresh energy to the creative scene.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: '',
          facebook: ''
        }
      },
      {
        id: 3,
        name: 'Layos Choice',
        image: '',
        special: true,
        description: 'Creative visionary pushing boundaries in content and entertainment.',
        socials: {
          youtube: '',
          instagram: ''
        }
      },
      {
        id: 4,
        name: 'Maggie Mayhem',
        image: '',
        description: 'Dynamic personality known for authentic content and engaging storytelling.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: ''
        }
      },
      {
        id: 5,
        name: 'Paul Bridges',
        image: '',
        description: 'Creative professional bringing innovation and expertise to every project.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: ''
        }
      },
      {
        id: 6,
        name: 'Bugzy Malone',
        image: '',
        description: 'Award-winning artist and influential voice in music and entertainment.',
        socials: {
          youtube: '',
          instagram: ''
        }
      },
      {
        id: 7,
        name: 'Bernicia Boateng',
        image: '',
        description: 'Creative talent known for impactful content and inspiring storytelling.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: ''
        }
      },
      {
        id: 8,
        name: 'JenyBSG',
        image: '',
        description: 'Digital creator bringing fresh perspectives and engaging content.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: ''
        }
      },
      {
        id: 9,
        name: 'Breeny Lee',
        image: '',
        description: 'Content creator and entertainer known for unique style and authenticity.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: ''
        }
      }
    ]
  },
  twoCardSection: {
    cards: [
      {
        id: 'card7',
        name: 'HARRY',
        image: '',
        description: 'Harry brings humor and creativity to the Sidemen with his unique content style and entertaining videos.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: ''
        }
      },
      {
        id: 'card8',
        name: 'JJ',
        image: '',
        description: 'JJ is a founding member of the Sidemen, known for his music career and entertaining content.',
        socials: {
          youtube: '',
          instagram: '',
          twitter: '',
          twitch: ''
        }
      }
    ]
  },
  channels: [
    {
      id: 'channel1',
      name: 'SIDEMEN',
      subtitle: 'XIX',
      image: '',
      youtubeUrl: ''
    },
    {
      id: 'channel2',
      name: 'SIDEMEN',
      subtitle: 'Reacts',
      image: '',
      youtubeUrl: ''
    },
    {
      id: 'channel3',
      name: 'More SIDEMEN',
      subtitle: 'XIX',
      image: '',
      youtubeUrl: ''
    },
    {
      id: 'channel4',
      name: 'SIDEMEN',
      subtitle: 'Shorts',
      image: '',
      youtubeUrl: ''
    }
  ]
}

// Validation: Ensure initialData doesn't have placeholder URLs in user-editable fields
const validateInitialData = () => {
  const errors = []

  // Check heroCards - these should NEVER have image URLs in initialData
  if (initialData.heroCards) {
    initialData.heroCards.forEach((card, index) => {
      if (card.image && card.image.trim() !== '') {
        errors.push(`⚠️ CRITICAL: heroCards[${index}].image has placeholder URL "${card.image}". This should be empty!`)
      }
    })
  }

  // Check contentGrid members - should NEVER have image URLs in initialData
  if (initialData.contentGrid?.members) {
    initialData.contentGrid.members.forEach((member, index) => {
      if (member.image && member.image.trim() !== '') {
        errors.push(`⚠️ CRITICAL: contentGrid.members[${index}].image has placeholder URL "${member.image}". This should be empty!`)
      }
    })
  }

  // Check twoCardSection cards - should NEVER have image URLs in initialData
  if (initialData.twoCardSection?.cards) {
    initialData.twoCardSection.cards.forEach((card, index) => {
      if (card.image && card.image.trim() !== '') {
        errors.push(`⚠️ CRITICAL: twoCardSection.cards[${index}].image has placeholder URL "${card.image}". This should be empty!`)
      }
    })
  }

  // Check channels - should NEVER have image URLs in initialData
  if (initialData.channels) {
    initialData.channels.forEach((channel, index) => {
      if (channel.image && channel.image.trim() !== '') {
        errors.push(`⚠️ CRITICAL: channels[${index}].image has placeholder URL "${channel.image}". This should be empty!`)
      }
    })
  }

  if (errors.length > 0) {
    console.error('❌ INITIAL DATA VALIDATION FAILED:')
    errors.forEach(err => console.error(err))
    console.error('🛡️ This prevents the image upload bug! Fix initialData in DataContext.jsx')
    console.error('🔒 ALL user-editable image fields in initialData MUST be empty strings')
    throw new Error('initialData validation failed - placeholder URLs detected in user-editable fields')
  }

  console.log('✅ initialData validation passed - no placeholder URLs in user-editable fields')
  console.log('   ✓ heroCards: all images empty')
  console.log('   ✓ contentGrid.members: all images empty')
  console.log('   ✓ twoCardSection.cards: all images empty')
  console.log('   ✓ channels: all images empty')
}

// Run validation immediately when module loads
validateInitialData()

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Deep merge function to preserve saved data
  const deepMerge = (initial, saved) => {
    const result = { ...initial }

    for (const key in saved) {
      if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
        result[key] = deepMerge(initial[key] || {}, saved[key])
      } else {
        // For arrays and primitives, prefer saved data
        result[key] = saved[key]
      }
    }

    return result
  }

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('=== LOADING DATA ===')

        // Try to load from Supabase first
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('site_data')
          .select('data')
          .eq('id', 'main')
          .single()

        if (supabaseError) throw supabaseError

        if (supabaseData && supabaseData.data) {
          const dbData = supabaseData.data
          console.log('Loaded from Supabase:', dbData)

          // Deep merge to preserve all saved data
          const mergedData = deepMerge(initialData, dbData)
          console.log('Merged data:', mergedData)

          setData(mergedData)
          // Also save to localStorage as backup
          localStorage.setItem('siteData', JSON.stringify(dbData))
        } else {
          // If no Supabase data, try localStorage
          const saved = localStorage.getItem('siteData')
          if (saved) {
            const savedData = JSON.parse(saved)
            console.log('Loaded from localStorage:', savedData)

            const mergedData = deepMerge(initialData, savedData)
            setData(mergedData)

            // Save localStorage data to Supabase
            await supabase
              .from('site_data')
              .upsert({ id: 'main', data: savedData })
          } else {
            console.log('No saved data, using initialData')
            // If neither exists, save initial data to Supabase
            await supabase
              .from('site_data')
              .upsert({ id: 'main', data: initialData })
          }
        }
      } catch (err) {
        console.error('Error loading data from Supabase:', err)
        setError(err.message)
        // Fallback to localStorage
        const saved = localStorage.getItem('siteData')
        if (saved) {
          const savedData = JSON.parse(saved)
          console.log('Error fallback - loaded from localStorage:', savedData)
          const mergedData = deepMerge(initialData, savedData)
          setData(mergedData)
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Save data to Supabase whenever it changes
  useEffect(() => {
    if (!loading) {
      const saveData = async () => {
        try {
          await supabase
            .from('site_data')
            .upsert({ id: 'main', data: data })
          // Also save to localStorage as backup
          localStorage.setItem('siteData', JSON.stringify(data))
        } catch (err) {
          console.error('Error saving data to Supabase:', err)
          // Still save to localStorage even if Supabase fails
          localStorage.setItem('siteData', JSON.stringify(data))
        }
      }
      saveData()
    }
  }, [data, loading])

  const updateData = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }))
  }

  const updateHero = (heroData) => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        ...heroData
      }
    }))
  }

  const updateCard = (section, cardId, updatedCard) => {
    setData(prev => {
      if (section === 'contentGrid') {
        return {
          ...prev,
          contentGrid: {
            ...prev.contentGrid,
            members: prev.contentGrid.members.map(member =>
              member.id === cardId ? { ...member, ...updatedCard } : member
            )
          }
        }
      } else if (section === 'twoCardSection') {
        return {
          ...prev,
          twoCardSection: {
            ...prev.twoCardSection,
            cards: prev.twoCardSection.cards.map(card =>
              card.id === cardId ? { ...card, ...updatedCard } : card
            )
          }
        }
      } else if (section === 'channels') {
        return {
          ...prev,
          channels: prev.channels.map(channel =>
            channel.id === cardId ? { ...channel, ...updatedCard } : channel
          )
        }
      } else if (section === 'heroCards') {
        return {
          ...prev,
          heroCards: prev.heroCards.map(card =>
            card.id === cardId ? { ...card, ...updatedCard } : card
          )
        }
      }
      return prev
    })
  }

  return (
    <DataContext.Provider value={{ data, updateData, updateCard, updateHero, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}
