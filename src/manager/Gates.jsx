import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerGates(){
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ gateNumber:'', gateName:'' })
  const [loading, setLoading] = useState(false)
  
  const load = async()=>{ 
    setLoading(true)
    try {
      const {data} = await api.get('/api/manager/gates'); 
      setGates(data.gates||[]) 
    } catch (error) {
      console.error('Failed to load gates:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{ load() },[])
  
  const submit = async (e)=>{ 
    e.preventDefault(); 
    setLoading(true)
    try {
      await api.post('/api/manager/gates', form); 
      setForm({ gateNumber:'', gateName:'' }); 
      await load() 
    } catch (error) {
      console.error('Failed to create gate:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const del = async (id)=>{ 
    if (confirm('Are you sure you want to delete this gate?')) {
      try {
        await api.delete(`/api/manager/gates/${id}`); 
        await load() 
      } catch (error) {
        console.error('Failed to delete gate:', error)
      }
    }
  }
  
  return (
    <div>
      <div className="card">
        <h3>Add Gate</h3>
        <form onSubmit={submit} className="row">
          <div className="col">
            <label>Gate Number</label>
            <input className="input" value={form.gateNumber||''} onChange={e=>setForm(f=>({...f,gateNumber:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Gate Name</label>
            <input className="input" value={form.gateName||''} onChange={e=>setForm(f=>({...f,gateName:e.target.value}))} required />
          </div>
          <div className="col"><button className="btn" disabled={loading}>{loading?'Saving...':'Save'}</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Gates</h3>
        {loading ? (
          <div>Loading gates...</div>
        ) : gates.length === 0 ? (
          <div>No gates found</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Gate Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Gate Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Created</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {gates.map(g=> (
                  <tr key={g._id} style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}><strong>{g.gateNumber}</strong></td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{g.gateName}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      {g.createdAt ? new Date(g.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      <button className="btn danger" onClick={()=>del(g._id)}>Delete</button>
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
