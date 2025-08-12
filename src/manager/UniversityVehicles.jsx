import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerUniVehicles(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ vehicleNumber:'', vehicleType:'Bus', vehicleModelName:'', driverName:'', driverMobileNumber:'' })
  const [loading, setLoading] = useState(false)
  
  const load = async()=>{ 
    setLoading(true)
    try {
      const {data} = await api.get('/api/manager/vehicles'); 
      setItems(data.vehicles||[]) 
    } catch (error) {
      console.error('Failed to load vehicles:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{ load() },[])
  
  const submit = async (e)=>{ 
    e.preventDefault(); 
    setLoading(true)
    try {
      await api.post('/api/manager/vehicles', form); 
      setForm({ vehicleNumber:'', vehicleType:'Bus', vehicleModelName:'', driverName:'', driverMobileNumber:'' }); 
      await load() 
    } catch (error) {
      console.error('Failed to create vehicle:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const del = async (id)=>{ 
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.delete(`/api/manager/vehicles/${id}`); 
        await load() 
      } catch (error) {
        console.error('Failed to delete vehicle:', error)
      }
    }
  }
  
  return (
    <div>
      <div className="card">
        <h3>Add University Vehicle</h3>
        <form onSubmit={submit} className="row">
          <div className="col">
            <label>Vehicle Number</label>
            <input className="input" value={form.vehicleNumber||''} onChange={e=>setForm(f=>({...f,vehicleNumber:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Vehicle Type</label>
            <select className="input" value={form.vehicleType||''} onChange={e=>setForm(f=>({...f,vehicleType:e.target.value}))}>
              <option value="Bus">Bus</option>
              <option value="Car">Car</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Van">Van</option>
              <option value="Truck">Truck</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col">
            <label>Vehicle Model Name</label>
            <input className="input" value={form.vehicleModelName||''} onChange={e=>setForm(f=>({...f,vehicleModelName:e.target.value}))} />
          </div>
          <div className="col">
            <label>Driver Name</label>
            <input className="input" value={form.driverName||''} onChange={e=>setForm(f=>({...f,driverName:e.target.value}))} />
          </div>
          <div className="col">
            <label>Driver Mobile Number</label>
            <input className="input" value={form.driverMobileNumber||''} onChange={e=>setForm(f=>({...f,driverMobileNumber:e.target.value}))} />
          </div>
          <div className="col"><button className="btn" disabled={loading}>{loading?'Saving...':'Save'}</button></div>
        </form>
      </div>
      <div className="card">
        <h3>University Vehicles</h3>
        {loading ? (
          <div>Loading vehicles...</div>
        ) : items.length === 0 ? (
          <div>No university vehicles found</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Vehicle Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Vehicle Type</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Model Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Driver Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Driver Mobile</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(v=> (
                  <tr key={v._id} style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}><strong>{v.vehicleNumber}</strong></td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.vehicleType}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.vehicleModelName || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.driverName || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.driverMobileNumber || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      <button className="btn danger" onClick={()=>del(v._id)}>Delete</button>
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
