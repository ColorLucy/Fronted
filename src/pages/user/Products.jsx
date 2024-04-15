import React, { useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import NavigationBar from "../../components/NavigationBar";
import WhatsApp from "../../components/WhatsApp"; 
import InfoBar from "./InfoBar";
import "./products.css";

function Products() {
  const commerce = new Commerce(
    "pk_5672597a83b6b6dc1f2710eab13845691c6bbfade188b"
  );

  const [productos, setProductos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data: products } = await commerce.products.list({
          category_slug: selectedCategory,
        });
        setProductos(products);
        setLoading(false);
        console.log("Productos:", products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="productsPage">
      {/* <NavigationBar onSelectCategory={setSelectedCategory} /> */}
      <h5 style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px"}}>Productos</h5>
      <div className="productsContainer">
        {loading ? (
          <p>Cargando productos...</p>
        ) : !productos ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} className="productItem">
              <div className="productContent">
                <img src={producto.image.url} alt={producto.name} />
                <h6>{producto.name}</h6>
                <p>${producto.price.formatted}</p>
              </div>
              <div className="productButtons">
                <button className="buttonAddCar">AÑADIR AL CARRITO</button>
                <button className="buttonOrder">ORDENAR VÍA WHATSAPP</button>
              </div>
            </div>
          ))
        )}
      </div>
      <WhatsApp />
      <InfoBar />
    </div>
  );
}

export default Products;

