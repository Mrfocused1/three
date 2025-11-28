import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import ContentGrid from './components/ContentGrid'
import TwoCardSection from './components/TwoCardSection'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'
import RestorePage from './pages/RestorePage'
import ProductionPage from './pages/ProductionPage'
import ContentCreationPage from './pages/ContentCreationPage'
import PhotographyPage from './pages/PhotographyPage'
import './App.css'

function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // List of all image URLs used in the site
    const imageUrls = [
      // Logo
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/t3b.jpg?raw=true',
      // Hero section image
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/hero%20image.jpg?raw=true',
      // ContentGrid member images
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%204.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/5.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/6.jpg?raw=true',
      // TwoCardSection images
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-36.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%208.jpg?raw=true',
      // Hero section cards
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/work%20with%20us.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-37.jpg?raw=true',
      'https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-39.jpg?raw=true'
    ]

    let loadedCount = 0
    const totalImages = imageUrls.length

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        // Small delay after all images loaded
        setTimeout(() => setLoading(false), 300)
      }
    }

    // Preload all images
    imageUrls.forEach(url => {
      const img = new Image()
      img.onload = checkAllLoaded
      img.onerror = checkAllLoaded // Count errors too so loading doesn't hang
      img.src = url
    })

    // Fallback timeout in case something goes wrong
    const fallbackTimer = setTimeout(() => {
      setLoading(false)
    }, 15000) // 15 second max wait

    return () => clearTimeout(fallbackTimer)
  }, [])

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <div className="app">
          <Header />
          <Hero />
          <ContentGrid />
          <TwoCardSection />
          <Footer />
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/restore" element={<RestorePage />} />
      <Route path="/work/production" element={<ProductionPage />} />
      <Route path="/work/content-creation" element={<ContentCreationPage />} />
      <Route path="/work/photography" element={<PhotographyPage />} />
    </Routes>
  )
}

export default App
