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
      setSuccess('Account created. You can now log in.')
      setTimeout(() => navigate('/login'), 800)
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div>
      <div className="nav"><div className="container"><strong>VEEQR</strong></div></div>
      <div className="container" style={{ maxWidth: 720, marginTop: 32 }}>
        <div className="card">
          <h2>Create Account</h2>
          <form onSubmit={onSubmit} className="row">
            <div className="col">
              <label>First Name</label>
              <input className="input" value={form.firstName} onChange={set('firstName')} required />
            </div>
            <div className="col">
              <label>Middle Name</label>
              <input className="input" value={form.middleName} onChange={set('middleName')} />
            </div>
            <div className="col">
              <label>Last Name</label>
              <input className="input" value={form.lastName} onChange={set('lastName')} required />
            </div>
            <div className="col">
              <label>Employee Number</label>
              <input className="input" value={form.empNumber} onChange={set('empNumber')} required />
            </div>
            <div className="col">
              <label>Email</label>
              <input type="email" className="input" value={form.email} onChange={set('email')} required />
            </div>
            <div className="col">
              <label>Password</label>
              <input type="password" className="input" value={form.password} onChange={set('password')} required />
            </div>
            <div className="col">
              <label>Contact Number</label>
              <input className="input" value={form.contactNumber} onChange={set('contactNumber')} />
            </div>
            <div className="col">
              <label>User Type</label>
              <select className="input" value={form.userType} onChange={set('userType')}>
                <option value="Employee">Employee</option>
                <option value="Student">Student</option>
                <option value="Visitor">Visitor</option>
              </select>
            </div>
            {error && <div className="col" style={{ color: 'crimson' }}>{error}</div>}
            {success && <div className="col" style={{ color: 'seagreen' }}>{success}</div>}
            <div className="col">
              <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            </div>
          </form>
        </div>
        <div className="card">
          <span>Already have an account? </span>
          <Link to="/login" className="btn secondary" style={{ padding: '6px 10px', marginLeft: 8 }}>Login</Link>
        </div>
      </div>
    </div>
  )
}


