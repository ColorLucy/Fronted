import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import InfoBar from "../../components/InfoBar";
import ProductCard from "../../components/ProductCard";
import WhatsApp from "../../components/WhatsApp";
import "./products.css";

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoria } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (categoria) {
          response = await axios.get("http://127.0.0.1:8000/products/detalles-por-categoria/${categoria}/");
        } else {
          response = await axios.get('http://localhost:8000/products/view-details-products/');
        }
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [categoria]);

  return (
    <div className="productsPage">
      {/* <NavigationBar onSelectCategory={setSelectedCategory} /> */}
      <h5 style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px" }}>Productos</h5>
      <div className="productsContainer">
        {loading ? (
          <p>Cargando productos...</p>
        ) : !productos ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          productos.map((producto, index) => (
            <div key={index} className="productItem">
              <ProductCard product={producto} key={producto.id}/>
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