import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'
import Home from './navigation/home';
import AboutUs from './navigation/aboutUs';
import Products from './navigation/products';
import ShoppingCar from './navigation/shoppingCar';

const Admin = () => {
  {/**
         * Paginas que requieren autenticacion de administrador
         */}
  return (
    <AuthProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />
        <Route Component={AdminHome} path="admin/home/" />
      </Routes>
    </AuthProvider>
  )
}
function App() {
  return (
    <div className="App">
      {/**
         * Rutas públicas de la aplicacion
         */}
      <Router>
        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={Home} path="/" />
          <Route path="/" Component={Home} />
          <Route path="/nosotros" Component={AboutUs} />
          <Route path="/productos" Component={Products} />
          <Route path="/otra-pagina" Component={ShoppingCar} />
        </Routes>        
      </Router>
    </div>
  )
}

export default App
