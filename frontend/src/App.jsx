import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Addtaskpage from './pages/Addtaskpage'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addtask" element={<Addtaskpage/>}/>
      </Routes>
    </Router>
  )
}

export default App
