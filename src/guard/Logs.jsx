import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function GuardLogs(){
  const [logs, setLogs] = useState([])
  useEffect(()=>{
    (async()=>{
      const { data } = await api.get('/api/security-guards/logs')
      setLogs(data.logs||[])
    })()
  },[])
  return (
    <div className="card">
      <h3>Assigned Gates Logs</h3>
      {logs.map(l=> (
        <div key={l._id} className="row">
          <div className="col">{l.vehicleNumber}</div>
          <div className="col">{l.gateNumber}</div>
          <div className="col">IN: {l.timeIn? new Date(l.timeIn).toLocaleString():'-'}</div>
          <div className="col">OUT: {l.timeOut? new Date(l.timeOut).toLocaleString():'-'}</div>
        </div>
      ))}
    </div>
  )
}
