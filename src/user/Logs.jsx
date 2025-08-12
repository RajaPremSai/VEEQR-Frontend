import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function UserLogs(){
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  const loadLogs = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/users/logs')
      setLogs(data.logs||[])
    } catch (error) {
      console.error('Failed to load logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ 
    loadLogs()
  },[])

  return (
    <div>
      <div className="card">
        <h3>My Vehicle Logs</h3>
        {loading ? (
          <div>Loading logs...</div>
        ) : logs.length === 0 ? (
          <div>No logs found for your vehicles</div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Log ID</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Vehicle Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Gate Number</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Security Guard</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Entry Time</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Exit Time</th>
                  <th style={{padding: '8px', border: '1px solid #ddd', textAlign: 'left'}}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(l=> {
                  const entryTime = l.timeIn ? new Date(l.timeIn) : null
                  const exitTime = l.timeOut ? new Date(l.timeOut) : null
                  const duration = entryTime && exitTime ? 
                    Math.round((exitTime - entryTime) / (1000 * 60)) + ' min' : '-'
                  
                  return (
                    <tr key={l._id} style={{borderBottom: '1px solid #ddd'}}>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}>{l.logId || l._id.slice(-8)}</td>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}><strong>{l.vehicleNumber}</strong></td>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}>{l.gateNumber}</td>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}>{l.securityGuardName || l.securityGuardId || 'N/A'}</td>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}>
                        {entryTime ? entryTime.toLocaleString() : '-'}
                      </td>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}>
                        {exitTime ? exitTime.toLocaleString() : '-'}
                      </td>
                      <td style={{padding: '8px', border: '1px solid #ddd'}}>{duration}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
