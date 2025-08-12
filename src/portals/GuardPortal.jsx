import { Routes, Route, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import GuardDashboard from '../guard/Dashboard'
import GuardLogs from '../guard/Logs'
import QRScanner from '../guard/QRScanner'
import GuardProfile from '../guard/Profile'
import GuardGates from '../guard/Gates'
import GuardAnnouncements from '../guard/Announcements'

export default function GuardPortal() {
  const navItems = [
    { path: '.', label: 'Dashboard', icon: '📊' },
    { path: 'scanner', label: 'QR Scanner', icon: '📱' },
    { path: 'logs', label: 'Logs', icon: '📋' },
    { path: 'gates', label: 'Gates', icon: '🚪' },
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
          <Route index element={<GuardDashboard />} />
          <Route path="scanner" element={<QRScanner />} />
          <Route path="logs" element={<GuardLogs />} />
          <Route path="gates" element={<GuardGates />} />
          <Route path="announcements" element={<GuardAnnouncements />} />
          <Route path="profile" element={<GuardProfile />} />
        </Routes>
      </div>
    </div>
  )
}
