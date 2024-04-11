
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'
import Home from './navigation/Home';
import AboutUs from './navigation/AboutUs';
import Products from './navigation/Products';
import ShoppingCar from './navigation/ShoppingCar';
import NavigationBar from './navigation/navigationBar';

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

  const Homepage = () => {
    return (
      <Routes>
        <Route Component={Home} path="*" />
        
      </Routes>
    )
  }
  return (
    <div className="App">
      <Router>
        <NavigationBar/>
        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={Homepage} path="*" />{/*aqui va el home de color lucy, cambiar por el componente HolaC*/ }
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<ShoppingCar />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
