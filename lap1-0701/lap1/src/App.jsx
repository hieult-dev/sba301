
import './App.css'
import Login from '../src/page/Login.jsx'
import Home from '../src/page/Home.jsx'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
