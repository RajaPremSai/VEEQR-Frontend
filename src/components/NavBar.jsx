import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function NavBar() {
  const { profile, logout } = useAuth()
  return (
    <nav className="nav">
      <div className="container">
        <div>
          <Link to="/">VEEQR</Link>
        </div>
        <div>
          {profile && (
            <>
              <span style={{ marginRight: 12 }}>{profile.email} · {profile.role}</span>
              <button className="btn secondary" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
