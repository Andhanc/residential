import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ApartmentsPage from './pages/ApartmentsPage'
import Building9Page from './pages/Building9Page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apartments" element={<ApartmentsPage />} />
        <Route path="/building-9" element={<Building9Page />} />
      </Routes>
    </Router>
  )
}

export default App
