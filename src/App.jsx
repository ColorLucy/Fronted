import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AboutUs from "./pages/user/AboutUs";
import Home from "./pages/user/Home";
import NavigationBar from "./components/NavigationBar";
import Products from "./pages/user/Products";
import ShoppingCar from "./pages/user/ShoppingCar";
import AdminDashboard from "./pages/admin/AdminDashboard";

const Admin = () => {
  {
    /**
     * Paginas que requieren autenticacion de administrador
     */
  }
  return (
    <AuthProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />
        <Route Component={AdminDashboard} path="dashboard/" />
      </Routes>
    </AuthProvider>
  );
};
function App() {
  const Homepage = () => {
    return (
      <Routes>
        <Route Component={Home} path="*" />
      </Routes>
    );
  };
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={Homepage} path="*" />
          {/*aqui va el home de color lucy, cambiar por el componente HolaC*/}
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<ShoppingCar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
