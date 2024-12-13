// src/components/auth/AuthForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { FileText, ArrowRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AuthForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const user = await signIn(username, password)
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-4 relative overflow-hidden">

             {/* Animated Background Flow */}
      <div className="absolute inset-0 overflow-hidden">
<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0A2647"/>
  
  <g fill="rgba(255,255,255,0.1)">
    <circle cx="100" cy="100" r="2">
      <animateMotion path="M 0 0 L 20 20 L 40 0 Z" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="200" cy="150" r="2">
      <animateMotion path="M 0 0 L -20 20 L -40 0 Z" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="300" cy="200" r="2">
      <animateMotion path="M 0 0 L 30 -20 L 60 0 Z" dur="5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="400" cy="250" r="2">
      <animateMotion path="M 0 0 L -30 -20 L -60 0 Z" dur="3.5s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>
        </div>
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 relative transform transition-all hover:scale-[1.01]">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#0A2647] rounded-full flex items-center justify-center animate-bounce-slow">
                <Send className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#0A2647] mb-2">
              Welcome to SSS-Portal
            </h2>
            <p className="text-gray-600 animate-fade-in">
              Sign in to access your portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2647] focus:border-transparent transition-all"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2647] focus:border-transparent transition-all"
                  placeholder="Password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-[#0A2647] text-white rounded-lg hover:bg-[#0A2647]/90 transition-all transform hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center">
                Sign in to continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
