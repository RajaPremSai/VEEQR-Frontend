import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth } from './state/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import UserPortal from './portals/UserPortal'
import GuardPortal from './portals/GuardPortal'
import ManagerPortal from './portals/ManagerPortal'

export default function App() {
  const { isAuthenticated, profile } = useAuth()

  const roleHome = () => {
    if (!isAuthenticated) return <Navigate to="/login" />
    if (profile?.role === 'USER') return <Navigate to="/user" />
    if (profile?.role === 'SECURITY_GUARD') return <Navigate to="/guard" />
    if (profile?.role === 'MANAGER') return <Navigate to="/manager" />
    return <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/" element={roleHome()} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute allowedRoles={[ 'USER' ]} />}> 
        <Route path="/user/*" element={<UserPortal />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ 'SECURITY_GUARD' ]} />}> 
        <Route path="/guard/*" element={<GuardPortal />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ 'MANAGER' ]} />}> 
        <Route path="/manager/*" element={<ManagerPortal />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
