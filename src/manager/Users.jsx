import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerUsers(){
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ firstName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', userType:'Employee' })
  const load = async()=>{ const {data} = await api.get('/api/manager/users'); setUsers(data.users||[]) }
  useEffect(()=>{ load() },[])
  const submit = async (e)=>{ e.preventDefault(); await api.post('/api/manager/users', form); setForm({ firstName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', userType:'Employee' }); load() }
  const del = async (id)=>{ await api.delete(`/api/manager/users/${id}`); load() }
  return (
    <div>
      <div className="card">
        <h3>Create User</h3>
        <form onSubmit={submit} className="row">
          {['firstName','lastName','empNumber','email','password','contactNumber','userType'].map(k=> (
            <div key={k} className="col"><label>{k}</label><input className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} /></div>
          ))}
          <div className="col"><button className="btn">Create</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Users</h3>
        {users.map(u=> (
          <div key={u._id} className="row" style={{alignItems:'center'}}>
            <div className="col">{u.firstName} {u.lastName} · {u.email} · {u.empNumber}</div>
            <div className="col"><button className="btn danger" onClick={()=>del(u._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
