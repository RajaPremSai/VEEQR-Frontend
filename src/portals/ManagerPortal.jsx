import { Routes, Route, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import ManagerDashboard from '../manager/Dashboard'
import ManagerUsers from '../manager/Users'
import ManagerGates from '../manager/Gates'
import ManagerUniVehicles from '../manager/UniversityVehicles'
import ManagerPersonalVehicles from '../manager/PersonalVehicles'
import ManagerAnnouncements from '../manager/Announcements'
import ManagerGuards from '../manager/SecurityGuards'
import ManagerLogs from '../manager/Logs'

export default function ManagerPortal() {
  const navItems = [
    { path: '.', label: 'Dashboard', icon: '📊' },
    { path: 'users', label: 'Users', icon: '👥' },
    { path: 'gates', label: 'Gates', icon: '🚪' },
    { path: 'u-vehicles', label: 'University Vehicles', icon: '🚌' },
    { path: 'personal-vehicles', label: 'Personal Vehicles', icon: '🚗' },
    { path: 'announcements', label: 'Announcements', icon: '📢' },
    { path: 'guards', label: 'Security Guards', icon: '🛡️' },
    { path: 'logs', label: 'Logs', icon: '📋' }
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
          <Route index element={<ManagerDashboard />} />
          <Route path="users" element={<ManagerUsers />} />
          <Route path="gates" element={<ManagerGates />} />
          <Route path="u-vehicles" element={<ManagerUniVehicles />} />
          <Route path="personal-vehicles" element={<ManagerPersonalVehicles />} />
          <Route path="announcements" element={<ManagerAnnouncements />} />
          <Route path="guards" element={<ManagerGuards />} />
          <Route path="logs" element={<ManagerLogs />} />
        </Routes>
      </div>
    </div>
  )
}
