import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import CustomCarousel from './imagesSlider';
const EditCard = () => {
    const { id_product } = useParams();
    const [productId, setProductId] = useState('');
    const [autoPlay, setAutoPlay] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [detailImages, setDetailImages] = useState([])
    const [requestData, setRequestData] = useState()
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState('')
    const [numberDetail, setNumberDetail] = useState(0)
    const [productData, setProductData] = useState({
        producer: '',
        description: '',
        category: '',

    });
    const [detailData, setDetailData] = useState({
        name: '',
        price: '',
        unit: '',
        color: '',
        detail: '',
    });
    const [detailsImages, setDetailsImages] = useState([])
    const [details, setDetails] = useState([])
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
    ]

    const handleCategory = (e) => {
        setCategorySelected(e.target.value);
        productData.category = categorySelected
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleSubmitId = (e) => {
        e.preventDefault();
        fetchData(productId);
    };

    const handleAddImage = () => {
        console.log("añadir imagen");
    };

    const handleRemoveImage = (index) => {
        console.log("eliminar imagen:", index);
        const updatedImages = [...productImages];
        updatedImages.splice(index, 1);
        setProductImages(updatedImages);
    };

    const handleImageChange = (index) => {
        setSelectedImageIndex(index);
    };

    function cleanTextFields() {
        setProductData({
            producer: '',
            description: '',
            category: '',
            name: '',
            price: '',
            unit: '',
            color: '',
        })
        setDetailImages([])
    }

    function createDataRequest() {
        const imagesData = productImages.map(imageUrl => ({ "url": imageUrl }));
        setRequestData({
            "producto": {
                "fabricante": productData.producer,
                "descripcion": productData.description,
                "categoria": parseInt(productData.category)
            },
            "detalles": [
                {
                    "nombre": productData.name,
                    "precio": parseFloat(productData.price),
                    "unidad": productData.unit,
                    "color": productData.color
                }
            ],
            "imagenes": imagesData
        })

    }

    function updateDataRequest() {
        const imagesData = productImagesTemp.map(image => ({
            ...(image.id ? { "id_imagen": image.id } : {}),
            "url": image.url,
            "detalle": image.detalleId
        }));
        setRequestData({
            "producto": {
                "fabricante": productData.producer,
                "descripcion": productData.description,
                "categoria": parseInt(productData.category)
            },
            "detalles": [
                {
                    "id_detalle": productData.detail,
                    "nombre": productData.name,
                    "precio": parseFloat(productData.price),
                    "unidad": productData.unit,
                    "color": productData.color,
                }
            ],
            "imagenes": imagesData
        })
    }

    const handleCancel = () => {
        console.log("cancelado")
        //TODO volver a la pagina anterior
    };

    /**
     * handles the retrieval of all categories
     */
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get(`/products/view-categories/`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error getting categories:', error);
        }
    };
    const getDetailImages = (detail_id) => {
        let imgUrl = []
        detailsImages.forEach((img) => {
            if (img.detalle === detail_id) {
                imgUrl.push(img.url)
            }
        })
        return imgUrl
    }

    /**
     * handles the retrieval of data from an existing product in the database
     * sending a GET request to the server
     * @param {Event} e - the event from the form that triggers the function
     */
    const fetchData = async (id_product) => {
        try {
            const responseAllProductData = await axiosInstance.get(`/products/view-product/?pk=${id_product}`);
            const responseData = responseAllProductData.data;
            const firstDetail = responseData.details.length > 0 ? responseData.details[0] : {};
            setProductData({
                producer: responseData.product.fabricante,
                description: responseData.product.descripcion,
                category: responseData.product.categoria,
            });
            setDetailData({
                name: firstDetail.nombre,
                price: firstDetail.precio,
                unit: firstDetail.unidad,
                color: firstDetail.color,
            })
            setDetails(responseData.details)
            setDetailsImages(responseData.images)


            let imgUrl = []
            responseData.images.forEach((img) => {
                if (img.detalle === firstDetail.id_detalle) {
                    imgUrl.push(img.url)
                }
                setDetailImages(imgUrl)
            })
            //console.log("images", responseData.images, firstDetail.id_detalle)
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    /**
     * handles the creation of a new product by sending a POST request to the server
     * @param {Event} e - the event from the form that triggers the function
     */
    const handleCreate = async (e) => {
        createDataRequest()
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/products/create-product/`, requestData);
            console.log('Producto creado:', response.data);
            cleanTextFields()
            alert("El producto se ha creado exitosamente")
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    /**
     * handles the update of an existing product by sending a PUT request to the server
     * @param id from product to delete
     * @param {Event} e - the event from the form or button click that triggers the function
     */
    const handleUpdate = async (e) => {
        updateDataRequest()
        e.preventDefault();
        try {
            console.log(requestData, "request put")
            const response = await axiosInstance.put(`/products/update-product/?pk=${productId}`, requestData);
            alert("El producto ha sido actualizado correctamente")
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    /**
     * handles the deletion of an existing product by sending a DELETE request to the server
     * @param {Event} e - the event from the button click or form submission that triggers the function
     */
    const handleDelete = async (e) => {
        console.log(productId)
        e.preventDefault();
        try {
            const response = await axiosInstance.delete(`/products/delete-product/?pk=${productId}`);
            alert("El producto ha sido eliminado exitosamente")
            cleanTextFields()

        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    useEffect(() => { fetchData(id_product) }, [id_product])
    const changeDetalleIndex = (newIndex) => {
        setDetailData({
            name: details[newIndex].nombre,
            price: details[newIndex].precio,
            unit: details[newIndex].unidad,
            color: details[newIndex].color,
        })
        setDetailImages(getDetailImages(details[newIndex].id_detalle))
        setNumberDetail(newIndex)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                overflowY: 'auto',
            }}
        >
            <Card sx={{ width: '80%', maxWidth: 1000, maxHeight: '80vh', overflow: 'auto' }}>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Editar Producto {productData.id_product}
                    </Typography>
                    <form onSubmit={handleUpdate}>
                        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5" component="div" gutterBottom marginBottom={1}>
                                    Producto
                                </Typography>
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
                                <Select fullWidth
                                    labelId="Categoria"
                                    id="demo-simple-select"
                                    value={productData.category}
                                    onChange={handleCategory}
                                    sx={{ marginBottom: 2 }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id_categoria} value={category.id_categoria}>
                                            {category.nombre} (id {category.id_categoria})
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Typography variant="h5" component="div" gutterBottom marginBottom={1} marginTop={2}>
                                    Detalles del producto
                                </Typography>
                                <Grid container spacing={1.5}>
                                    {details.map((detail, index) => {
                                        return (
                                            <ButtonGroup
                                                orientation="vertical"
                                                aria-label="Vertical button group"
                                                variant="contained"
                                                key={index}
                                            ><Button onClick={(e) => changeDetalleIndex(index)}>Detalle {detail.nombre}
                                                </Button>
                                            </ButtonGroup>)

                                    })}
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="body1" component="div" gutterBottom marginBottom={1} marginTop={2}>
                                    Detalle actual
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    value={detailData.name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Precio"
                                    name="price"
                                    value={detailData.price}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Cantidad"
                                    name="unit"
                                    value={detailData.unit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Color"
                                    name="color"
                                    value={detailData.color}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                                    <div style={{ width: '300px', height: '300px', marginBottom: '5px' }}>
                                        {detailImages.length > 0 ? (
                                            <CustomCarousel autoPlay={autoPlay} onImageChange={handleImageChange}>
                                                {detailImages.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Product Image ${index}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ))}
                                            </CustomCarousel>
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div>No hay imágenes para mostrar</div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <IconButton aria-label='add' onClick={handleAddImage}>
                                            <AddCircleIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={handleRemoveImage}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <ButtonGroup color="primary" variant="outlined" size="medium" aria-label="Medium-sized button group" style={{ marginTop: '20px' }}>
                                        <Button>Agregar</Button>
                                        <Button>Actualizar</Button>
                                        <Button>Eliminar</Button>
                                    </ButtonGroup>
                                </Grid>

                            </Grid>
                        </Grid>
                    </form>
                    <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Guardar cambios
                            </Button>
                            <Button variant="contained" color="error" onClick={handleDelete} style={{ marginLeft: '8px' }}>
                                Eliminar producto
                            </Button>
                            <IconButton size='large' onClick={cleanTextFields}>
                                <LoopOutlinedIcon />
                            </IconButton>
                        </div>
                        <Button variant="outlined" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                            Cancelar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Box >
    );
};

export default EditCard;
