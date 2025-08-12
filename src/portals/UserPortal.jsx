import { Routes, Route, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import UserDashboard from '../user/Dashboard'
import UserVehicles from '../user/Vehicles'
import UserLogs from '../user/Logs'
import UserAnnouncements from '../user/Announcements'
import UserProfile from '../user/Profile'

export default function UserPortal() {
  const navItems = [
    { path: '.', label: 'Dashboard', icon: '📊' },
    { path: 'vehicles', label: 'My Vehicles', icon: '🚗' },
    { path: 'logs', label: 'My Logs', icon: '📋' },
    { path: 'announcements', label: 'Announcements', icon: '📢' },
    { path: 'profile', label: 'My Profile', icon: '👤' }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--neutral-light)' }}>
      <NavBar />
      <div className="container" style={{ paddingTop: '24px' }}>
        {/* Navigation */}
        <div className="card" style={{ 
          padding: '20px',
          background: 'var(--white)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            justifyContent: 'center'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="btn secondary"
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '8px',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  background: 'var(--white)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--primary)'
                  e.target.style.color = 'var(--white)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--white)'
                  e.target.style.color = 'var(--primary)'
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        <Routes>
          <Route index element={<UserDashboard />} />
          <Route path="vehicles" element={<UserVehicles />} />
          <Route path="logs" element={<UserLogs />} />
          <Route path="announcements" element={<UserAnnouncements />} />
          <Route path="profile" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  )
}
