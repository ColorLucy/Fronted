import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AboutUs from "./pages/user/AboutUs";
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import EditCard from "./pages/admin/EditCard";
import AddCard from "./pages/admin/AddCard";
import Orders from "./pages/admin/Orders";
import Product from "./pages/user/Product";
import HomeEdit from "./pages/admin/HomeEdit";
import InfoBar from "./components/InfoBar";
import WhatsApp from "./components/WhatsApp";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";

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
        <Route Component={HomeEdit} path="/home/edit" />
        <Route Component={AdminDashboard} path="/" />
        <Route Component={Orders} path="/orders" />
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
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/registro" element={<SignUp />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:info_producto" element={<Product />} />
          <Route path="/productos/:searchTerm" element={<Product />} />
          <Route Component={Home} path="/" />
        </Routes>
      </CartProvider>
      <InfoBar />
      <WhatsApp />
    </>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="App">
        <Router>
          <Routes>
            <Route Component={Admin} path="/admin/*" />
            <Route Component={Homepage} path="*" />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
