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

      <div className="absolute inset-0 overflow-hidden">
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#0A2647"/>
  
  <!-- Animated Flow -->
  <path d="M100,300 C300,300 500,100 700,300" stroke="white" stroke-width="2" fill="none">
    <animate attributeName="d" 
             values="M100,300 C300,300 500,100 700,300;
                     M100,300 C300,100 500,300 700,300;
                     M100,300 C300,300 500,100 700,300"
             dur="5s" repeatCount="indefinite"/>
  </path>

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
                <div className="absolute right-3 top-3 text-gray-400">
                  <FileText className="w-5 h-5" />
                </div>
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
