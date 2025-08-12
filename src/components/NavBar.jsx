import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function NavBar() {
  const { profile, logout } = useAuth()
  
  const getRoleIcon = (role) => {
    switch (role) {
      case 'MANAGER': return '👨‍💼'
      case 'SECURITY_GUARD': return '🛡️'
      case 'USER': return '👤'
      default: return '👤'
    }
  }

  const getRoleName = (role) => {
    switch (role) {
      case 'MANAGER': return 'Manager'
      case 'SECURITY_GUARD': return 'Security Guard'
      case 'USER': return 'User'
      default: return 'User'
    }
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          <div className="logo-icon">🔐</div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>UniPass</div>
            <div style={{ fontSize: '11px', fontWeight: '400', opacity: 0.8 }}>Smart Access for Smarter Campuses</div>
          </div>
        </div>
        
        {profile && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            fontSize: '14px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{ fontSize: '16px' }}>{getRoleIcon(profile.role)}</span>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--white)' }}>
                  {profile.firstName} {profile.lastName}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {getRoleName(profile.role)}
                </div>
              </div>
            </div>
            
            <button 
              className="btn secondary" 
              onClick={logout}
              style={{ 
                padding: '8px 16px',
                fontSize: '13px',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'var(--white)',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
