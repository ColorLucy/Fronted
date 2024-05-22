import * as React from 'react';
import {Box, Stepper, Step, StepButton, Button, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel, Tab, TextField, IconButton, InputAdornment, Drawer, useMediaQuery, Modal, Alert, CircularProgress, FormHelperText, FormControl} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ItemCart } from "../../components/ItemCart";
import numeral from "numeral";
import { CartContext } from "../../context/CartContext";
import axiosInstance from '../../utils/axiosInstance';

const steps = ['Información', 'Método de envío', 'Pago'];

const OrderForm = ({ onSave }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const handleSave = () => {
    // Validar los datos ingresados, por ejemplo, si los campos están vacíos
    if (!phoneNumber || !address) {
      setShowAlert(true);
      return; // Salir de la función si hay campos vacíos
    }
    setShowAlert(false);
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
        minWidth: '300px',
      }}
    >
      <Typography  variant="h6" component="h2">
            Información para realizar el pedido
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Está información es requerida para poder realizar confirmaciones del pedido.
          </Typography>
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
      {showAlert && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          Por favor complete todos los campos correctamente para continuar.
        </Alert>
      )}
      <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
        Guardar
      </Button>
    </Box>
  );
};

export default function Order() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = React.useState(true);
  const [tipoEnvio, setTipoEnvio] = React.useState('');
  const [userData, setUserData] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loginData, setLoginData] = React.useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = React.useState({ email: "", password: "", name: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [showLoginError, setShowLoginError] = React.useState(false);
  const [showSignUpError, setShowSignUpError] = React.useState(false);
  const [showSignUpErrorGoogle, setShowSignUpErrorGoogle] = React.useState(false);
  const { cartItems } = React.useContext(CartContext);
  const [productsLength, setProductsLength] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [orderInfo, setOrderInfo] = React.useState(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

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

  // Función para verificar si todos los campos requeridos en el paso actual están completos
  const areRequiredFieldsCompleted = () => {
    if (activeStep === 0) {
      // Lógica para verificar los campos requeridos en el paso 0
      return !!userData && !!orderInfo && !!orderInfo.phoneNumber && !!orderInfo.address;
    } else if (activeStep === 1) {
      // Lógica para verificar los campos requeridos en el paso 1
      return !!tipoEnvio; // O cualquier otra lógica que necesites
    }
    // En otros pasos, se asume que los campos requeridos están completos
    return true;
  };

  // Efecto para actualizar el estado del botón de "Siguiente" cuando cambia el paso activo
  React.useEffect(() => {
    setIsNextButtonDisabled(!areRequiredFieldsCompleted());
  }, [activeStep, userData, orderInfo, tipoEnvio]);

  const handleNext = () => {
    if (isLastStep() && !allStepsCompleted()) {
      const incompleteStepIndex = steps.findIndex((step, i) => !(i in completed));
      if (incompleteStepIndex === 0) {
        const userData = JSON.parse(localStorage.getItem('user'));
        const orderData = JSON.parse(localStorage.getItem('order'));
        if (!userData || !orderData || !orderData.phoneNumber || !orderData.address) {
          return;
        }
      }
      setActiveStep(incompleteStepIndex);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
        window.location.reload();
      }).catch(e => setShowSignUpErrorGoogle(true))
    setLoading(false)

  };

  const handleSignIn = () => {
    setLoading(true);
    
    axiosInstance
      .post("/auth/login/", loginData)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('accessToken', data.access);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setShowLoginError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data } = await axiosInstance.post("/auth/signup/", signUpData);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      localStorage.setItem('authTokens', JSON.stringify({ access: data.access, refresh: data.refresh }));
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.reload();
    } catch (error) {
      console.error("Error al registrarse:", error);
      setShowSignUpError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
      const cartInfo = cartItems.map(
        (item) =>
          `${item.nombre}: ${item.fabricante} - ${item.amount
          } unidades - ${numeral(parseFloat(item.detalles[0].precio)).format(
            "$0,0"
          )} la unidad,`
      );
      const message = `Hola, soy ${userData.name}, ¿Cuáles métodos de pago tienen?, me gustaría ordenar lo siguiente:\n${cartInfo.join(
        "\n"
      )}\nTotal: ${numeral(total).format("$0,0")}`;
      const whatsappLink = `https://wa.me/573155176725/?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappLink, "_blank");
      handleDialogClose();
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

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <Modal open={openModal} onClose={handleClose}>
        <Box>
          <OrderForm onSave={handleSaveOrderInfo} />
        </Box>
      </Modal>
      <Box sx={{ flex: '1 1 50%'}}>
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2, width: '100%', overflow: 'hidden' }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)} disabled={isNextButtonDisabled}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === 0 && (
            <div>
              {loading ? (           
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <CircularProgress />
                </Box>
              ) : userData ? (
                <div style={{minHeight:'400px'}}>
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
                        type='email'
                        value={loginData.email}
                        onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Contraseña"
                        value={loginData.password}
                        type={showPassword ? 'text' : 'password'}
                        required
                        onChange={e => setLoginData({ ...loginData, password: e.target.value })}
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
                       {showLoginError && (
                          <Alert severity="error" variant="filled" sx={{ width: '100%', mt: 2 }}>
                            Error al iniciar sesión. Por favor, verifica tus credenciales.
                          </Alert>
                        )}
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleSignIn}
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
                      <Box
                        display="flex"
                        justifyContent="center"
                        marginTop={2}
                      >
                        <GoogleLogin
                          onSuccess={onGoogleLoginSuccess}
                          onError={() => showSignUpErrorGoogle(true)}
                          size="large"
                          width="100%"
                        />
                      </Box>
                    </TabPanel>
                    <TabPanel value="2">
                    <TextField
                      fullWidth
                      label="Nombre completo*"
                      margin="normal"
                      type='text'
                      variant="outlined"
                      value={signUpData.name}
                      onChange={e => {
                        setSignUpData({ ...signUpData, name: e.target.value });
                        setNameError(!/^[A-Za-z ]+$/.test(e.target.value));
                      }}
                      error={nameError}
                      helperText={nameError ? "Por favor, ingrese su nombre utilizando únicamente letras y espacios." : ""}
                    />
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      margin="normal"
                      variant="outlined"
                      required
                      autoComplete='email'
                      value={signUpData.email}
                      onChange={e => {
                        setSignUpData({ ...signUpData, email: e.target.value });
                        setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value));
                      }}
                      helperText={emailError ? "Por favor, ingrese un correo electrónico válido." : ""}
                      error={emailError}
                    />
                    <TextField
                      fullWidth
                      label="Contraseña"
                      margin="normal"
                      variant="outlined"
                      type={showNewPassword ? 'text' : 'password'}
                      value={signUpData.password}
                      autoComplete='new-password'
                      required
                      onChange={e => {
                        setSignUpData({ ...signUpData, password: e.target.value });
                        setPasswordError(
                          e.target.value.length < 6 ? "Por seguridad, la contraseña debe tener al menos 6 caracteres." :
                          !/\d/.test(e.target.value) ? "La contraseña debe incluir al menos un número." :
                          false
                        );
                      }}
                      error={passwordError}
                      helperText={passwordError}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowNewPassword}
                              edge="end"
                            >
                              {showNewPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Confirmar contraseña"
                      margin="normal"
                      variant="outlined"
                      value={signUpData.confirmPassword}
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      autoComplete='new-password'
                      onChange={e => {
                        const confirmPassword = e.target.value;
                        setSignUpData({ ...signUpData, confirmPassword });
                        setConfirmPasswordError(confirmPassword !== signUpData.password);
                      }}
                      error={confirmPasswordError}
                      helperText={confirmPasswordError ? "Las contraseñas no coinciden. Por favor, verifique que ambas sean iguales." : ""}
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
                    {showSignUpError && (
                      <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%', marginTop: 2 }}
                      >
                        Lamentablemente, no pudimos completar tu registro. Por favor, intenta nuevamente.
                      </Alert>
                    )}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? 'Cargando...' : 'Registrarse'}
                    </Button>
                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                      O si lo prefieres ingresa con
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="center"
                        marginTop={2}
                      >
                        <GoogleLogin
                          onSuccess={onGoogleLoginSuccess}
                          onError={() => showSignUpErrorGoogle(true)}
                          size="large"
                          width="100%"
                        />
                      </Box>
                    {showSignUpError && (
                      <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%', marginTop: 2 }}
                      >
                        Lamentablemente, no pudimos completar tu registro. Por favor, intenta nuevamente.
                      </Alert>
                    )}
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
                      Para más métodos de pago, debes realizar tu pedido directamente con un asesor de Color Lucy. <a href='' onClick={handleWhatsAppOrder}>(click aquí)</a>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ mt: 2, mb: 2, ml: 4, mr: 4}}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="Iconpay.png" alt="Icono Pago Contraentrega" style={{  width: "80px", height: "80px", marginRight: "10px" ,fontSize: 32 }}/>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      Pago contraentrega o al momento de recoger el pedido.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
          <Box  sx={{  display: 'flex', flexDirection: 'row', bottom: 0, overflow: 'hidden' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Button onClick={handleNext} disabled={isNextButtonDisabled} sx={{ mr: 1 }}>
              Siguiente
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                  Paso {activeStep + 1} completado
                </Typography>
              ) : (
                <Button onClick={handleComplete} disabled={isNextButtonDisabled}>
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
            
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton onClick={toggleDrawer}>
                <Typography variant="h6">Resumen de compra</Typography>
                {isExpanded ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
              {isExpanded && (
                <>
                  <Card variant="outlined" sx={{ mt: 2, p: 1, overflowY: 'auto', maxHeight: '350px', minHeight: '350px', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '20px' } }}>
                    {cartItems.length === 0 ? (
                      <Typography variant="body1">No hay productos para realizar el pedido</Typography>
                    ) : (
                      cartItems.map((item, i) => (
                        <ItemCart key={i} item={item} />
                      ))
                    )}
                  </Card>
                  <Box sx={{ bottom: 0, mt: 2 }}>
                    <Typography variant="h6">
                      Total: {numeral(total).format("$0,0")}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Drawer>
        ) : (
          <Box sx={{ flex: '1 1 50%' }}>
          <div style={{ background: '#f0f0f0', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2>Resumen de compra</h2>
            <Card variant="outlined" sx={{ mt: 2, ml: 2, mr: 2, p: 1 , overflowY: 'auto', maxHeight: '350px', minHeight:'350px', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '20px' }}}>
              {cartItems.length === 0 ? (
                <Typography variant="body1">No hay productos para realizar el pedido</Typography>
              ) : (
                cartItems.map((item, i) => (
                  <ItemCart key={i} item={item} />
                ))
              )}
            </Card>
            <div style={{ bottom: 0, marginTop:'20px'}}>
              <Typography variant="h6">
                Total: {numeral(total).format("$0,0")}
              </Typography>
            </div>
          </div>
        </Box>
        )}
    </Box>
  );
}