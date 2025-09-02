import './App.css'
import Otp from './components/Otp'

function App() {
  return (
    <>
      <h1>Please Enter OTP</h1>
      <Otp otpLength={6}/>
    </>
  )
}

export default App
