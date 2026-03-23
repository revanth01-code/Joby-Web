import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetailes from './components/JobltemDetails' 
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id" element={<JobItemDetailes />} />
    </Routes>
  </BrowserRouter>
)

export default App