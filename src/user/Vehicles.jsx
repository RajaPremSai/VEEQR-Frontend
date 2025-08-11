import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function UserVehicles(){
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState({ vehicleNumber:'', vehicleType:'Car', vehicleModelName:'', vehicleOwner:'', driverName:'', driverMobileNumber:'' })
  const [loading, setLoading] = useState(false)

  const load = async()=>{
    const { data } = await api.get('/api/users/vehicles')
    setVehicles(data.vehicles||[])
  }
  useEffect(()=>{ load() },[])

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try{
      await api.post('/api/users/vehicles', form)
      setForm({ vehicleNumber:'', vehicleType:'Car', vehicleModelName:'', vehicleOwner:'', driverName:'', driverMobileNumber:'' })
      await load()
    } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="card">
        <h3>Add Vehicle</h3>
        <form onSubmit={submit} className="row">
          {['vehicleNumber','vehicleType','vehicleModelName','vehicleOwner','driverName','driverMobileNumber'].map((k)=> (
            <div key={k} className="col">
              <label>{k}</label>
              <input className="input" value={form[k]||''} onChange={(e)=>setForm(f=>({...f,[k]:e.target.value}))} />
            </div>
          ))}
          <div className="col"><button className="btn" disabled={loading}>{loading?'Saving...':'Add'}</button></div>
        </form>
      </div>
      <div className="card">
        <h3>My Vehicles</h3>
        {vehicles.map(v=> (
          <div key={v._id} className="row" style={{alignItems:'center',justifyContent:'space-between'}}>
            <div className="col"><strong>{v.vehicleNumber}</strong> · {v.vehicleModelName} · {v.vehicleType}</div>
            <div className="col">QR: {v.qr?.imageUrl ? <a href={v.qr.imageUrl} target="_blank">View</a> : '-'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
