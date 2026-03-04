'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './Header.css'

function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="header-container">
        <div className="menu-item">МЕНЮ</div>
        <Link href="/apartments" className="menu-item button">
          ВЫБРАТЬ КВАРТИРУ
        </Link>
        <Link href="/" className="logo">DEPO</Link>
        <div className="menu-item">+375 29 123-45-67</div>
        <div className="menu-item button-secondary">ЗАПИСАТЬСЯ НА ВСТРЕЧУ</div>
      </div>
    </header>
  )
}

export default Header
