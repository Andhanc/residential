import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import InfoBlock from '../components/InfoBlock'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <InfoBlock />
      <Footer />
    </div>
  )
}

export default HomePage
