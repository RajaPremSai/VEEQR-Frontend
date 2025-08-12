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
    <div>
      <div className="nav"><div className="container"><strong>VEEQR</strong></div></div>
      <div className="container" style={{ maxWidth: 420, marginTop: 48 }}>
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={onSubmit} className="row">
            <div className="col">
              <label>Email</label>
              <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="col">
              <label>Password</label>
              <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            {error && <div className="col" style={{ color: 'crimson' }}>{error}</div>}
            <div className="col">
              <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
            </div>
          </form>
        </div>
        <div className="card">
          <p>Tip: Use your role credentials. Manager default: manager@example.edu / StrongPass@123</p>
          <div style={{ marginTop: 8 }}>
            <span>New user?</span>
            <Link to="/signup" className="btn secondary" style={{ padding: '6px 10px', marginLeft: 8 }}>Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
