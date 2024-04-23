import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Bread_crumb = ({ categoria }) => {
  return (<Breadcrumbs
    separator={<NavigateNextIcon fontSize="small" />}
    aria-label="breadcrumb"
  >
    <Link underline="hover" key="1" color="inherit" href="/productos" >
      Productos
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/productos/?categoria=${categoria.id_categoria}`}
    >
      {categoria.nombre}
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  </Breadcrumbs>)
}
const breadcrumbs = [

];
const Product = () => {
  let { id_producto } = useParams();
  const [product, setProduct] = useState({
    categoria: { nombre: "", id_categoria: null },
    descripcion: " ",
    detalles: [{
      color: "",
      id_detalle: null,
      imagenes: [],
      nombre: "",
      precio: null,
      unidad: ""
    }],
    fabricante: "",
    id_producto: null
  })
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/products/product-details/${id_producto}/`)
        setProduct(data)
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchProducto()
  }, [id_producto])
  return (
    <>
      {
        product.id_producto ? (
          <Bread_crumb categoria={product.categoria} />) :
          (<div>Product {id_producto}</div>)
      }
    </>



  )
}

export default Product