'use client';

import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>+375 29 121-98-16</p>
          <p>info@residential.by</p>
        </div>
        <div className="footer-section">
          <h3>Адрес</h3>
          <p>г. Минск, ул. Примерная, 1</p>
        </div>
        <div className="footer-section">
          <h3>Режим работы</h3>
          <p>Пн-Вс: 9:00 - 21:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Residential. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer
