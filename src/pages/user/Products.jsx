import { CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import ProductCard from "../../components/ProductCard";
import Typography from '@mui/material/Typography';
import { motion } from "framer-motion";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import "./products.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const container = {
  hidden: { opacity: 1, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1
    }
  }
};
const item = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function Products() {
  const [productos, setProductos] = useState([]);
  const [pagesProducts, setPagesProducts] = useState({});
  const [pagesCount, setPagesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  let fetchAllProducts = query.get('fetchAll') === "true";
  let categoria = parseInt(query.get('categoriaId') || 0, 10);
  const [categoriaName, setCategoriaName] = useState(decodeURIComponent(query.get('categoriaName')))
  const searchTerm = query.get('q');

  useEffect(() => {
    let bandera = false;
    fetchAllProducts = query.get('fetchAll') === "true";
    const fetchData = async () => {
      setLoading(true);
      setPagesCount(0);
      setCategoriaName(decodeURIComponent(query.get('categoriaName')))
      try {
        let url;
        if (categoria !== 0) {
          url = `https://colorlucyserver.onrender.com/products/detalles-por-categoria/${categoria}/?page=${page}`;
        } else if (searchTerm) {
          url = `https://colorlucyserver.onrender.com/products/search/?q=${searchTerm}&page=${page}`;
        } else {
          url = `https://colorlucyserver.onrender.com/products/product-details/?page=${page}`;
        }
        const { data } = await axios.get(url);
        setProductos(data.results);
        setPagesProducts({ ...pagesProducts, [page]: data.results });
        setPagesCount(Math.ceil(data.count / 20));
        if (data.results.length) {
          setCategoriaName(data.results[0].categoria.nombre)
        }
        bandera = true;
      } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
      }
      setLoading(false);
    };
    console.log(!pagesProducts.hasOwnProperty(page), (categoria !== 0 && !bandera), fetchAllProducts)
    if (!pagesProducts.hasOwnProperty(page) || (categoria !== 0 && !bandera) || fetchAllProducts) {
      fetchData();
    }
    else {
      setProductos(pagesProducts[page]);
    };
  }, [categoria, page, searchTerm]);
  const Bread_crumb = ({ categoria }) => {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >=
        <Link underline="hover" key="1" style={{ textDecoration: "none", color: "GrayText" }} to='?fetchAll=true' >
          PRODUCTOS
        </Link>
        <Typography key="3" color="text.primary">
          {categoria}
        </Typography>
      </Breadcrumbs>
    )
  }
  return (
    <div className="productsPage">
      {categoria !== 0 ? <Bread_crumb categoria={categoriaName} /> : <Typography key="3" color="text.primary">PRODUCTOS</Typography>}
      <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: "10px" }}>

        {loading ? (
          <div className="productsContainer">
            <div style={{ textAlign: "center" }}>
              <CircularProgress style={{ margin: "100px" }} />
              <p>Cargando productos...</p>
            </div>
          </div>
        ) : !productos ? (
          <div className="productsContainer">
            <p>No hay productos en esta categoría.</p>
          </div>
        ) : (
          <motion.div className="productsContainer"
            initial="hidden"
            animate="visible"
            variants={container}>
            {productos.map((producto, index) => (
              <motion.div key={index} className="productItem" custom={index}
                animate="visible" variants={item}>
                <ProductCard product={producto} key={producto.id} />
              </motion.div>
            ))}
          </motion.div>
        )}

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
    </div>
  );
}

export default Products;