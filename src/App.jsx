import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLogin from './pages/AdminLogin'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Component={AdminLogin} path="/admin/login" />
        </Routes>


      </Router>
    </div>
  )
}

export default App
