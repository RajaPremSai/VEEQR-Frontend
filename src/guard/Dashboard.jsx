import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function GuardDashboard(){
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ gateNumber:'', direction:'IN', vehicleNumber:'' })
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    (async()=>{
      const { data } = await api.get('/api/security-guards/gates')
      setGates(data.gates||[])
      if ((data.gates||[])[0]) setForm(f=>({...f, gateNumber: data.gates[0].gateNumber }))
    })()
  },[])

  const submit = async (e)=>{
    e.preventDefault(); setMsg('')
    try{
      const { data } = await api.post('/api/security-guards/logs', form)
      setMsg(`Logged ${form.direction} for ${data.log.vehicleNumber}`)
    } catch(err){
      setMsg(err?.response?.data?.message || 'Failed')
    }
  }

  return (
    <div>
      <div className="card">
        <h3>Scan/Log Entry</h3>
        <form onSubmit={submit} className="row">
          <div className="col">
            <label>Gate</label>
            <select className="input" value={form.gateNumber} onChange={e=>setForm(f=>({...f, gateNumber:e.target.value}))}>
              {gates.map(g=> <option key={g._id} value={g.gateNumber}>{g.gateName} ({g.gateNumber})</option>)}
            </select>
          </div>
          <div className="col">
            <label>Direction</label>
            <select className="input" value={form.direction} onChange={e=>setForm(f=>({...f, direction:e.target.value}))}>
              <option>IN</option><option>OUT</option>
            </select>
          </div>
          <div className="col">
            <label>Vehicle Number</label>
            <input className="input" value={form.vehicleNumber} onChange={e=>setForm(f=>({...f, vehicleNumber:e.target.value}))} />
          </div>
          <div className="col"><button className="btn">Submit</button></div>
          {msg && <div className="col">{msg}</div>}
        </form>
      </div>
    </div>
  )
}
