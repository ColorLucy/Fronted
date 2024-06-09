import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import InfoBar from "./components/InfoBar";
import NavigationBar from "./components/NavigationBar";
import WhatsApp from "./components/WhatsApp";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import HomeEdit from "./pages/admin/HomeEdit";
import Notifications from "./pages/admin/Notifications";
import ModifyProductCard from "./pages/admin/ModifyProductCard";
import Orders from "./pages/admin/Orders";
import OrderDetail from "./pages/admin/OrderDetail";
import ProductDashboard from "./pages/admin/ProductDashboard";
import AboutUs from "./pages/user/AboutUs";
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import Pqrs from "./pages/user/Pqrs";
import Order from "./pages/user/Order";
import Product from "./pages/user/Product";
import Products from "./pages/user/Products";
import Profile from "./pages/user/Profile";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";

/**
 * Vista del admin
 */
const Admin = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route
            Component={() => (
              <AdminDashboard>
                <ModifyProductCard />
              </AdminDashboard>
            )}
            path="add-product/"
          />
          <Route
            Component={() => (
              <AdminDashboard>
                <ModifyProductCard />
              </AdminDashboard>
            )}
            path="product/edit/:id_product"
          />
          <Route
            Component={() => (
              <AdminDashboard>
                <OrderDetail />
              </AdminDashboard>
            )}
            path="order/view/:id_order"
          />
        </Routes>
      </CartProvider>
      <Routes>
        <Route Component={AdminLogin} path="login/" />
        <Route
          Component={() => (
            <AdminDashboard>
              <HomeEdit />
            </AdminDashboard>
          )}
          path="/home/edit"
        />
        <Route
          Component={() => (
            <AdminDashboard>
              <ProductDashboard />
            </AdminDashboard>
          )}
          path="products"
        />
        <Route
          Component={() => (
            <AdminDashboard>
              <Orders />
            </AdminDashboard>
          )}
          path="orders/"
        />
        <Route
          Component={() => (
            <AdminDashboard>
              <Notifications />
            </AdminDashboard>
          )}
          path="notifications"
        />
        <Route
          Component={() => <Navigate replace to="/admin/products" />}
          path="/"
        />
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
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/pqrs-colorlucy" element={<Pqrs />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/registro" element={<SignUp />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:info_producto" element={<Product />} />
          <Route path="/productos/:searchTerm" element={<Product />} />
          <Route path="/pedido" element={<Order />} />
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
