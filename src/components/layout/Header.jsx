// src/components/layout/Header.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Menu, LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const Header = ({ onMenuClick, showMenuButton = true }) => {
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleLogoClick = () => {
    navigate('/admin/dashboard')
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden mr-4"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center"
            onClick={handleLogoClick}
          >
            <img 
              src="/logo.png" 
              alt="SSS Portal" 
              className="h-8 w-auto"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

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
  )
}

export default Header
