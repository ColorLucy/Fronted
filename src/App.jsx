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
import EditCard from "./pages/admin/EditCard";
import AddCard from "./pages/admin/AddCard";
import Orders from "./pages/admin/Orders";
import Product from "./pages/user/Product";
import InfoBar from "./components/InfoBar";
import { CartProvider } from "./context/CartContext";

/**
 * Vista del admin
 */
const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />
        <Route Component={AddCard} path="add-product/" />
        <Route Component={EditCard} path="edit/:id_product" /> 
        <Route Component={AdminDashboard} path="/" />
        <Route Component={Orders} path="/orders"/>
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
      <CartProvider>
        <NavigationBar />
        
        <Routes>
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:info_producto" element={<Product />} />
          <Route path="/productos/:searchTerm" element={<Product />} />
          {/* <Route path="/carrito" element={<ShoppingCar />} /> */}
          <Route Component={Home} path="/" />
        </Routes>
      </CartProvider>

      <InfoBar />
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
