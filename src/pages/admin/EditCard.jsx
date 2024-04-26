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
const EditCard = () => {
  const { id_product } = useParams();
  const [autoPlay, setAutoPlay] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [requestData, setRequestData] = useState();
  const [categories, setCategories] = useState([]);
  const [detailImagesInterface, setDetailImagesInterface] = useState([]);
  const [detailImagesSaved, setDetailImagesSaved] = useState([]);
  const [details, setDetails] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [numberDetail, setNumberDetail] = useState(0);
  const [uploadImages, setUploadImages] = useState([])
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name_product: "",
    producer: "",
    description: "",
    category: "",
  });
  const [detailData, setDetailData] = useState({
    id_detail: "",
    name: "",
    price: "",
    unit: "",
    color: "",
    product: "",
  });
  const productImagesTemp = [
    {
      id: 71,
      url: "/src/components/2.jpeg",
      detalleId: 27,
    },
    {
      id: 72,
      url: "/src/components/1.jpg",
      detalleId: 27,
    },
    {
      url: "/src/components/3.jpg",
      detalleId: 27,
    },
  ];

  const handleCategory = (e) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setDetailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    alert("añadir imagen"); 
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...detailImagesInterface];
    updatedImages.splice(index, 1);
    setDetailImagesInterface(updatedImages);
  };

  const handleAddDetail = () => {
    console.log(productData, detailData)
    alert("agregar detalle"); 
  }

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...productDetails];
    updatedDetails.splice(index, 1);
    setProductDetails(updatedDetails);
  }

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  function cleanTextFields() {
    setProductData({
      name_product: "",
      producer: "",
      description: "",
      category: "",
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
        fabricante: productData.producer,
        descripcion: productData.description,
        categoria: parseInt(productData.category),
      },
      detalles: [
        {
          nombre: productData.name,
          precio: parseFloat(productData.price),
          unidad: productData.unit,
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
      detalle: image.detalleId,
    }));
    setRequestData({
      producto: {
        fabricante: productData.producer,
        descripcion: productData.description,
        categoria: parseInt(productData.category),
      },
      detalles: [
        {
          id_detalle: productData.detail,
          nombre: productData.name,
          precio: parseFloat(productData.price),
          unidad: productData.unit,
          color: productData.color,
          producto: id_product
        },
      ],
      imagenes: detailImagesSaved //ToDo
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
    console.log(responseData)
    const firstDetail = responseData.details.length > 0 ? responseData.details[0] : {};
    setProductData({
      name_product: responseData.product.nombre,
      producer: responseData.product.fabricante,
      description: responseData.product.descripcion,
      category: responseData.product.categoria,
    });
    setDetailData({
      name: firstDetail.nombre,
      price: firstDetail.precio,
      unit: firstDetail.unidad,
      color: firstDetail.color,
    });
    setDetails(responseData.details);
    setDetailImagesSaved(responseData.images);

    let imgUrl = [];
    responseData.images.forEach((img) => {
      if (img.detalle === firstDetail.id_detalle) {
        imgUrl.push(img.url);
      }
      setDetailImagesInterface(imgUrl);
    });
    console.log("imgUrl", imgUrl)
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
    updateDataRequest();
    const response = await updateProduct(id_product, requestData)
    if(response){
      alert("El producto ha sido actualizado correctamente");
    } else {
      alert("La actualización del producto ha fallado, vuelve a intentarlo")
    }
  }

  /**
   * handles the deletion of an existing product by sending a DELETE request to the server
   * @param {Event} e - the event from the button click or form submission that triggers the function
   */
  async function handleDelete(e) {
    e.preventDefault();
    const response = await deleteProduct(id_product)
    if(!response){
      alert("El producto ha sido eliminado exitosamente");
      navigate("/admin/");
      cleanTextFields();
    } else {
      alert("Producto no eliminado, vuelve a intentarlo")
    }
  };

  /**
   * handles the retrieval of all categories and product data
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
    let imgUrl = [];
    detailImagesSaved.forEach((img) => {
      if (img.detalle === detail_id) {
        imgUrl.push(img.url);
      }
    });
    return imgUrl;
  };
  const changeDetailIndex = (newIndex) => {
    setDetailData({
      name: details[newIndex].nombre,
      price: details[newIndex].precio,
      unit: details[newIndex].unidad,
      color: details[newIndex].color,
    });
    setDetailImagesInterface(getDetailImages(details[newIndex].id_detalle));
    setNumberDetail(newIndex);
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
                name="product-name"
                value={productData.name_product}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Fabricante"
                name="producer"
                value={productData.producer}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={productData.description ? productData.description : ""}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <InputLabel id="Categoria">Categoría del producto</InputLabel>
              <Select
                fullWidth
                labelId="Categoria"
                id="demo-simple-select"
                value={productData.category}
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
                            name="name"
                            value={detail.nombre}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Precio"
                            name="price"
                            value={detail.precio}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Cantidad"
                            name="unit"
                            value={detail.unidad}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={detail.color}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{ marginBottom: 2 }}
                          />
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleRemoveDetail}
                            size="small"
                            
                          >
                            Eliminar este detalle
                          </Button>
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
                              src={image}
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
                    <div >
                      <IconButton aria-label="add" onClick={handleAddImage}>
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={handleRemoveImage}
                      >
                        <DeleteIcon />
                      </IconButton>
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
