import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerAnnouncements(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title:'', description:'', date:'' })
  const load = async()=>{ const {data} = await api.get('/api/manager/announcements'); setItems(data.announcements||[]) }
  useEffect(()=>{ load() },[])
  const submit = async (e)=>{ e.preventDefault(); await api.post('/api/manager/announcements', form); setForm({ title:'', description:'', date:'' }); load() }
  const del = async (id)=>{ await api.delete(`/api/manager/announcements/${id}`); load() }
  return (
    <div>
      <div className="card">
        <h3>Add Announcement</h3>
        <form onSubmit={submit} className="row">
          {['title','description','date'].map(k=> (
            <div key={k} className="col"><label>{k}</label><input className="input" value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} /></div>
          ))}
          <div className="col"><button className="btn">Publish</button></div>
        </form>
      </div>
      <div className="card">
        <h3>Announcements</h3>
        {items.map(a=> (
          <div key={a._id} className="row" style={{alignItems:'center'}}>
            <div className="col"><strong>{a.title}</strong> — {a.description}</div>
            <div className="col"><button className="btn danger" onClick={()=>del(a._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
