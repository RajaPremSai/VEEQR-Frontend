import { Routes, Route, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import GuardDashboard from '../guard/Dashboard'
import GuardLogs from '../guard/Logs'
import QRScanner from '../guard/QRScanner'
import GuardProfile from '../guard/Profile'
import GuardGates from '../guard/Gates'
import GuardAnnouncements from '../guard/Announcements'

export default function GuardPortal() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card">
          <Link to=".">Dashboard</Link> · <Link to="scanner">QR Scanner</Link> · <Link to="logs">Logs</Link> · <Link to="gates">Gates</Link> · <Link to="announcements">Announcements</Link> · <Link to="profile">My Profile</Link>
        </div>
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
