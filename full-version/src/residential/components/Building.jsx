'use client';

import React, { useState, useEffect } from 'react'
import './Building.css'
import BuildingCard from './BuildingCard'

function Building({ image, x, y, width, height, polygon, id, onClick, zIndex, buildingData }) {
  const [isHovered, setIsHovered] = useState(false)
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Позиция карточки относительно центра квартиры/дома
    // Учитываем реальные размеры элемента в верстке
    const cardWidth = 250
    const cardHeight = 150

    let elementLeft = x
    let elementTop = y
    let elementWidth = width
    let elementHeight = height

    if (typeof window !== 'undefined') {
      const element = document.querySelector(`[data-building-id="${id}"]`)
      if (element) {
        const rect = element.getBoundingClientRect()
        elementLeft = rect.left
        elementTop = rect.top
        elementWidth = rect.width || width
        elementHeight = rect.height || height
      }
    }

    let cardX = elementLeft + elementWidth / 2 - cardWidth / 2
    let cardY = elementTop - cardHeight - 10 // Показываем выше элемента с отступом

    // Если карточка выходит за левую границу, выравниваем по левому краю
    if (cardX < 10) {
      cardX = 10
    }
    // Если карточка выходит за правую границу, выравниваем по правому краю
    if (typeof window !== 'undefined' && cardX + cardWidth > window.innerWidth - 10) {
      cardX = window.innerWidth - cardWidth - 10
    }
    // Если карточка выходит за верхнюю границу, показываем ниже элемента
    if (cardY < 10) {
      cardY = elementTop + elementHeight + 10
    }

    setCardPosition({ x: cardX, y: cardY })
  }, [x, y, width, height, id])

  const style = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    transform: `translate(${x}px, ${y}px)`,
    clipPath: polygon ? `polygon(${polygon})` : 'none',
    zIndex: zIndex || 10,
  }

  const imageStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
  }

  // Определяем класс в зависимости от статуса
  const isSold = buildingData?.status === 'Продан'
  const buildingClasses = [
    'building',
    id === 'building-4' ? 'building-expanded-hover' : '',
    isSold ? 'building-sold' : ''
  ].filter(Boolean).join(' ')

  return (
    <>
      <div
        className={buildingClasses}
        style={style}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-building-id={id}
      >
        <img 
          src={image} 
          alt={`Building ${id}`} 
          className="building-image"
          style={imageStyle}
        />
      </div>
      {isHovered && buildingData && (
        <BuildingCard
          name={buildingData.name}
          status={buildingData.status}
          apartments={buildingData.apartments}
          price={buildingData.price}
          position={cardPosition}
        />
      )}
    </>
  )
}

export default Building
