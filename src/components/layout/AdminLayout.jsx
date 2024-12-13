// src/components/layout/AdminLayout.jsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)}
        showMenuButton={!isSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div 
        className={`pt-16 min-h-screen ${
          isSidebarOpen ? 'lg:ml-64' : ''
        } transition-all duration-200 ease-in-out`}
      >
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout
