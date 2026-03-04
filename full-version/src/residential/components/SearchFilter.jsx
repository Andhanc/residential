import React, { useState } from 'react'
import './SearchFilter.css'

function SearchFilter() {
  const [filters, setFilters] = useState({
    rooms: '',
    area: '',
    floor: '',
    price: ''
  })

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Поиск:', filters)
  }

  return (
    <div className="search-filter">
      <h2 className="search-filter-title">Поиск квартир</h2>
      <form onSubmit={handleSubmit} className="search-filter-form">
        <div className="form-group">
          <label htmlFor="rooms">Количество комнат</label>
          <select 
            id="rooms" 
            name="rooms" 
            value={filters.rooms}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Любое</option>
            <option value="1">1 комната</option>
            <option value="2">2 комнаты</option>
            <option value="3">3 комнаты</option>
            <option value="4">4+ комнаты</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="area">Площадь, м²</label>
          <input
            type="number"
            id="area"
            name="area"
            value={filters.area}
            onChange={handleChange}
            placeholder="Любая"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="floor">Этаж</label>
          <input
            type="number"
            id="floor"
            name="floor"
            value={filters.floor}
            onChange={handleChange}
            placeholder="Любой"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Стоимость</label>
          <input
            type="number"
            id="price"
            name="price"
            value={filters.price}
            onChange={handleChange}
            placeholder="Любая"
            className="form-input"
          />
        </div>

        <button type="submit" className="search-button">
          Найти
        </button>
      </form>
    </div>
  )
}

export default SearchFilter
