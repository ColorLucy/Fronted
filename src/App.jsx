
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <div className="App">
      <Router>
        {/**
         * Paginas que requieren autenticacion de administrador
         */}
        <AuthProvider>
          <Routes>
            <Route Component={AdminLogin} path="/admin/login/" />
            <Route Component={AdminHome} path="/admin/" />
          </Routes>
        </AuthProvider>
        {/**
         * Paginas que no
         <Routes>
          </Routes>
        */}
      </Router>
    </div>
  )
}

export default App
