import { useEffect, useState, useRef } from 'react'
import api from '../utils/api'

export default function QRScanner(){
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [vehicleDetails, setVehicleDetails] = useState(null)
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ gateNumber:'', direction:'IN' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(()=>{
    loadGates()
    return () => {
      stopScanning()
    }
  }, [])

  const loadGates = async () => {
    try {
      const { data } = await api.get('/api/security-guards/gates')
      setGates(data.gates||[])
      if ((data.gates||[])[0]) setForm(f=>({...f, gateNumber: data.gates[0].gateNumber }))
    } catch (error) {
      console.error('Failed to load gates:', error)
    }
  }

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setScanning(true)
        setResult(null)
        setVehicleDetails(null)
        setMsg('')
        
        // Start QR scanning loop
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          scanQRCode()
        }
      }
    } catch (error) {
      console.error('Failed to access camera:', error)
      setMsg('Failed to access camera. Please check permissions.')
    }
  }

  const stopScanning = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setScanning(false)
  }

  const scanQRCode = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      
      // Simple QR detection simulation - in a real app, you'd use jsQR or similar
      // For now, we'll simulate detection
      if (Math.random() < 0.01) { // 1% chance per frame to simulate detection
        simulateQRDetection()
        return
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanQRCode)
  }

  const simulateQRDetection = () => {
    // Simulate QR code detection
    const testQRData = JSON.stringify({
      payload: JSON.stringify({ vehicleNumber: "TEST123" }),
      signature: "test_signature"
    })
    
    setResult(testQRData)
    processQRResult(testQRData)
    stopScanning()
  }

  const simulateQRScan = async () => {
    // For testing purposes - simulate a QR scan
    const testQRData = JSON.stringify({
      payload: JSON.stringify({ vehicleNumber: "TEST123" }),
      signature: "test_signature"
    })
    
    setResult(testQRData)
    await processQRResult(testQRData)
  }

  const processQRResult = async (qrData) => {
    try {
      setLoading(true)
      setMsg('Processing QR code...')
      
      // Parse QR data to get vehicle number
      let vehicleNumber = "TEST123" // Default for testing
      try {
        const parsed = JSON.parse(qrData)
        const payload = JSON.parse(parsed.payload)
        vehicleNumber = payload.vehicleNumber
      } catch (e) {
        console.error('Failed to parse QR data:', e)
        setMsg('Invalid QR code format.')
        return
      }

      // Lookup vehicle
      const { data } = await api.get(`/api/security-guards/vehicles/${vehicleNumber}`)
      
      if (data.vehicle) {
        setVehicleDetails(data.vehicle)
        setMsg('Vehicle found! Please select gate and direction.')
      } else {
        setMsg('Vehicle not found in database.')
      }
    } catch (error) {
      console.error('Failed to process QR result:', error)
      setMsg('Failed to process QR code.')
    } finally {
      setLoading(false)
    }
  }

  const submitLog = async (e) => {
    e.preventDefault()
    if (!result || !vehicleDetails) {
      setMsg('Please scan a QR code first.')
      return
    }
    
    setLoading(true)
    setMsg('')
    try {
      const { data } = await api.post('/api/security-guards/logs', {
        ...form,
        qrData: result,
        vehicleNumber: vehicleDetails.vehicleNumber
      })
      setMsg(`Successfully logged ${form.direction} for ${vehicleDetails.vehicleNumber}`)
      setResult(null)
      setVehicleDetails(null)
    } catch (error) {
      setMsg(error?.response?.data?.message || 'Failed to log entry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <h3>QR Code Scanner</h3>
        
        {!scanning ? (
          <div style={{textAlign: 'center', padding: '20px'}}>
            <button className="btn" onClick={startScanning} style={{marginBottom: '10px'}}>
              Start Camera Scanner
            </button>
            <br />
            <button className="btn secondary" onClick={simulateQRScan}>
              Simulate QR Scan (Test)
            </button>
          </div>
        ) : (
          <div style={{textAlign: 'center'}}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              style={{width: '100%', maxWidth: '400px', border: '2px solid #ccc'}}
            />
            <canvas 
              ref={canvasRef} 
              style={{display: 'none'}}
            />
            <br />
            <button className="btn danger" onClick={stopScanning} style={{marginTop: '10px'}}>
              Stop Scanner
            </button>
          </div>
        )}

        {result && (
          <div className="card" style={{marginTop: '20px'}}>
            <h4>QR Code Detected</h4>
            <p><strong>Data:</strong> {result.substring(0, 100)}...</p>
          </div>
        )}

        {vehicleDetails && (
          <div className="card" style={{marginTop: '20px'}}>
            <h4>Vehicle Details</h4>
            <div style={{overflowX: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <tbody>
                  <tr style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>Vehicle Number</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{vehicleDetails.vehicleNumber}</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>Vehicle Type</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{vehicleDetails.vehicleType}</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>Owner</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{vehicleDetails.vehicleOwner}</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>Driver</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{vehicleDetails.driverName || 'N/A'}</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #ddd'}}>
                    <td style={{padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>Driver Mobile</td>
                    <td style={{padding: '8px', border: '1px solid #ddd'}}>{vehicleDetails.driverMobileNumber || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {vehicleDetails && (
          <div className="card" style={{marginTop: '20px'}}>
            <h4>Log Entry</h4>
            <form onSubmit={submitLog} className="row">
              <div className="col">
                <label>Gate</label>
                <select className="input" value={form.gateNumber} onChange={e=>setForm(f=>({...f, gateNumber:e.target.value}))} required>
                  <option value="">Select Gate</option>
                  {gates.map(g=> <option key={g._id} value={g.gateNumber}>{g.gateName} ({g.gateNumber})</option>)}
                </select>
              </div>
              <div className="col">
                <label>Direction</label>
                <select className="input" value={form.direction} onChange={e=>setForm(f=>({...f, direction:e.target.value}))} required>
                  <option value="IN">Entry (IN)</option>
                  <option value="OUT">Exit (OUT)</option>
                </select>
              </div>
              <div className="col">
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Log'}
                </button>
              </div>
            </form>
          </div>
        )}

        {msg && (
          <div className="card" style={{marginTop: '20px', backgroundColor: msg.includes('Success') ? '#d4edda' : '#f8d7da'}}>
            <p>{msg}</p>
          </div>
        )}
      </div>
    </div>
  )
}
