import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import ReplyIcon from '@mui/icons-material/Reply';
import { Grid } from "@mui/material";
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
const EditCard = () => {
  const navigate = useNavigate();
  const { id_product } = useParams();
  const [autoPlay, setAutoPlay] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);  
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState([]);
  const [numberDetail, setNumberDetail] = useState(0);
  const [detailImagesInterface, setDetailImagesInterface] = useState([]);
  const [detailImagesSaved, setDetailImagesSaved] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [requestData, setRequestData] = useState();
  const [showAddImageTarget, setShowAddImageTarget] = useState(false);
  const [currentDetailId, setCurrentDetailId] = useState();
  const [productData, setProductData] = useState({
    nombre: "",
    fabricante: "",
    descripcion: "",
    categoria: "",
  });
  const [detailData, setDetailData] = useState({
    id_detalle: "",
    nombre: "",
    precio: "",
    unidad: "",
    color: "",
    producto: "",
  });

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
    console.log(productData)
    console.log("actualizados", details)
    //console.log(detailImagesInterface) 
    console.log(detailImagesSaved) 
  };

  const handleInputChangeDetail = (index, event) => {
    const { name, value } = event.target;
    const newDetails = [...details];
    newDetails[index][name] = value;
    setDetails(newDetails);
    setDetailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      detalle: currentDetailId
    }
    setDetailImagesSaved((prevImages) => [...prevImages, imgToSave]);
    setDetailImagesInterface((prevImages) => [...prevImages, imgToSave]);
  }

  const handleCloseUrlClou = () => {
    setShowAddImageTarget(false);
  }

  const handleRemoveImage = (index, event) => {
    const removedImage = detailImagesInterface[index]
    const updatedImagesInterface = [...detailImagesInterface];
    updatedImagesInterface.splice(index, 1);
    setDetailImagesInterface(updatedImagesInterface);
    const updatedImagesSaved = detailImagesSaved.filter((img) => img.id_imagen !== removedImage.id_imagen);
    setDetailImagesSaved(updatedImagesSaved)
  };

  const handleAddDetail = () => { //doing
    console.log("Detalle", detailData); 
    console.log("Detalle img interface", detailImagesInterface); 
    console.log("Detalle img guardada", detailImagesSaved);
    cleanTextFields()
  }

  const handleRemoveDetail = (id) => {
    const updatedDetails = details.filter((detail) => detail.id_detalle !== id)
    const updatedImages = detailImagesSaved.filter((img) => img.detalle !== id)
    setDetails(updatedDetails);
    setDetailImagesSaved(updatedImages);
    alert("El detalle ha sido quitado")
  }
  
  function cleanTextFields() {
    setDetailData({
      id_detalle: "",
      nombre: "",
      precio: "",
      unidad: "",
      color: "",
      producto: "",
      });
    setDetailImagesInterface([]);
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
        {value === index && (
          <div>
            {children}
          </div>         
        )}
      </div>
    );
  }

  function createDataRequest() { 
    const imagesData = uploadImages.map((imageUrl) => ({ url: imageUrl }));
    setRequestData({
      producto: {
        fabricante: productData.fabricante,
        descripcion: productData.descripcion,
        categoria: parseInt(productData.categoria),
      },
      detalles: [
        {
          nombre: productData.nombre,
          precio: parseFloat(productData.precio),
          unidad: productData.unidad,
          color: productData.color,
        },
      ],
      imagenes: imagesData,
    });
  }

  function updateDataRequest() { 
    const imagesToSave = productImagesTemp.map((image) => ({...(
      image.id ? { id_imagen: image.id } : {}),
      url: image.url,
      detalle: image.detalle,
    }));
    setRequestData({
      producto: productData,
      detalles: details,
      imagenes: detailImagesSaved
    });
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
    const responseData = await getProduct(id_product)
    const firstDetail = responseData.details.length > 0 ? responseData.details[0] : {};
    setProductData({
      nombre: responseData.product.nombre,
      fabricante: responseData.product.fabricante,
      descripcion: responseData.product.descripcion,
      categoria: responseData.product.categoria,
    });
    setDetailData({
      id_detalle: firstDetail.id_detalle,
      nombre: firstDetail.nombre,
      precio: firstDetail.precio,
      unidad: firstDetail.unidad,
      color: firstDetail.color,
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
  }

  /**
   * handles the creation of a new product by sending a POST request to the server
   * @param {Event} e - the event from the form that triggers the function
   */
  async function handleCreate(e) {
    e.preventDefault();
    createDataRequest();
    const response = await postProduct(requestData)
    if(response){
      cleanTextFields();
      alert("El producto se ha creado exitosamente");
    } else {
      alert("No se ha podido crear el producto");
    }
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
      imagenes: detailImagesSaved
    }
    console.log(data)
    const response = await updateProduct(id_product, data)
    if(!response){
      alert("El producto ha sido actualizado correctamente.");
    } else {
      alert("La actualización del producto ha fallado, vuelve a intentarlo.")
    }
  }

  /**
   * handles the deletion of an existing product by sending a DELETE request to the server
   * @param {Event} e - the event from the button click or form submission that triggers the function
   */
  async function handleDelete(e) {
    e.preventDefault();
    let ok = confirm("¿Confirmas la eliminación del producto?")
    if(ok){
      const response = await deleteProduct(id_product)
      if(!response){
        alert("El producto ha sido eliminado exitosamente");
        navigate("/admin/");
        cleanTextFields();
      } else {
        alert("Producto no eliminado, vuelve a intentarlo")
      }
    }
  };

  /**
   * handles the retrieval of all categories and the interaction with details-images data
   */
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchData(id_product);
  }, [id_product]);

  async function fetchCategories() {
    const response = await getCategories();
    setCategories(response);
  };

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
    setDetailData({
      nombre: details[newIndex].nombre,
      precio: details[newIndex].precio,
      unidad: details[newIndex].unidad,
      color: details[newIndex].color,
    });
    setDetailImagesInterface(getDetailImages(details[newIndex].id_detalle));
    setNumberDetail(newIndex);
    setCurrentDetailId(details[newIndex].id_detalle)
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflowY: "auto",
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      <form onSubmit={handleUpdate}>
        <Grid container spacing={5}>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  marginTop={2}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  Detalles
                </Typography>
                <IconButton aria-label="add" onClick={handleAddDetail}>
                  <AddCircleIcon />
                </IconButton>
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
                        onClick={(e) => {
                          changeDetailIndex(index);
                        }}
                      />
                    );
                  })}
                </Tabs>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    {details.map((detail, index) => {
                      return (
                        <TabPanel
                          key={index}
                          value={numberDetail}
                          index={index}
                        >
                          <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={detail.nombre}
                            onChange={(e) => handleInputChangeDetail(index, e)}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Precio"
                            name="precio"
                            value={detail.precio}
                            onChange={(e) => handleInputChangeDetail(index, e)}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Cantidad"
                            name="unidad"
                            value={detail.unidad}
                            onChange={(e) => handleInputChangeDetail(index, e)}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={detail.color}
                            onChange={(e) => handleInputChangeDetail(index, e)}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <div>
                            {!showAddImageTarget && (
                              <div> 
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={(e) => handleRemoveDetail(currentDetailId)}
                                  size="small"
                                >
                                  Eliminar este detalle
                                </Button>
                              </div>
                            )}
                          </div>
                        </TabPanel>
                      );
                    })}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        marginBottom: "5px",
                      }}
                    >
                      {detailImagesInterface.length > 0 ? (
                        <CustomCarousel
                          autoPlay={autoPlay}
                          onImageChange={handleImageChange}
                        >
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
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "1px dashed #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div>No hay imágenes para mostrar</div>
                        </div>
                      )}
                    </div>
                    <div>
                        {!showAddImageTarget && (
                            <div>
                                <IconButton aria-label="add" onClick={(e) => handleAddImage(e)}>
                                    <AddCircleIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={(e) => handleRemoveImage(selectedImageIndex, e)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )}
                        {showAddImageTarget && <AddImage imageUploadedClou={ handleImageUrlClou } onClose={ handleCloseUrlClou }/>}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <div
        style={{
          marginTop: "55px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Guardar cambios
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            style={{ marginLeft: "8px" }}
          >
            Eliminar producto
          </Button>
        </div>
        <Button
          variant="text"
          color="inherit"
          onClick={handleCancel}
          endIcon= {<ReplyIcon />}
          style={{ marginLeft: "8px" }}
        >
          Volver
        </Button>
      </div>
    </Box>
  );
};

export default EditCard;