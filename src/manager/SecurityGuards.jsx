import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerGuards(){
  const [guards, setGuards] = useState([])
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ firstName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', securityGuardId:'', assignedGates:[] })
  const load = async()=>{ const res1 = await api.get('/api/manager/security-guards'); setGuards(res1.data.guards||[]); const res2 = await api.get('/api/manager/gates'); setGates(res2.data.gates||[]) }
  useEffect(()=>{ load() },[])
  const toggleGate = (id)=> setForm(f=> ({...f, assignedGates: f.assignedGates.includes(id) ? f.assignedGates.filter(x=>x!==id) : [...f.assignedGates, id] }))
  const submit = async (e)=>{ e.preventDefault(); await api.post('/api/manager/security-guards', form); setForm({ firstName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', securityGuardId:'', assignedGates:[] }); load() }
  const del = async (id)=>{ await api.delete(`/api/manager/security-guards/${id}`); load() }
  return (
    <div>
      <div className="card">
        <h3>Create Security Guard</h3>
        <form onSubmit={submit} className="row">
          {['firstName','lastName','empNumber','email','password','contactNumber','securityGuardId'].map(k=> (
            <div key={k} className="col"><label>{k}</label><input className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} /></div>
          ))}
          <div className="col">
            <label>Assign Gates</label>
            <div className="row">
              {gates.map(g=> (
                <label key={g._id} className="col" style={{display:'flex',alignItems:'center',gap:8}}>
                  <input type="checkbox" checked={form.assignedGates.includes(g._id)} onChange={()=>toggleGate(g._id)} /> {g.gateName} ({g.gateNumber})
                </label>
              ))}
            </div>
          </div>
          <div className="col"><button className="btn">Create</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Security Guards</h3>
        {guards.map(s=> (
          <div key={s._id} className="row" style={{alignItems:'center'}}>
            <div className="col">{s.firstName} {s.lastName} · {s.email} · {s.securityGuardId}</div>
            <div className="col"><button className="btn danger" onClick={()=>del(s._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
