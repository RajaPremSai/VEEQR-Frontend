import { useAuth } from '../state/AuthContext'
export default function UserDashboard(){
  const { profile } = useAuth()
  return (
    <div className="card">
      <h2>Welcome, {profile?.firstName || profile?.email}</h2>
      <p>Use the navigation above to manage your vehicles, view your logs and announcements.</p>
    </div>
  )
}
