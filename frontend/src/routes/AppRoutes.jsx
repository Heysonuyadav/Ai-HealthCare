import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ImageAnalysis from '../pages/components/ImageAnalysis'
import TextAnalysis from '../pages/components/TextAnalysis'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imageanalysis" element={<ImageAnalysis />} />
      <Route path='/textanalysis' element={<TextAnalysis />} />
    </Routes>
  )
}

export default AppRoutes