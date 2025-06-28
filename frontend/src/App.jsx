import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Addtaskpage from './pages/Addtaskpage'
import Loginpage from './pages/Loginpage'
import Register from './components/Register'
import Showtaskpage from './pages/Showtaskpage'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addtask" element={<Addtaskpage/>}/>
        
        <Route path="/showtask" element={<Showtaskpage/>}/>
      </Routes>
    </Router>
  )
}

export default App
