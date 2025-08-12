import { Routes, Route, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import UserDashboard from '../user/Dashboard'
import UserVehicles from '../user/Vehicles'
import UserLogs from '../user/Logs'
import UserAnnouncements from '../user/Announcements'
import UserProfile from '../user/Profile'

export default function UserPortal() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card">
          <Link to=".">Dashboard</Link> · <Link to="vehicles">My Vehicles</Link> · <Link to="logs">My Logs</Link> · <Link to="announcements">Announcements</Link> · <Link to="profile">My Profile</Link>
        </div>
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
