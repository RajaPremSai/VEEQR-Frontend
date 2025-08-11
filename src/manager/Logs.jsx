import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ManagerLogs(){
  const [logs, setLogs] = useState([])
  const [filters, setFilters] = useState({ vehicleNumber:'', ownerName:'', gate:'', date:'' })

  const load = async()=>{
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k,v])=>{ if (v) params.set(k, v) })
    const { data } = await api.get(`/api/manager/logs?${params.toString()}`)
    setLogs(data.logs||[])
  }
  useEffect(()=>{ load() },[])

  const onFilter = async (e)=>{ e.preventDefault(); load() }

  const exportUrl = (type)=>{
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k,v])=>{ if (v) params.set(k, v) })
    params.set('export', type)
    return `${base}/api/manager/logs?${params.toString()}`
  }

  return (
    <div>
      <div className="card">
        <h3>Filters</h3>
        <form onSubmit={onFilter} className="row">
          {['vehicleNumber','ownerName','gate','date'].map(k=> (
            <div key={k} className="col"><label>{k}</label><input className="input" value={filters[k]||''} onChange={e=>setFilters(f=>({...f,[k]:e.target.value}))} /></div>
          ))}
          <div className="col"><button className="btn">Apply</button></div>
          <div className="col" style={{display:'flex',gap:8,alignItems:'center'}}>
            <a className="btn secondary" href={exportUrl('csv')} target="_blank">Export CSV</a>
            <a className="btn secondary" href={exportUrl('pdf')} target="_blank">Export PDF</a>
          </div>
        </form>
      </div>
      <div className="card">
        <h3>Logs</h3>
        {logs.map(l=> (
          <div key={l._id} className="row">
            <div className="col">{l.vehicleNumber}</div>
            <div className="col">{l.gateNumber}</div>
            <div className="col">IN: {l.timeIn? new Date(l.timeIn).toLocaleString():'-'}</div>
            <div className="col">OUT: {l.timeOut? new Date(l.timeOut).toLocaleString():'-'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
