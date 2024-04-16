import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AboutUs from "./pages/user/AboutUs";
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import ShoppingCar from "./pages/user/ShoppingCar";

/**
 * Vista del admin
 */
const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />
        <Route Component={AdminDashboard} path="/" />
      </Routes>
    </AuthProvider>
  );
};

/**
 * Vista del cliente
 * @returns
 */
const Homepage = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<ShoppingCar />} />
        <Route Component={Home} path="/" />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Component={Admin} path="/admin/*" />
          <Route Component={Homepage} path="*" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
