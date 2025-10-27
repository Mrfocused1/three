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
      youtube: '#',
      instagram: '#',
      twitter: '#',
      facebook: '#',
      snapchat: '#',
      tiktok: '#'
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
        name: 'TOBI',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true',
        description: 'Tobi is a member of the Sidemen, known for his energetic personality and gaming content. He creates videos across multiple channels with millions of subscribers.',
        socials: {
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
          twitch: 'https://twitch.tv'
        }
      },
      {
        id: 2,
        name: 'SIMON',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true',
        description: 'Captain of Sidemen FC and \'What\'s Good\' co-host, Simon creates content across his 3 main channels, with over 3 billion views and over 15 million subs.',
        socials: {
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
          facebook: 'https://facebook.com'
        }
      },
      {
        id: 3,
        name: 'MEET VIK',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true',
        special: true,
        description: 'Vik is a founding member of the Sidemen, known for his FIFA and gaming content.',
        socials: {
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com'
        }
      },
      {
        id: 4,
        name: 'JOSH',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%204.jpg?raw=true',
        description: 'Josh is the oldest member of the Sidemen and helps manage the group\'s business ventures.',
        socials: {
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        }
      },
      {
        id: 5,
        name: 'ETHAN',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/5.jpg?raw=true',
        description: 'Ethan brings energy and humor to the Sidemen with his unique personality and content style.',
        socials: {
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        }
      },
      {
        id: 6,
        name: 'MEET THE BOYS',
        image: 'https://github.com/Mrfocused1/trimline-barbershop/blob/main/6.jpg?raw=true',
        special: true,
        description: 'Learn more about all the Sidemen members and their incredible journey together.',
        socials: {
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com'
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
  }
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('siteData')
    return saved ? JSON.parse(saved) : initialData
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
      }
      return prev
    })
  }

  return (
    <DataContext.Provider value={{ data, updateData, updateCard }}>
      {children}
    </DataContext.Provider>
  )
}
