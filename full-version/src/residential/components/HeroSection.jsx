import React from 'react'
import './HeroSection.css'
import fonImage from '../img/fon.jpg'
import SearchFilter from './SearchFilter'

function HeroSection() {
  return (
    <section className="hero-section">
      <div 
        className="hero-background"
        style={{ backgroundImage: `url(${fonImage})` }}
      >
        <SearchFilter />
      </div>
    </section>
  )
}

export default HeroSection
