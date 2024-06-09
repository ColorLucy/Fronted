import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {Alert, CircularProgress, Grid, Paper, Snackbar, InputLabel, Switch, FormControlLabel} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getCategories, getProduct, postProduct, updateProduct } from "../../utils/crudProducts";
import Product from "../user/Product";
import CustomCarousel from "./ImagesSlider";
import { all } from "axios";

/**
 * Manages CRUD operations for editing and deleting products, and CRUD for adding/removing details and images.
 * This function encapsulates all product editing functionality.
 *
 * @description This function handles various operations related to products, details and images. Orchestra
 * User interface interactions and backend API communications for editing product information, managing details and handling images.
 *
 * @returns {JSX.Element} A JSX element that permits manipulate products data
 */
const ModifyProductCard = ({ modifyTitle, setModifyProduct }) => {
  const navigate = useNavigate();
  const { id_product } = useParams();
  const [autoPlay, setAutoPlay] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [numberDetail, setNumberDetail] = useState(0);
  const [detailImagesInterface, setDetailImagesInterface] = useState([]);
  const [detailImagesSaved, setDetailImagesSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Cargando Producto...");
  const [currentDetailId, setCurrentDetailId] = useState();
  const [focus, setFocus] = useState({ nombre: false, precio: false, unidad: false, color: false })
  const [product, setProduct] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverety] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [newDetail, setNewDetail] = useState({
    nombre: "",
    precio: "",
    unidad: "",
    color: "",
    producto: id_product,
  })

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleAvailabilityChange = (event, id_detalle) => {
    setIsAvailable(false)
    setProduct(product => {
      let detallesAct = product.detalles
      detallesAct.find(detalle=>detalle.id_detalle === id_detalle).disponible=event.target.checked
      return {...product, detalles: detallesAct}})
    setIsAvailable(true)

  };

  const handleCategory = (e) => {
    const { value } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      categoria: categories.find(category => category.id_categoria === value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const handleInputChangeDetail = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "precio" && isNaN(Number(value))) {
      setAlertSeverety("error")
      setAlertMessage("El precio debe ser valor numérico")
      setOpenAlert(true)
      return;
    }
    setFocus({ ...focus, [name]: true })
    setProduct(prev => {
      prev.detalles = prev.detalles.map((detalle, index) =>
        index === numberDetail ? { ...detalle, [name]: value } : detalle)
      return prev
    })
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleImageUrlClou = (imgUrl) => {
    const imgToSave = id_product ?
      { url: imgUrl, detalle: '' } :
      { url: imgUrl, detalle: null };
    setProduct(prev => {
      const updatedDetalles = prev.detalles.map((detalle, index) =>
        index === numberDetail ? { ...detalle, imagenes: [...detalle.imagenes, imgToSave]} : detalle );
      return { ...prev, detalles: updatedDetalles }
    })
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', import.meta.env.VITE_CLOUDINARY_FOLDER);
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_KEY);

    try {
      const response = await fetch(
        import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      const imgUrl = data.url;
      handleImageUrlClou(imgUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }

  const handleRemoveImage = (index, e) => {
    const removedImage = detailImagesInterface[index];

    const updatedImagesInterface = [...detailImagesInterface];
    updatedImagesInterface.splice(index, 1);
    setDetailImagesInterface(updatedImagesInterface);

    setProduct(prev => {
      const updatedDetalles = prev.detalles.map((detalle, index) => {
        if (index === numberDetail) {
          const updatedImagenes = detalle.imagenes.filter(
            (img) => img.url !== removedImage.url
          );
          return { ...detalle, imagenes: updatedImagenes };
        }
        return detalle;
      });
      return { ...prev, detalles: updatedDetalles };
    });
  };

  const handleAddDetail = (e) => {
    e.preventDefault()
    const idxNewDetail = product.detalles.length
    const newDetailItem = {
      nombre: "",
      precio: "",
      unidad: "",
      color: "",
      producto: id_product,
      id_detalle: null,
      imagenes: []
    };
    setProduct((prev) => ({
      ...prev,
      detalles: [...prev.detalles, newDetailItem]
    }));
    setNumberDetail(idxNewDetail)
  };

  const handleRemoveDetail = (id, e) => {
    e.preventDefault()
    const updatedDetails = product.detalles.filter((detail) => detail.id_detalle !== id);
    setProduct((prev) => ({
      ...prev,
      detalles: [...updatedDetails]
    }));

    numberDetail > 0 ? changeDetailIndex(numberDetail-1) :
      alert("El detalle ha sido quitado")

    setAlertSeverety("info")
    setAlertMessage("El detalle ha sido quitado")
    setOpenAlert(true)
  };

  const handleReviewEmptySpaces = () => {
    let response = true
    if (!product.nombre || !product.fabricante || !product.categoria) {
      alert('Por favor, completa los campos obligatorios que contienen "*"');
      response = false;
    }

    product.detalles.forEach((detail) => {
      if (!detail.nombre || !detail.precio || !detail.unidad) {
        alert('Por favor, completa los campos obligatorios que contienen "*" para todos los detalles');
        response = false;
      }
    });
    return response
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

  /**
   * handles the retrieval of data from an existing product in the database
   * sending a GET request to the server
   * @param {Event} e - the event from the form that triggers the function
   */
  async function fetchData(id_product) {
    const allResponseData = await getProduct(id_product);
    console.log(allResponseData)
    let  responseData= JSON.parse(JSON.stringify(allResponseData))
    const firstDetail = responseData.detalles.length > 0 ? responseData.detalles[0] : {};

    let images = [];
    responseData.detalles.forEach((detail) => {
      images = images.concat(detail.imagenes);
    })
    setDetailImagesSaved(images);

    let imgData = [];
    images.forEach((img) => {
      if (img.detalle === firstDetail.id_detalle) {
        imgData.push(img);
      }
    });
    setDetailImagesInterface(imgData);

    responseData.detalles.forEach(detail => {
      if (detail.imagenes) {
        delete detail.imagenes;
      }
    })

    setCurrentDetailId(firstDetail.id_detalle);
    setNewDetail({
      nombre: "",
      precio: "",
      unidad: "",
      color: "",
      producto: id_product,
    })
    setProduct(allResponseData)
  }

  /**
   * handles the update of an existing product by sending a PUT request to the server
   * @param id from product to delete
   * @param {Event} e - the event from the form or button click that triggers the function
   */
  async function handleUpdate() {
    let makeUpdate = handleReviewEmptySpaces()

    if (makeUpdate === true) {
      setLoading(true)
      setLoadingMessage("Actualizando el producto...")
      const response = await updateProduct(id_product, product);
      setLoading(false)

      if (!response) {
        setAlertSeverety("success")
        setAlertMessage("El producto ha sido actualizado correctamente.")
      } else {
        setAlertSeverety("error")
        setAlertMessage("La actualización del producto ha fallado, vuelve a intentarlo.")
      }
      setOpenAlert(true)
      setNewDetail({
        nombre: "",
        precio: "",
        unidad: "",
        color: "",
        producto: id_product,
      })
    }
  }

  /**
   * handles the deletion of an existing product by sending a DELETE request to the server
   * @param {Event} e - the event from the button click or form submission that triggers the function
   */
  async function handleDelete() {
    let ok = confirm("¿Confirmas la eliminación del producto?");

    if (ok) {
      setLoading(true)
      setLoadingMessage("Eliminando el producto...")
      setOpenAlert(true)
      const response = await deleteProduct(id_product);
      setLoading(false)
      if (!response) {
        setAlertSeverety("info")
        setAlertMessage("El producto ha sido eliminado exitosamente")
        setTimeout(() => navigate("/admin/"), "3000");
        cleanTextFields();
      } else {
        setAlertSeverety("error")
        setAlertMessage("Producto no eliminado, vuelve a intentarlo")
      }
    }
  }
  /**
   * handles the creation of a product by sending a POST request to the server
   * @param {Event} e - the event from the form or button click that triggers the function
   */
  async function handleCreate() {
    let makeCreation = handleReviewEmptySpaces()

    if (makeCreation === true) {
      setLoading(true)
      setLoadingMessage("Creando el producto...")
      const response = await postProduct(product);
      setLoading(false)
      if (response) {
        setAlertSeverety("success")
        setAlertMessage("El producto ha sido creado correctamente.")
      } else {
        setAlertSeverety("error")
        setAlertMessage("La creación del producto ha fallado, vuelve a intentarlo.")
      }
      setOpenAlert(true)
      setNewDetail({
        nombre: "",
        precio: "",
        unidad: "",
        color: "",
      })
      setTimeout(() => navigate("/admin/"), "3000");
    }
  }

  useEffect(() => {
    setModifyProduct({
      update: handleUpdate,
      delete: handleDelete,
      create: handleCreate
    })
  }, [product])

  /**
   * handles the retrieval of all categories and the interaction with details-images data
   */
  useEffect(() => {
    if (id_product) {
      fetchData(id_product)
      modifyTitle("Editar Producto")
    }
    else {
      setProduct({
        detalles: [{
          nombre: "",
          precio: "",
          unidad: "",
          color: "",
          imagenes: []
        }],
        categoria: {}
      })
      modifyTitle("Añadir Producto")
    }
    fetchCategories();
  }, [id_product]);

  async function fetchCategories() {
    const response = await getCategories();
    setCategories(response);
  }

  const getDetailImages = (detail_id) => {
    let imgData = [];
    detailImagesSaved.forEach((img) => {
      if (img.detalle === detail_id) {
        imgData.push(img);
      }
    });
    return imgData;
  };

  const changeDetailIndex = (newIndex) => {
    setDetailImagesInterface(getDetailImages(product.detalles[newIndex].id_detalle));
    setNumberDetail(newIndex);
    setCurrentDetailId(product.detalles[newIndex].id_detalle);
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  if (!product || loading) {
    return (
      <div style={{ textAlign: "center", height: "calc(100dvh - 180px)" }}>
        <CircularProgress style={{ margin: "100px" }} />
        <Typography>
          {loadingMessage}
        </Typography>
      </div>
    );
  }
  const handleCloseOpenAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: "20px" }}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseOpenAlert}>
        <Alert
          onClose={handleCloseOpenAlert}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid item sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", maxWidth: "600px", width: "40%" }}>
        <Paper elevation={4} square={false} sx={{ display: "flex", flexDirection: "column", padding: "20px", width: "100%" }}>
          <TextField
            fullWidth
            label="Nombre del Producto*"
            name="nombre"
            value={product.nombre}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Fabricante*"
            name="fabricante"
            value={product.fabricante}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={product.descripcion ? product.descripcion : ""}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          {/*<InputLabel id="Categoria" style={{marginLeft: '15px'}}>Categoría*</InputLabel>*/}
          <Select
            fullWidth
            labelId="Categoria"
            id="demo-simple-select"
            value={product.categoria.id_categoria}
            onChange={handleCategory}
            sx={{ marginBottom: 2 }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id_categoria}
                value={category.id_categoria}
              >
                {category.nombre} (id {category.id_categoria})
              </MenuItem>
            ))}
          </Select>
        </Paper>
        <Paper elevation={4} square={false} sx={{ gap: "20px", display: "flex", flexDirection: "column", width: "100%", }}>
          <Grid item xs={2} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", overflowX: "auto" }} >
            <IconButton onClick={handleAddDetail}>
              <AddCircleIcon />
            </IconButton>
            <Tabs
              orientation="horizontal"
              variant="scrollable"
              value={numberDetail}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              {product.detalles.map((detail, index) => {
                return (
                  <Tab
                    key={index}
                    label={detail.nombre}
                    {...a11yProps(index)}
                    onClick={(e) => { changeDetailIndex(index); }}
                  />
                );
              })}
            </Tabs>
          </Grid>
          <Grid container direction={"column"} spacing={2} padding={"16px"} alignItems={"center"}>
            <Grid item xs sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              {isAvailable && product.detalles.map((detail, index) => {
                return (
                  <TabPanel key={index} value={numberDetail} index={index} >
                    <TextField
                      fullWidth
                      label="Nombre del Detalle*"
                      name="nombre"
                      onClick={() => setFocus({ nombre: true, precio: false, unidad: false, color: false })}
                      value={detail.nombre}
                      autoFocus={focus.nombre}
                      onBlur={() => setFocus({ ...focus, nombre: false })}
                      onChange={handleInputChangeDetail}
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Precio*"
                      name="precio"
                      onClick={() => setFocus({ nombre: false, precio: true, unidad: false, color: false })}
                      value={detail.precio}
                      autoFocus={focus.precio}
                      onBlur={() => setFocus({ ...focus, precio: false })}
                      onChange={handleInputChangeDetail}
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Presentación*"
                      name="unidad"
                      value={detail.unidad}
                      autoFocus={focus.unidad}
                      onBlur={() => setFocus({ ...focus, unidad: false })}
                      onChange={handleInputChangeDetail}
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Color"
                      name="color"
                      value={detail.color}
                      autoFocus={focus.color}
                      onBlur={() => setFocus({ ...focus, color: false })}
                      onChange={handleInputChangeDetail}
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={detail.disponible}
                          onChange={(e)=>handleAvailabilityChange(e,detail.id_detalle)}
                          name="available"
                          color="primary"
                        />
                      }
                      label="Producto disponible"
                    />
                  </TabPanel>
                );
              })}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="outlined" color="error" onClick={(e) => product.detalles.length > 1 ? handleRemoveDetail(currentDetailId, e) : alert("El producto debe tener al menos un detalle")} size="small">
                  Eliminar este detalle
                </Button>
              </Box>
            </Grid>

            <Grid item sx={{ width: "330px", height: "390px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              {product.detalles[numberDetail].imagenes.length > 0 ? (
                <CustomCarousel autoPlay={autoPlay} onImageChange={handleImageChange} >
                  {product.detalles[numberDetail].imagenes.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Product Image ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </CustomCarousel>
              ) : (
                <div style={{ width: "100%", height: "100%", border: "1px dashed #ccc", display: "flex", alignItems: "center", justifyContent: "center", }} >
                  <div>El detalle actual no contiene  imágenes</div>
                </div>
              )}
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "330px" }}>
                <IconButton aria-label="add" component="label">
                  <AddCircleIcon />
                  <VisuallyHiddenInput type="file" onChange={handleSubmitImage} />
                </IconButton>
                <IconButton aria-label="delete" onClick={(e) => handleRemoveImage(selectedImageIndex, e)} >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item width={"100%"}>
        <Product productData={product} detailId={numberDetail} />
      </Grid>
    </Box>
  );
};

export default ModifyProductCard;
