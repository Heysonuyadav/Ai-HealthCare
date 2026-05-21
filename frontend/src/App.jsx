import React, { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import Sidebar from './pages/components/Sidebar'
import { AuthProvider } from './context/AuthContext.jsx'
import './App.css'

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <AuthProvider>
      <div className={`App ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
        {sidebarVisible && <Sidebar onHide={() => setSidebarVisible(false)} />}
        <div className="main-content">
          {!sidebarVisible && (
            <button className="sidebar-open-button" onClick={() => setSidebarVisible(true)}>
              ☰ 
            </button>
          )}
          <AppRoutes />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App