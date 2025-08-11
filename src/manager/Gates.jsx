import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerGates(){
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ gateNumber:'', gateName:'' })
  const load = async()=>{ const {data} = await api.get('/api/manager/gates'); setGates(data.gates||[]) }
  useEffect(()=>{ load() },[])
  const submit = async (e)=>{ e.preventDefault(); await api.post('/api/manager/gates', form); setForm({ gateNumber:'', gateName:'' }); load() }
  const del = async (id)=>{ await api.delete(`/api/manager/gates/${id}`); load() }
  return (
    <div>
      <div className="card">
        <h3>Add Gate</h3>
        <form onSubmit={submit} className="row">
          {['gateNumber','gateName'].map(k=> (
            <div key={k} className="col"><label>{k}</label><input className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} /></div>
          ))}
          <div className="col"><button className="btn">Save</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Gates</h3>
        {gates.map(g=> (
          <div key={g._id} className="row" style={{alignItems:'center'}}>
            <div className="col">{g.gateName} ({g.gateNumber})</div>
            <div className="col"><button className="btn danger" onClick={()=>del(g._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
