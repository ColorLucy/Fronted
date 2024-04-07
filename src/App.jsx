import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLogin from './pages/AdminLogin'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/AuthContext'

function App() {


  return (
    <div className="App">

      <Router>
        <AuthProvider>
          <Routes>
            <Route Component={AdminLogin} path="/admin/login" />
          </Routes>
        </AuthProvider>
      </Router>


    </div>
  )
}

export default App
