import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerUsers(){
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ firstName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', userType:'Employee' })
  const [loading, setLoading] = useState(false)
  
  const load = async()=>{ 
    setLoading(true)
    try {
      const {data} = await api.get('/api/manager/users'); 
      setUsers(data.users||[]) 
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{ load() },[])
  
  const submit = async (e)=>{ 
    e.preventDefault(); 
    setLoading(true)
    try {
      await api.post('/api/manager/users', form); 
      setForm({ firstName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', userType:'Employee' }); 
      await load() 
    } catch (error) {
      console.error('Failed to create user:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const del = async (id)=>{ 
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/manager/users/${id}`); 
        await load() 
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }
  
  return (
    <div>
      <div className="card">
        <h3>Create User</h3>
        <form onSubmit={submit} className="row">
          {['firstName','lastName','empNumber','email','password','contactNumber','userType'].map(k=> (
            <div key={k} className="col">
              <label>{k}</label>
              {k === 'userType' ? (
                <select className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}>
                  <option value="Employee">Employee</option>
                  <option value="Student">Student</option>
                  <option value="Visitor">Visitor</option>
                </select>
              ) : (
                <input className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
              )}
            </div>
          ))}
          <div className="col"><button className="btn" disabled={loading}>{loading?'Creating...':'Create'}</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Users</h3>
        {loading ? (
          <div>Loading users...</div>
        ) : users.length === 0 ? (
          <div>No users found</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Employee Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Email</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Contact Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>User Type</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u=> (
                  <tr key={u._id} style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      <strong>{u.firstName} {u.middleName ? u.middleName + ' ' : ''}{u.lastName}</strong>
                    </td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.empNumber}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.email}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.contactNumber || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{u.userType}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      <button className="btn danger" onClick={()=>del(u._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
