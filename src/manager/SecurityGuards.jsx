import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerGuards(){
  const [guards, setGuards] = useState([])
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ firstName:'', middleName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', securityGuardId:'', assignedGates:[] })
  const [loading, setLoading] = useState(false)
  
  const load = async()=>{ 
    setLoading(true)
    try {
      const res1 = await api.get('/api/manager/security-guards'); 
      setGuards(res1.data.guards||[]); 
      const res2 = await api.get('/api/manager/gates'); 
      setGates(res2.data.gates||[]) 
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{ load() },[])
  
  const toggleGate = (id)=> setForm(f=> ({...f, assignedGates: f.assignedGates.includes(id) ? f.assignedGates.filter(x=>x!==id) : [...f.assignedGates, id] }))
  
  const submit = async (e)=>{ 
    e.preventDefault(); 
    setLoading(true)
    try {
      await api.post('/api/manager/security-guards', form); 
      setForm({ firstName:'', middleName:'', lastName:'', empNumber:'', email:'', password:'StrongPass@123', contactNumber:'', securityGuardId:'', assignedGates:[] }); 
      await load() 
    } catch (error) {
      console.error('Failed to create security guard:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const del = async (id)=>{ 
    if (confirm('Are you sure you want to delete this security guard?')) {
      try {
        await api.delete(`/api/manager/security-guards/${id}`); 
        await load() 
      } catch (error) {
        console.error('Failed to delete security guard:', error)
      }
    }
  }
  
  return (
    <div>
      <div className="card">
        <h3>Create Security Guard</h3>
        <form onSubmit={submit} className="row">
          <div className="col">
            <label>First Name</label>
            <input className="input" value={form.firstName||''} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Middle Name</label>
            <input className="input" value={form.middleName||''} onChange={e=>setForm(f=>({...f,middleName:e.target.value}))} />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input className="input" value={form.lastName||''} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Employee Number</label>
            <input className="input" value={form.empNumber||''} onChange={e=>setForm(f=>({...f,empNumber:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Email</label>
            <input type="email" className="input" value={form.email||''} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Password</label>
            <input type="password" className="input" value={form.password||''} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Contact Number</label>
            <input className="input" value={form.contactNumber||''} onChange={e=>setForm(f=>({...f,contactNumber:e.target.value}))} />
          </div>
          <div className="col">
            <label>Security Guard ID</label>
            <input className="input" value={form.securityGuardId||''} onChange={e=>setForm(f=>({...f,securityGuardId:e.target.value}))} required />
          </div>
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
          <div className="col"><button className="btn" disabled={loading}>{loading?'Creating...':'Create'}</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Security Guards</h3>
        {loading ? (
          <div>Loading security guards...</div>
        ) : guards.length === 0 ? (
          <div>No security guards found</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Full Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Employee Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Security Guard ID</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Email</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Contact Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Assigned Gates</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Created</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guards.map(s=> (
                  <tr key={s._id} style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      <strong>{s.firstName} {s.middleName ? s.middleName + ' ' : ''}{s.lastName}</strong>
                    </td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{s.empNumber}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{s.securityGuardId}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{s.email}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{s.contactNumber || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      {s.assignedGates && s.assignedGates.length > 0 
                        ? s.assignedGates.map(gate => gate.gateName).join(', ')
                        : 'No gates assigned'
                      }
                    </td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      <button className="btn danger" onClick={()=>del(s._id)}>Delete</button>
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
