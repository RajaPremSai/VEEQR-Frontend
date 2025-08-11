import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, profile } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" />
  if (allowedRoles && !allowedRoles.includes(profile?.role)) return <Navigate to="/login" />
  return <Outlet />
}
