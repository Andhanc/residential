'use client';

import React from 'react'
import { createPortal } from 'react-dom'
import './BuildingCard.css'

function BuildingCard({ name, status, apartments, price, position }) {
  const isSold = status === 'Продан'
  const statusClass = status === 'В продаже' ? 'status-available' : 'status-sold'
  const statusColor = status === 'В продаже' ? '#FFEB3B' : '#F44336'

  const cardStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 10000,
    pointerEvents: 'none',
    backgroundColor: isSold ? '#F44336' : undefined,
    color: isSold ? '#fff' : undefined
  }

  const cardContent = (
    <div className="building-card" style={cardStyle}>
      <div className="building-card-content">
        <h3 className="building-card-name">{name}</h3>
        <div className={`building-card-status ${statusClass}`} style={{ backgroundColor: statusColor }}>
          {status}
        </div>
        <div className="building-card-info">
          {apartments && <p className="building-card-apartments">{apartments}</p>}
          <p className="building-card-price">{price}</p>
        </div>
      </div>
    </div>
  )

  // Рендерим карточку через Portal в body, чтобы она не обрезалась контейнером
  if (typeof window !== 'undefined') {
    return createPortal(cardContent, document.body)
  }
  
  return null
}

export default BuildingCard
