
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'

import './App.css'
import { AuthProvider } from './context/AuthContext'
import AdminHome from './pages/user/admin/AdminHome'
import AdminLogin from './pages/user/admin/AdminLogin'
import Home from './pages/user/home';
import AboutUs from './pages/user/aboutUs';
import Products from './pages/user/products';
import ShoppingCar from './pages/user/shoppingCar';
import NavigationBar from './pages/user/navigationBar';

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
      <>
        <NavigationBar/>
        <Routes>
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<ShoppingCar />} />
          <Route Component={Home} path="*" />
        </Routes>
      </>
      
    )
  }
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={Homepage} path="*" />{/*aqui va el home de color lucy, cambiar por el componente HolaC*/ }
          
        </Routes>
      </Router>
      

    </div>
  )
}

export default App
