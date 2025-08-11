import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerUniVehicles(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ vehicleNumber:'', vehicleType:'Bus', vehicleModelName:'', driverName:'', driverMobileNumber:'' })
  const load = async()=>{ const {data} = await api.get('/api/manager/vehicles'); setItems(data.vehicles||[]) }
  useEffect(()=>{ load() },[])
  const submit = async (e)=>{ e.preventDefault(); await api.post('/api/manager/vehicles', form); setForm({ vehicleNumber:'', vehicleType:'Bus', vehicleModelName:'', driverName:'', driverMobileNumber:'' }); load() }
  const del = async (id)=>{ await api.delete(`/api/manager/vehicles/${id}`); load() }
  return (
    <div>
      <div className="card">
        <h3>Add University Vehicle</h3>
        <form onSubmit={submit} className="row">
          {['vehicleNumber','vehicleType','vehicleModelName','driverName','driverMobileNumber'].map(k=> (
            <div key={k} className="col"><label>{k}</label><input className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} /></div>
          ))}
          <div className="col"><button className="btn">Save</button></div>
        </form>
      </div>
      <div className="card">
        <h3>University Vehicles</h3>
        {items.map(v=> (
          <div key={v._id} className="row" style={{alignItems:'center'}}>
            <div className="col">{v.vehicleNumber} · {v.vehicleType} · {v.vehicleModelName}</div>
            <div className="col"><button className="btn danger" onClick={()=>del(v._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
