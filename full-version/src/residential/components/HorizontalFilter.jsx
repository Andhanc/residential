'use client';

import React, { useState } from 'react'
import './HorizontalFilter.css'

function HorizontalFilter() {
  const [selectedFilters, setSelectedFilters] = useState({
    finishing: '',
    housingType: '',
    year: '',
    area: ''
  })

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value
    })
  }

  return (
    <div className="horizontal-filter-section">
      <div className="filter-categories">
        <div className="filter-category">
          <div className="filter-label">
            ОТДЕЛКА
            <span className="filter-arrow">▼</span>
          </div>
        </div>
        <div className="filter-category">
          <div className="filter-label">
            ТИП ЖИЛЬЯ
            <span className="filter-arrow">▼</span>
          </div>
        </div>
        <div className="filter-category">
          <div className="filter-label">
            ГОД СДАЧИ
            <span className="filter-arrow">▼</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalFilter
