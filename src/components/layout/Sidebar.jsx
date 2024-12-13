// src/components/layout/Sidebar.jsx
import { Link } from 'react-router-dom'
import { Users, Settings, LayoutDashboard, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = ({ isOpen, onClose }) => {
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
    <div 
      className={`fixed left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out h-[calc(100vh-4rem)] top-16 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
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
  )
}

export default Sidebar
