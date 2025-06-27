import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Addtaskpage from './pages/Addtaskpage'
import Loginpage from './pages/Loginpage'
import Register from './components/Register'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addtask" element={<Addtaskpage/>}/>
      </Routes>
    </Router>
  )
}

export default App
