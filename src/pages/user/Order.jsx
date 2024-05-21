import * as React from 'react';
import {Box, Stepper, Step, StepButton, Button, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel, Tab, TextField, IconButton, InputAdornment, Drawer, useMediaQuery, Modal} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GoogleLogin } from '@react-oauth/google';
import IconPay from "../../../public/Iconpay.png";
import { ItemCart } from "../../components/ItemCart";
import numeral from "numeral";
import { CartContext } from "../../context/CartContext";

const steps = ['Información', 'Método de envío', 'Pago'];

const OrderForm = ({ onSave }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');

  const handleSave = () => {
    // Validar los datos ingresados, por ejemplo, si los campos están vacíos
    if (!phoneNumber || !address) {
      // Manejar la validación, mostrar un mensaje de error, etc.
      return;
    }
    onSave({ phoneNumber, address });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
      }}
    >
      <TextField
        fullWidth
        label="Número de celular"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Dirección de envío"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
        Guardar
      </Button>
    </Box>
  );
};

export default function Order() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [tipoEnvio, setTipoEnvio] = React.useState('');
  const [userData, setUserData] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {cartItems} = React.useContext(CartContext);
  const [productsLength, setProductsLength] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [orderInfo, setOrderInfo] = React.useState(null);
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  // React.useEffect(() => {
  //   const storedCartItems = JSON.parse(localStorage.getItem('cartProducts'));
  //   if (storedCartItems) {
  //     productsLength(storedCartItems);
  //   }
  // }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleEnvioChange = (event) => {
    setTipoEnvio(event.target.value);
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  React.useEffect(() => {
    setProductsLength(
      cartItems.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previous, current) =>
      previous + current.amount * parseFloat(current.detalles[0].precio),
    0
  );

  const onGoogleLoginSuccess = async (response) => {
    setLoading(true)
    const dataResponse = jwtDecode(response.credential)
    await axiosInstance.post("/auth/google/", { email: dataResponse.email, name: dataResponse.name })
      .then(({ data }) => {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh }));
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/")
      }).catch(e => showSignUpError(true))
    setLoading(false)

  };

  const handleSave = () => {
    // Validar los datos ingresados, por ejemplo, si los campos están vacíos
    if (!phoneNumber || !address) {
      // Manejar la validación, mostrar un mensaje de error, etc.
      return;
    }
    onSave({ phoneNumber, address });
  };

  React.useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('order'));
    if (orderData) {
      setOrderInfo(orderData);
    } else {
      setOpenModal(true);
    }
  }, []);

  const handleSaveOrderInfo = (data) => {
    localStorage.setItem('order', JSON.stringify(data));
    setOrderInfo(data);
    setOpenModal(false);
  };

  return (
    <div>
    <Box sx={{ display: 'flex'}}>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <OrderForm onSave={handleSaveOrderInfo} />
      </Modal>
      <Box sx={{ flex: '1 1 50%', height: '100vh'}}>
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === 0 && (
            <div>
              {userData ? (
                <div>
                  <Card variant="outlined" sx={{ mt: 2, mb: 2, ml: 4, mr: 4, p: 2 }}>
                  <div>
                    <Typography variant="h6" gutterBottom component="span" sx={{ fontWeight: 'bold' }}>
                      Nombre:
                    </Typography>
                    <Typography variant="h6" gutterBottom component="span" sx={{ marginLeft: 1 }}>
                      {userData.name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" gutterBottom component="span" sx={{ fontWeight: 'bold' }}>
                      Correo:
                    </Typography>
                    <Typography variant="h6" gutterBottom component="span" sx={{ marginLeft: 1 }}>
                      {userData.email}
                    </Typography>
                  </div>
                  {orderInfo && (
                    <>
                      <div>
                        <Typography variant="h6" gutterBottom component="span" sx={{ fontWeight: 'bold' }}>
                          Celular:
                        </Typography>
                        <Typography variant="h6" gutterBottom component="span" sx={{ marginLeft: 1 }}>
                          {orderInfo.phoneNumber}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h6" gutterBottom component="span" sx={{ fontWeight: 'bold' }}>
                          Dirección:
                        </Typography>
                        <Typography variant="h6" gutterBottom component="span" sx={{ marginLeft: 1 }}>
                          {orderInfo.address}
                        </Typography>
                      </div>
                    </>
                  )}
                </Card>
                </div>
              ) : (
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Ya estoy registrado" value="1" />
                        <Tab label="Soy nuevo" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                    <TextField
                        fullWidth
                        label="Correo electrónico"
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        Iniciar sesión
                      </Button>
                      <Button
                        fullWidth
                        variant="text"
                        color="primary"
                        onClick={() => setValue('2')}
                        sx={{ mt: 2 }}
                      >
                        Registrarse
                      </Button>
                      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                        O si lo prefieres ingresa con
                      </Typography>
                      <GoogleLogin
                        onSuccess={onGoogleLoginSuccess}
                        onError={() => showSignUpError(true)}
                        size='large'
                        width={"100%"}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                    <TextField
                        fullWidth
                        label="Nombre completo*"
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Correo electrónico*"
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Confirmar contraseña"
                        type={showConfirmPassword ? 'text' : 'password'}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        Registrarse
                      </Button>
                      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                        O si lo prefieres ingresa con
                      </Typography>
                      <GoogleLogin
                        onSuccess={onGoogleLoginSuccess}
                        onError={() => showSignUpError(true)}
                        size='large'
                        width={"100%"}
                      />
                    </TabPanel>
                  </TabContext>
                </Box>
              )}
            </div>
          )}
          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
              <Card variant="outlined" sx={{ mt: 2, mb: 2, ml: 4, mr: 4}}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StoreIcon sx={{ fontSize: 48 }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="body1">
                        Tienda: Cra. 16 #10-93, Bretana, Cali, Valle del Cauca, Colombia
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Horario de atención: 10:00am-07:00pm (Lunes a Sábado)
                      </Typography>
                    </Box>
                  </Box>
                  <RadioGroup
                    aria-label="Tipo de envío"
                    name="tipoEnvio"
                    value={tipoEnvio}
                    onChange={handleEnvioChange}
                  >
                    <FormControlLabel
                      value="Recoger en tienda"
                      control={<Radio />}
                      label="Recoger en tienda"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ mt: 2, mb: 2, ml: 4, mr: 4}}>
                <CardContent>
                  <LocalShippingIcon sx={{ fontSize: 48 }} />
                  <RadioGroup
                    aria-label="Tipo de envío"
                    name="tipoEnvio"
                    value={tipoEnvio}
                    onChange={handleEnvioChange}
                  >
                    <FormControlLabel
                      value="Domicilio"
                      control={<Radio />}
                      label="Domicilio"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
              <Card variant="outlined" sx={{ mt: 2, mb: 2, ml: 4, mr: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ fontSize: 48, color: 'orange' }} />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      Para más métodos de pago, debes realizar tu pedido directamente con un asesor de Color Lucy. <a href="#">(click aquí)</a>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ mt: 2, mb: 2, ml: 4, mr: 4}}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={IconPay} alt="Icono Pago Contraentrega" style={{  width: "80px", height: "80px", marginRight: "10px" ,fontSize: 32 }}/>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      Pago contraentrega o al momento de recoger el pedido.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, bottom: 0}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Siguiente
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                  Paso {activeStep + 1} completado
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? 'Finalizar'
                    : 'Completar paso'}
                </Button>
              ))}
          </Box>
        </div>
      </Box>
      {isMobileOrTablet ? (
          <Drawer
            anchor="bottom"
            open={true}
            variant="persistent"
            sx={{ '.MuiDrawer-paper': { background: '#f0f0f0', padding: '20px' } }}
          >
            <h2>Resumen de compra</h2>
            {/* Puedes agregar aquí tu resumen de compra */}
          </Drawer>
        ) : (
          <Box sx={{ flex: '1 1 50%' }}>
          <div style={{ background: '#f0f0f0', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2>Resumen de compra</h2>
            {/* Puedes agregar aquí tu resumen de compra */}
            {/* <div style={{ flex: '1', overflowY: 'auto', maxHeight: '400px' }}> */}
            <Card variant="outlined" sx={{ mt: 2, ml: 2, mr: 2, p: 1 , overflowY: 'auto', maxHeight: '350px', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '20px' }}}>
              {cartItems.length === 0 ? (
                <Typography variant="body1">No hay productos para realizar el pedido</Typography>
              ) : (
                cartItems.map((item, i) => (
                  <ItemCart key={i} item={item} />
                ))
              )}
            </Card>
            <div style={{ position: 'absolute', bottom: 0}}>
          <Typography variant="h6">
            Total: {numeral(total).format("$0,0")}
          </Typography>
        </div>
          </div>
          
        </Box>
        )}
    </Box>
    </div>
  );
}