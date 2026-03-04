import React from 'react'
import './InfoBlock.css'

function InfoBlock() {
  return (
    <section className="info-block">
      <div className="info-container">
        <h2 className="info-title">О проекте</h2>
        <p className="info-text">
          Современный жилой комплекс с развитой инфраструктурой и комфортными условиями для жизни.
        </p>
        <div className="info-features">
          <div className="feature-item">
            <h3>Расположение</h3>
            <p>Удобное расположение в центре города</p>
          </div>
          <div className="feature-item">
            <h3>Инфраструктура</h3>
            <p>Все необходимое для комфортной жизни</p>
          </div>
          <div className="feature-item">
            <h3>Качество</h3>
            <p>Современные материалы и технологии</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoBlock
