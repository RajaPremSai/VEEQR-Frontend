import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function UserVehicles(){
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState({ vehicleNumber:'', vehicleType:'Car', vehicleModelName:'', vehicleOwner:'', driverName:'', driverMobileNumber:'' })
  const [loading, setLoading] = useState(false)

  const load = async()=>{
    setLoading(true)
    try {
      const { data } = await api.get('/api/users/vehicles')
      setVehicles(data.vehicles||[])
    } catch (error) {
      console.error('Failed to load vehicles:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{ load() },[])

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try{
      await api.post('/api/users/vehicles', form)
      setForm({ vehicleNumber:'', vehicleType:'Car', vehicleModelName:'', vehicleOwner:'', driverName:'', driverMobileNumber:'' })
      await load()
    } catch (error) {
      console.error('Failed to add vehicle:', error)
    } finally { 
      setLoading(false) 
    }
  }

  const downloadQR = (qrImageUrl, vehicleNumber) => {
    if (qrImageUrl) {
      const fullUrl = qrImageUrl.startsWith('http') ? qrImageUrl : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${qrImageUrl}`
      const link = document.createElement('a')
      link.href = fullUrl
      link.download = `QR_${vehicleNumber}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getQRImageUrl = (qrImageUrl) => {
    if (!qrImageUrl) return null
    return qrImageUrl.startsWith('http') ? qrImageUrl : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${qrImageUrl}`
  }

  return (
    <div>
      <div className="card">
        <h3>Add Vehicle</h3>
        <form onSubmit={submit} className="row">
          <div className="col">
            <label>Vehicle Number</label>
            <input className="input" value={form.vehicleNumber||''} onChange={(e)=>setForm(f=>({...f,vehicleNumber:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Vehicle Type</label>
            <select className="input" value={form.vehicleType||''} onChange={(e)=>setForm(f=>({...f,vehicleType:e.target.value}))}>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
              <option value="Bus">Bus</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col">
            <label>Vehicle Model Name</label>
            <input className="input" value={form.vehicleModelName||''} onChange={(e)=>setForm(f=>({...f,vehicleModelName:e.target.value}))} />
          </div>
          <div className="col">
            <label>Vehicle Owner</label>
            <input className="input" value={form.vehicleOwner||''} onChange={(e)=>setForm(f=>({...f,vehicleOwner:e.target.value}))} required />
          </div>
          <div className="col">
            <label>Driver Name</label>
            <input className="input" value={form.driverName||''} onChange={(e)=>setForm(f=>({...f,driverName:e.target.value}))} />
          </div>
          <div className="col">
            <label>Driver Mobile Number</label>
            <input className="input" value={form.driverMobileNumber||''} onChange={(e)=>setForm(f=>({...f,driverMobileNumber:e.target.value}))} />
          </div>
          <div className="col"><button className="btn" disabled={loading}>{loading?'Saving...':'Add'}</button></div>
        </form>
      </div>
      <div className="card">
        <h3>My Vehicles</h3>
        {loading ? (
          <div>Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div>No vehicles found. Add your first vehicle above.</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Vehicle Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Vehicle Type</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Model Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Owner</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Driver Name</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Driver Mobile</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>QR Code</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(v=> (
                  <tr key={v._id} style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}><strong>{v.vehicleNumber}</strong></td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.vehicleType}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.vehicleModelName || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.vehicleOwner}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.driverName || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{v.driverMobileNumber || 'N/A'}</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>
                      {v.qr?.imageUrl ? (
                        <div style={{display: 'flex', gap: '5px'}}>
                          <a href={getQRImageUrl(v.qr.imageUrl)} target="_blank" rel="noopener noreferrer" className="btn secondary" style={{padding: '4px 8px', fontSize: '12px'}}>
                            View
                          </a>
                          <button 
                            onClick={() => downloadQR(v.qr.imageUrl, v.vehicleNumber)} 
                            className="btn" 
                            style={{padding: '4px 8px', fontSize: '12px'}}
                          >
                            Download
                          </button>
                        </div>
                      ) : 'Generating...'}
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
