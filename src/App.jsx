
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'

const Admin = () => {
  {/**
         * Paginas que requieren autenticacion de administrador
         */}
  return (
    <AuthProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />

      </Routes>
    </AuthProvider>
  )
}
function App() {
  const HolaC = () => {
    return (<h1 style={{ color: "red" }}>Hola</h1>)
  }
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={HolaC} path="/" />{/*aqui va el home de color lucy, cambiar por el componente HolaC*/ }
        </Routes>
      </Router>
    </div>
  )
}

export default App
