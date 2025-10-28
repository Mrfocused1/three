import React, { createContext, useContext, useState, useEffect } from 'react'

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
    tagline: 'A group of friends with a few videos online, over 100 million fans and billions of views',
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
      type: 'work-card'
    },
    {
      id: 'contact',
      title: 'GET IN TOUCH',
      type: 'touch-card'
    },
    {
      id: 'studio',
      title: 'BOOK OUR STUDIO',
      type: 'clothing-card'
    }
  ],
  contentGrid: {
    videoUrl: 'https://www.youtube.com/embed/8oi2OcFeEew',
    members: [
      {
        id: 1,
        name: 'Zeze Millz',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%204.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/5.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/6.jpg?raw=true',
        description: 'Award-winning artist and influential voice in music and entertainment.',
        socials: {
          youtube: '',
          instagram: ''
        }
      },
      {
        id: 7,
        name: 'Bernicia Boateng',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-36.jpg?raw=true',
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
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%208.jpg?raw=true',
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
      image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true',
      youtubeUrl: ''
    },
    {
      id: 'channel2',
      name: 'SIDEMEN',
      subtitle: 'Reacts',
      image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true',
      youtubeUrl: ''
    },
    {
      id: 'channel3',
      name: 'More SIDEMEN',
      subtitle: 'XIX',
      image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true',
      youtubeUrl: ''
    },
    {
      id: 'channel4',
      name: 'SIDEMEN',
      subtitle: 'Shorts',
      image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%204.jpg?raw=true',
      youtubeUrl: ''
    }
  ]
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('siteData')
    if (saved) {
      const savedData = JSON.parse(saved)
      // Merge saved data with initialData to ensure new properties are added
      return {
        ...initialData,
        ...savedData,
        // Ensure channels array exists
        channels: savedData.channels || initialData.channels
      }
    }
    return initialData
  })

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(data))
  }, [data])

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
      }
      return prev
    })
  }

  return (
    <DataContext.Provider value={{ data, updateData, updateCard, updateHero }}>
      {children}
    </DataContext.Provider>
  )
}
