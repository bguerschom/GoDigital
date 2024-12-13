// src/components/layout/AdminLayout.jsx
import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { 
  Users, 
  Settings, 
  LayoutDashboard, 
  Menu, 
  X,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { signOut, user } = useAuth()

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/admin/dashboard'
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/users'
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '/admin/settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">SSS Portal</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-margin duration-200 ease-in-out`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className={`${isSidebarOpen ? 'lg:hidden' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.fullname}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
