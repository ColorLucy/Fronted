import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import InfoBar from "../../components/InfoBar";
import ProductCard from "../../components/ProductCard";
import WhatsApp from "../../components/WhatsApp";
import "./products.css";

function Products() {
  const [productos, setProductos] = useState([]);
  const [pagesProducts, setPagesProducts] = useState({});
  const [pagesCount, setPagesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { categoria } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (categoria) {
          const { data } = await axios.get(`http://127.0.0.1:8000/products/detalles-por-categoria/${categoria}/`);
          setProductos(data.results);
        } else {
          const { data } = await axios.get(`http://localhost:8000/products/product-details/?page=${page}`);
          setProductos(data.results);
          setPagesProducts({ ...pagesProducts, [page]: data.results });
          setPagesCount(Math.ceil(data.count / 20))
        }


      } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
      }
      setLoading(false);
    };
    if (!pagesProducts.hasOwnProperty(page)) {
      fetchData();
    } else {
      setProductos(pagesProducts[page]);
    }

  }, [categoria, page]);

  return (
    <div className="productsPage">
      <h5 style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px" }}>Productos</h5>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
        <div className="productsContainer">
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress style={{ margin: "100px" }} />
              <p>Cargando productos...</p>
            </div>
          ) : !productos ? (
            <p>No hay productos en esta categoría.</p>
          ) : (
            productos.map((producto, index) => (
              <div key={index} className="productItem">
                <ProductCard product={producto} key={producto.id} />
              </div>
            ))
          )}
        </div>
        <Pagination
          page={page}
          count={pagesCount}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/productos${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </div>

      <WhatsApp />
      <InfoBar />
    </div>
  );
}

export default Products;