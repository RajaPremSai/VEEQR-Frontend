import { Link } from 'react-router-dom'

export default function ManagerDashboard(){
  const quickActions = [
    { path: '/manager/users', label: 'Manage Users', icon: '👥', color: 'var(--primary)' },
    { path: '/manager/vehicles', label: 'University Vehicles', icon: '🚌', color: 'var(--accent)' },
    { path: '/manager/personal-vehicles', label: 'Personal Vehicles', icon: '🚗', color: 'var(--secondary)' },
    { path: '/manager/gates', label: 'Manage Gates', icon: '🚪', color: 'var(--warning)' },
    { path: '/manager/announcements', label: 'Announcements', icon: '📢', color: 'var(--error)' },
    { path: '/manager/guards', label: 'Security Guards', icon: '🛡️', color: 'var(--primary)' },
    { path: '/manager/logs', label: 'View Logs', icon: '📋', color: 'var(--accent)' }
  ]

  return (
    <div>
      {/* Welcome Section */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, #1a365d 100%)',
        color: 'var(--white)',
        textAlign: 'center',
        padding: '40px 24px'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: '50%', 
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px'
        }}>
          👨‍💼
        </div>
        <h1 style={{ color: 'var(--white)', marginBottom: '12px' }}>Manager Dashboard</h1>
        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '0' }}>
          Welcome to UniPass Management Console
        </p>
        <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px' }}>
          Manage users, vehicles, gates, and monitor campus access
        </p>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>Quick Actions</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px',
                background: 'var(--white)',
                border: '2px solid #E2E8F0',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--neutral-dark)',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)'
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
                e.target.style.borderColor = action.color
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
                e.target.style.borderColor = '#E2E8F0'
              }}
            >
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: action.color,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'var(--white)'
              }}>
                {action.icon}
              </div>
              <div>
                <h4 style={{ 
                  margin: '0 0 4px 0', 
                  color: 'var(--primary)',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {action.label}
                </h4>
                <p style={{ 
                  margin: '0', 
                  fontSize: '14px', 
                  color: 'var(--secondary)',
                  opacity: 0.8
                }}>
                  Click to access
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="card">
        <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>System Overview</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '24px',
            background: 'rgba(61, 220, 151, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(61, 220, 151, 0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--accent)' }}>Users</h4>
            <p style={{ margin: '0', fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>Active</p>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            padding: '24px',
            background: 'rgba(10, 37, 64, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(10, 37, 64, 0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚗</div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--primary)' }}>Vehicles</h4>
            <p style={{ margin: '0', fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>Registered</p>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            padding: '24px',
            background: 'rgba(255, 184, 0, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 184, 0, 0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚪</div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--warning)' }}>Gates</h4>
            <p style={{ margin: '0', fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>Active</p>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            padding: '24px',
            background: 'rgba(217, 4, 41, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(217, 4, 41, 0.2)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--error)' }}>Logs</h4>
            <p style={{ margin: '0', fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>Today</p>
          </div>
        </div>
      </div>
    </div>
  )
}
