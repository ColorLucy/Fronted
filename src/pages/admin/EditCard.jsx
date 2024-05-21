import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { CircularProgress, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "./ImagesSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { deleteProduct, getCategories, getProduct, updateProduct } from "../../utils/crudProducts";
import AddImage from "./addImage";

/**
 * Manages RUD operations for editing and deleting products, and CRUD for adding/removing details and images.
 * This function encapsulates all product editing functionality.
 * 
 * @description This function handles various operations related to products, details and images. Orchestra 
 * User interface interactions and backend API communications for editing product information, managing details and handling images.
 * 
 * @returns {JSX.Element} A JSX element that permits manipulate products data 
 */
const EditCard = () => {
  const navigate = useNavigate();
  const { id_product } = useParams();
  const [autoPlay, setAutoPlay] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isThereProduct, setIsThereProduct] = useState(false)
  const [details, setDetails] = useState([]);
  const [numberDetail, setNumberDetail] = useState(0);
  const [detailImagesInterface, setDetailImagesInterface] = useState([]);
  const [detailImagesSaved, setDetailImagesSaved] = useState([]);
  const [showAddImageTarget, setShowAddImageTarget] = useState(false);
  const [showAddDetailButton, setShowAddDetailButton] = useState(true);
  const [currentDetailId, setCurrentDetailId] = useState();
  const [focus, setFocus] = useState({ nombre: false, precio: false, unidad: false, color: false })
  const [productData, setProductData] = useState({
    nombre: "",
    fabricante: "",
    descripcion: "",
    categoria: "",
  });

  const [newDetail, setNewDetail] = useState({
    nombre: "NUEVO DETALLE",
    precio: "",
    unidad: "",
    color: "",
    producto: id_product,
  })

  const handleCategory = (e) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      categoria: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeDetail = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "precio" && isNaN(Number(value))) {
      alert("El precio debe ser valor numérico");
      return;
    }
    let updatedDetails = [...details]
    updatedDetails[numberDetail][name] = value;
    setDetails(updatedDetails);
    setFocus({ ...focus, [name]: true })
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    setShowAddImageTarget(true);
  };

  const handleImageUrlClou = (imgUrl) => {
    const imgToSave = {
      url: imgUrl,
      detalle: currentDetailId,
    };
    setDetailImagesSaved((prevImages) => [...prevImages, imgToSave]);
    setDetailImagesInterface((prevImages) => [...prevImages, imgToSave]);
  };

  const handleCloseUrlClou = () => {
    setShowAddImageTarget(false);
  };

  const handleRemoveImage = (index, e) => {
    const removedImage = detailImagesInterface[index];
    const updatedImagesInterface = [...detailImagesInterface];
    updatedImagesInterface.splice(index, 1);
    setDetailImagesInterface(updatedImagesInterface);
    const updatedImagesSaved = detailImagesSaved.filter(
      (img) => img.id_imagen !== removedImage.id_imagen
    );
    setDetailImagesSaved(updatedImagesSaved);
  };

  const handleAddDetail = () => {
    setShowAddDetailButton(false)
    setDetails(prevDetails => [...prevDetails, newDetail]);
  };

  const handleRemoveDetail = (id, e) => {
    e.preventDefault()
    const updatedDetails = details.filter((detail) => detail.id_detalle !== id);
    const updatedImages = detailImagesSaved.filter((img) => img.detalle !== id);
    setDetails(updatedDetails);
    setDetailImagesSaved(updatedImages);
    setShowAddDetailButton(true)
    alert("El detalle ha sido quitado")
  };

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

  const handleCancel = () => {
    navigate("/admin/");
  };

  /**
   * handles the retrieval of data from an existing product in the database
   * sending a GET request to the server
   * @param {Event} e - the event from the form that triggers the function
   */
  async function fetchData(id_product) {
    const responseData = await getProduct(id_product);
    const firstDetail = responseData.details.length > 0 ? responseData.details[0] : {};
    setProductData({
      nombre: responseData.product.nombre,
      fabricante: responseData.product.fabricante,
      descripcion: responseData.product.descripcion,
      categoria: responseData.product.categoria,
    });
    setDetails(responseData.details);
    setCurrentDetailId(firstDetail.id_detalle);
    setDetailImagesSaved(responseData.images);

    let imgData = [];
    responseData.images.forEach((img) => {
      if (img.detalle === firstDetail.id_detalle) {
        imgData.push(img);
      }
      setDetailImagesInterface(imgData);
    });
    setIsThereProduct(true)
  }

  /**
   * handles the update of an existing product by sending a PUT request to the server
   * @param id from product to delete
   * @param {Event} e - the event from the form or button click that triggers the function
   */
  async function handleUpdate(e) {
    e.preventDefault();
    const data = {
      producto: productData,
      detalles: details,
      imagenes: detailImagesSaved,
    };
    const response = await updateProduct(id_product, data);
    if (!response) {
      alert("El producto ha sido actualizado correctamente.");
    } else {
      alert("La actualización del producto ha fallado, vuelve a intentarlo.");
    }
    setNewDetail({
      nombre: "NUEVO DETALLE",
      precio: "",
      unidad: "",
      color: "",
      producto: id_product,
    })
    setShowAddDetailButton(true)
  }

  /**
   * handles the deletion of an existing product by sending a DELETE request to the server
   * @param {Event} e - the event from the button click or form submission that triggers the function
   */
  async function handleDelete(e) {
    e.preventDefault();
    let ok = confirm("¿Confirmas la eliminación del producto?");
    if (ok) {
      const response = await deleteProduct(id_product);
      if (!response) {
        alert("El producto ha sido eliminado exitosamente");
        navigate("/admin/");
        cleanTextFields();
      } else {
        alert("Producto no eliminado, vuelve a intentarlo");
      }
    }
  }

  /**
   * handles the retrieval of all categories and the interaction with details-images data
   */
  useEffect(() => {
    fetchData(id_product);
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
    setDetailImagesInterface(getDetailImages(details[newIndex].id_detalle));
    setNumberDetail(newIndex);
    setCurrentDetailId(details[newIndex].id_detalle);
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
    >
      <form onSubmit={handleUpdate}>
        <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h5" component="div" gutterBottom>
            Producto
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={productData.nombre}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Fabricante"
            name="fabricante"
            value={productData.fabricante}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={productData.descripcion ? productData.descripcion : ""}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <InputLabel id="Categoria">Categoría del producto</InputLabel>
          <Select
            fullWidth
            labelId="Categoria"
            id="demo-simple-select"
            value={productData.categoria}
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
        </Grid>
        <Grid container spacing={2} direction={"row"} justifyContent={"center"} alignItems={"center"} >
            <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }} >
              {showAddDetailButton && (
                <IconButton aria-label="add" onClick={handleAddDetail}>
                  <AddCircleIcon />
                </IconButton>
              )}
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={numberDetail}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {details.map((detail, index) => {
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
            <Grid item xs={10} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }} >
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {details.map((detail, index) => {
                    return (
                      <TabPanel key={index} value={numberDetail} index={index} >
                        <TextField
                          fullWidth
                          label="Nombre"
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
                          label="Precio"
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
                          label="Cantidad"
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
                        <div>
                          {!showAddImageTarget && (
                            <div>
                              <Button variant="outlined" color="error" onClick={(e) => handleRemoveDetail(currentDetailId, e)} size="small" >
                                Eliminar este detalle
                              </Button>
                            </div>
                          )}
                        </div>
                      </TabPanel>
                    );
                  })}
                </Grid>
                <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }} >
                  <div style={{ width: "100%", height: "100%", marginBottom: "5px", }} >
                    {detailImagesInterface.length > 0 ? (
                      <CustomCarousel autoPlay={autoPlay} onImageChange={handleImageChange} >
                        {detailImagesInterface.map((image, index) => (
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
                        <div>No hay imágenes para mostrar</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {!showAddImageTarget && (
                      <div>
                        <IconButton aria-label="add" onClick={(e) => handleAddImage(e)} >
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={(e) => handleRemoveImage(selectedImageIndex, e)} >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                    {showAddImageTarget && (
                      <AddImage imageUploadedClou={handleImageUrlClou} onClose={handleCloseUrlClou} />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </form>
      <div
        style={{ marginTop: "55px", display: "flex", justifyContent: "space-between", alignItems: "center", }} >
        <div>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Guardar cambios
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} style={{ marginLeft: "8px" }} >
            Eliminar producto
          </Button>
        </div>
        <Button variant="text" color="inherit" onClick={handleCancel} endIcon={<ReplyIcon />} style={{ marginLeft: "8px" }} >
          Volver
        </Button>
      </div>
    </Box>
  );
};

export default EditCard;