import { Routes, Route, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import GuardDashboard from '../guard/Dashboard'
import GuardLogs from '../guard/Logs'

export default function GuardPortal() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card">
          <Link to=".">Dashboard</Link> · <Link to="logs">Logs</Link>
        </div>
        <Routes>
          <Route index element={<GuardDashboard />} />
          <Route path="logs" element={<GuardLogs />} />
        </Routes>
      </div>
    </div>
  )
}
