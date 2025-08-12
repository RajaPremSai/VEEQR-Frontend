import { Link } from 'react-router-dom'

export default function ManagerDashboard(){
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <div className="card">
        <h3>Quick Actions</h3>
        <div className="row" style={{gap: '10px'}}>
          <Link to="/manager/users" className="btn">Manage Users</Link>
          <Link to="/manager/vehicles" className="btn">Manage University Vehicles</Link>
          <Link to="/manager/personal-vehicles" className="btn">View Personal Vehicles</Link>
          <Link to="/manager/gates" className="btn">Manage Gates</Link>
          <Link to="/manager/announcements" className="btn">Manage Announcements</Link>
          <Link to="/manager/security-guards" className="btn">Manage Security Guards</Link>
          <Link to="/manager/logs" className="btn">View Logs</Link>
        </div>
      </div>
    </div>
  )
}
