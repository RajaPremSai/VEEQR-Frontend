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
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="card">
          <Link to=".">Dashboard</Link> · <Link to="users">Users</Link> · <Link to="gates">Gates</Link> · <Link to="u-vehicles">University Vehicles</Link> · <Link to="personal-vehicles">Personal Vehicles</Link> · <Link to="announcements">Announcements</Link> · <Link to="guards">Security Guards</Link> · <Link to="logs">Logs</Link>
        </div>
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
