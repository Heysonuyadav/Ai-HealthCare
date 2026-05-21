import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import ImageAnalysis from '../pages/components/ImageAnalysis'
import TextAnalysis from '../pages/components/TextAnalysis'
import UrlAnalysis from '../pages/components/UrlAnalysis'
import History from '../pages/components/History'
import Notifications from '../pages/components/Notifications'
import Profile from '../pages/components/Profile'
import Login from '../pages/components/Login'
import Signup from '../pages/components/Signup'
import Admin from '../pages/components/Admin'
import PrivateRoute from './PrivateRoute.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/imageanalysis" element={<ImageAnalysis />} />
        <Route path='/textanalysis' element={<TextAnalysis />} />
        <Route path='/urlanalysis' element={<UrlAnalysis />} />
        <Route path='/history' element={<History />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default AppRoutes