import React, { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import Sidebar from './pages/components/Sidebar'
import './App.css'

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <div className={`App ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
      {sidebarVisible && <Sidebar onHide={() => setSidebarVisible(false)} />}
      <div className="main-content">
        {!sidebarVisible && (
          <button className="sidebar-open-button" onClick={() => setSidebarVisible(true)}>
            ☰ Show Sidebar
          </button>
        )}
        <AppRoutes />
      </div>
    </div>
  )
}

export default App