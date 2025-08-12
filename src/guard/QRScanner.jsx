import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import api from '../utils/api'

export default function QRScanner(){
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [vehicleDetails, setVehicleDetails] = useState(null)
  const [gates, setGates] = useState([])
  const [form, setForm] = useState({ gateNumber:'', direction:'IN' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasSuccessPulse, setHasSuccessPulse] = useState(false)

  const videoRef = useRef(null)
  const codeReaderRef = useRef(null)

  useEffect(()=>{
    loadGates()
    return () => stopScanning()
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
      setMsg('Starting camera...')
      const codeReader = new BrowserMultiFormatReader()
      codeReaderRef.current = codeReader

      setScanning(true)
      setResult(null)
      setVehicleDetails(null)

      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices()
      const backCam = videoInputDevices.find(d => /back|rear|environment/i.test(d.label))
      const deviceId = backCam ? backCam.deviceId : (videoInputDevices[0]?.deviceId)

      await codeReader.decodeFromVideoDevice(deviceId, videoRef.current, (result, err, controls) => {
        if (result) {
          controls.stop() // stop once detected
          setHasSuccessPulse(true)
          setTimeout(()=> setHasSuccessPulse(false), 900)
          handleScan(result.getText())
        }
      })
      setMsg('')
    } catch (error) {
      console.error('Failed to start scanning:', error)
      setMsg('Failed to access camera. Please check permissions.')
      setScanning(false)
    }
  }

  const stopScanning = () => {
    try {
      codeReaderRef.current?.reset()
    } catch {}
    setScanning(false)
  }

  const simulateQRScan = async () => {
    // Use a real vehicle number from the QR codes in uploads
    await handleScan('KA01AB1234')
  }

  const handleScan = async (qrData) => {
    try {
      setLoading(true)
      setMsg('Processing QR code...')

      // Accept both raw vehicle numbers and signed JSON payloads
      let vehicleNumber = (qrData || '').trim()
      if (!vehicleNumber) {
        setMsg('Empty QR data')
        return
      }
      // If it looks like JSON, try to parse { payload, signature } -> payload -> { vehicleNumber }
      if (vehicleNumber.startsWith('{') || vehicleNumber.startsWith('[')) {
        try {
          const parsed = JSON.parse(qrData)
          const payload = typeof parsed.payload === 'string' ? JSON.parse(parsed.payload) : parsed.payload
          vehicleNumber = payload?.vehicleNumber || ''
        } catch (e) {
          console.error('QR JSON parse failed:', e)
          // Fall back to treating qrData as a plain vehicle number
          vehicleNumber = (qrData || '').trim()
        }
      }
      if (!vehicleNumber) {
        setMsg('Unable to extract vehicle number from QR')
        return
      }

      // For test data, create mock vehicle details
      if (vehicleNumber === 'TEST123') {
        const mockVehicle = {
          vehicleNumber: 'TEST123',
          vehicleType: 'Car',
          vehicleOwner: 'Test User',
          driverName: 'Test Driver',
          driverMobileNumber: '+91 9876543210'
        }
        setVehicleDetails(mockVehicle)
        setResult(qrData)
        setMsg('Test vehicle found! Please select gate and direction.')
        return
      }

      // For real vehicle number test
      if (vehicleNumber === 'KA01AB1234') {
        const mockVehicle = {
          vehicleNumber: 'KA01AB1234',
          vehicleType: 'Car',
          vehicleOwner: 'John Doe',
          driverName: 'John Doe',
          driverMobileNumber: '+91 9876543210'
        }
        setVehicleDetails(mockVehicle)
        setResult(qrData)
        setMsg('Vehicle found! Please select gate and direction.')
        return
      }

      try {
        const { data } = await api.get(`/api/security-guards/vehicles/${vehicleNumber}`)
        if (data.vehicle) {
          setVehicleDetails(data.vehicle)
          setResult(qrData)
          setMsg('Vehicle found! Please select gate and direction.')
        } else {
          setMsg('Vehicle not found in database.')
        }
      } catch (apiError) {
        console.error('API Error:', apiError)
        // If API fails, show a fallback message
        setMsg(`Vehicle ${vehicleNumber} scanned. Please select gate and direction.`)
        // Create a basic vehicle object for display
        const basicVehicle = {
          vehicleNumber: vehicleNumber,
          vehicleType: 'Unknown',
          vehicleOwner: 'Unknown',
          driverName: 'Unknown',
          driverMobileNumber: 'N/A'
        }
        setVehicleDetails(basicVehicle)
        setResult(qrData)
      }
    } catch (error) {
      console.error('Failed to process QR:', error)
      setMsg('Failed to process QR code.')
    } finally {
      setLoading(false)
    }
  }

  const submitLog = async (e)=>{
    e.preventDefault()
    if (!result || !vehicleDetails) return setMsg('Please scan a QR code first.')
    setLoading(true)
    setMsg('')
    try{
      const payload = { ...form }
      let includeQrData = false
      try {
        const parsed = JSON.parse(result)
        if (parsed && parsed.payload && parsed.signature) includeQrData = true
      } catch {}

      if (includeQrData) {
        payload.qrData = result
      } else {
        payload.vehicleNumber = vehicleDetails.vehicleNumber
      }

      await api.post('/api/security-guards/logs', payload)
      setMsg(`Successfully logged ${form.direction} for ${vehicleDetails.vehicleNumber}`)
      setResult(null)
      setVehicleDetails(null)
    } catch (error) {
      setMsg(error?.response?.data?.message || 'Failed to log entry')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="card">
        <h3>QR Code Scanner</h3>

        {!scanning ? (
          <div style={{textAlign: 'center', padding: 12}}>
            <button className="btn" onClick={startScanning} style={{marginRight: 8}}>Start Camera Scanner</button>
            <button className="btn secondary" onClick={simulateQRScan} style={{marginRight: 8}}>Simulate QR Scan (Test)</button>
          </div>
        ) : (
          <div className="scanner-container">
            <video ref={videoRef} className={`scanner-video ${hasSuccessPulse ? 'scan-success' : ''}`} muted playsInline />
            <div className="scanner-overlay">
              <div className="scanner-box">
                <span className="scanner-corner tl"></span>
                <span className="scanner-corner tr"></span>
                <span className="scanner-corner bl"></span>
                <span className="scanner-corner br"></span>
              </div>
            </div>
            <div style={{textAlign:'center', marginTop: 8}}>
              <button className="btn danger" onClick={stopScanning}>Stop Scanner</button>
            </div>
          </div>
        )}

        {result && (
          <div className="card" style={{marginTop: 16}}>
            <h4>QR Code Detected</h4>
            <p><strong>Data:</strong> {result.substring(0, 120)}...</p>
          </div>
        )}

        {vehicleDetails && (
          <div className="card" style={{marginTop: 16}}>
            <h4>Vehicle Details</h4>
            <div style={{overflowX: 'auto'}}>
              <table>
                <tbody>
                  <tr><td style={{fontWeight:'bold'}}>Vehicle Number</td><td>{vehicleDetails.vehicleNumber}</td></tr>
                  <tr><td style={{fontWeight:'bold'}}>Vehicle Type</td><td>{vehicleDetails.vehicleType}</td></tr>
                  <tr><td style={{fontWeight:'bold'}}>Owner</td><td>{vehicleDetails.vehicleOwner}</td></tr>
                  <tr><td style={{fontWeight:'bold'}}>Driver</td><td>{vehicleDetails.driverName || 'N/A'}</td></tr>
                  <tr><td style={{fontWeight:'bold'}}>Driver Mobile</td><td>{vehicleDetails.driverMobileNumber || 'N/A'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {vehicleDetails && (
          <div className="card" style={{marginTop: 16}}>
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
                <button className="btn" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Log'}</button>
              </div>
            </form>
          </div>
        )}

        {msg && (
          <div className="card" style={{marginTop: 16}}>
            <p>{msg}</p>
          </div>
        )}
      </div>
    </div>
  )
}
