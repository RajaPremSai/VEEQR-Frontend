import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    empNumber: '',
    email: '',
    password: '',
    contactNumber: '',
    userType: 'Employee'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await api.post('/api/users/register', form)
      setSuccess('Account created successfully! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

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
        maxWidth: 720, 
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Signup Card */}
        <div className="card" style={{ 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
              ✨
            </div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Create Your Account</h2>
            <p style={{ color: 'var(--secondary)', fontSize: '16px' }}>
              Join UniPass for seamless campus access
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col">
                <label>First Name *</label>
                <input 
                  className="input" 
                  value={form.firstName} 
                  onChange={set('firstName')} 
                  placeholder="Enter first name"
                  required 
                />
              </div>
              <div className="col">
                <label>Middle Name</label>
                <input 
                  className="input" 
                  value={form.middleName} 
                  onChange={set('middleName')} 
                  placeholder="Enter middle name (optional)"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Last Name *</label>
                <input 
                  className="input" 
                  value={form.lastName} 
                  onChange={set('lastName')} 
                  placeholder="Enter last name"
                  required 
                />
              </div>
              <div className="col">
                <label>Employee Number *</label>
                <input 
                  className="input" 
                  value={form.empNumber} 
                  onChange={set('empNumber')} 
                  placeholder="Enter employee number"
                  required 
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  className="input" 
                  value={form.email} 
                  onChange={set('email')} 
                  placeholder="Enter email address"
                  required 
                />
              </div>
              <div className="col">
                <label>Password *</label>
                <input 
                  type="password" 
                  className="input" 
                  value={form.password} 
                  onChange={set('password')} 
                  placeholder="Create a strong password"
                  required 
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Contact Number</label>
                <input 
                  className="input" 
                  value={form.contactNumber} 
                  onChange={set('contactNumber')} 
                  placeholder="Enter contact number"
                />
              </div>
              <div className="col">
                <label>User Type *</label>
                <select 
                  className="input" 
                  value={form.userType} 
                  onChange={set('userType')}
                >
                  <option value="Employee">Employee</option>
                  <option value="Student">Student</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="alert error" style={{ marginBottom: '20px' }}>
                <span>⚠️</span>
                {error}
              </div>
            )}

            {success && (
              <div className="alert success" style={{ marginBottom: '20px' }}>
                <span>✅</span>
                {success}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button 
                className="btn" 
                disabled={loading}
                style={{ 
                  padding: '16px 48px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {loading ? (
                  <>
                    <div className="loading" style={{ padding: 0, margin: 0, fontSize: '16px' }}>
                      Creating Account...
                    </div>
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Login Link Card */}
        <div className="card" style={{ 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginTop: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: 'var(--secondary)', fontSize: '16px' }}>Already have an account? </span>
            <Link 
              to="/login" 
              className="btn secondary" 
              style={{ 
                padding: '12px 24px', 
                fontSize: '16px',
                display: 'inline-flex',
                marginLeft: '12px'
              }}
            >
              Sign In
            </Link>
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


