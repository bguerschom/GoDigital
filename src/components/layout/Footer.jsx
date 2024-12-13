// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
      <div className="flex items-center justify-center h-16 px-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Bigue Creation. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
