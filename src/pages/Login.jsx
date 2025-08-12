import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('manager@example.edu')
  const [password, setPassword] = useState('StrongPass@123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { profile } = await login(email, password)
      if (profile.role === 'MANAGER') navigate('/manager')
      else if (profile.role === 'SECURITY_GUARD') navigate('/guard')
      else navigate('/user')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--primary) 0%, #1a365d 100%)' }}>
      {/* Header */}
      <div className="nav" style={{ background: 'transparent', boxShadow: 'none' }}>
        <div className="container">
          <div className="logo">
            <div className="logo-icon">🔐</div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>UniPass</div>
              <div style={{ fontSize: '12px', fontWeight: '400', opacity: 0.8 }}>Smart Access for Smarter Campuses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ 
        maxWidth: 480, 
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Welcome Card */}
        <div className="card" style={{ 
          width: '100%', 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'var(--accent)', 
              borderRadius: '50%', 
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              🚗
            </div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Welcome Back</h2>
            <p style={{ color: 'var(--secondary)', fontSize: '16px' }}>
              Sign in to access your campus dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} style={{ textAlign: 'left' }}>
            <div className="col" style={{ marginBottom: '20px' }}>
              <label>Email Address</label>
              <input 
                className="input" 
                type="email"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="col" style={{ marginBottom: '24px' }}>
              <label>Password</label>
              <input 
                type="password" 
                className="input" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && (
              <div className="alert error" style={{ marginBottom: '20px' }}>
                <span>⚠️</span>
                {error}
              </div>
            )}
            
            <button 
              className="btn" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {loading ? (
                <>
                  <div className="loading" style={{ padding: 0, margin: 0, fontSize: '16px' }}>
                    Signing in...
                  </div>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="card" style={{ 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginTop: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Quick Access</h4>
            <p style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Use these credentials for testing:
            </p>
            <div style={{ 
              background: 'rgba(61, 220, 151, 0.1)', 
              padding: '12px', 
              borderRadius: '8px',
              border: '1px solid rgba(61, 220, 151, 0.2)',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent)', marginBottom: '4px' }}>
                Manager Account
              </div>
              <div style={{ fontSize: '13px', color: 'var(--neutral-dark)' }}>
                manager@example.edu / StrongPass@123
              </div>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <span style={{ color: 'var(--secondary)', fontSize: '14px' }}>New user? </span>
              <Link 
                to="/signup" 
                className="btn secondary" 
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '14px',
                  display: 'inline-flex',
                  marginLeft: '8px'
                }}
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px'
        }}>
          <p style={{ marginBottom: '8px' }}>🔒 Secure • 🚀 Fast • 📱 Mobile-Friendly</p>
          <p>© 2024 UniPass. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
