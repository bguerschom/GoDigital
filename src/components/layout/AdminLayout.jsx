// src/components/layout/AdminLayout.jsx
import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { 
  Users, 
  Settings, 
  LayoutDashboard, 
  Menu, 
  X,
  LogOut,
  Moon,
  Sun,
  Laptop
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import Footer from './Footer'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { signOut, user } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  // Detect system theme on mount
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(systemTheme)
  }, [])

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

  const handleLogoClick = () => {
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Container - Moved to top */}
        <div className="p-4 border-b dark:border-gray-700">
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <img 
              src="/logo.png" 
              alt="SSS Portal" 
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden self-end mr-4 mt-2"
          >
            <X className="w-5 h-5" />
          </Button>

          <nav className="mt-5 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col min-h-screen ${isSidebarOpen ? 'lg:ml-64' : ''} transition-margin duration-200 ease-in-out`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className={`${isSidebarOpen ? 'lg:hidden' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-4 ml-auto">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme('light')}
                  className={`text-gray-600 dark:text-gray-300 ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Sun className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme('system')}
                  className={`text-gray-600 dark:text-gray-300 ${theme === 'system' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Laptop className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme('dark')}
                  className={`text-gray-600 dark:text-gray-300 ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <Moon className="w-5 h-5" />
                </Button>
              </div>

              {/* User Name */}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.fullname}
              </span>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-gray-600 dark:text-gray-300"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout
