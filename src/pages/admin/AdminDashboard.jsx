import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import GroupsIcon from '@mui/icons-material/Groups';
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from "@mui/icons-material/Search";
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import TvIcon from '@mui/icons-material/Tv';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, Collapse, InputAdornment, TextField } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { cloneElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../components/logo';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { BarColors } from "../../components/NavigationBar";
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function AdminDashboard({ children }) {
  const queryParams = new URLSearchParams(location.search);
  const editPage = decodeURIComponent(queryParams.get("edit-page"));
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editSect, setEditSect] = useState(editPage);
  const [openHomeE, setOpenHomeE] = useState(!(editPage === "null"));
  const [modifyProduct, setModifyProduct] = useState({
    update: null,
    delete: null,
    create: null
  })
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(open => !open);
  };
  const handleAddProduct = () => {
    navigate("/admin/add-product/");
  };

  const icons = {
    'Productos': <FormatPaintIcon />,
    'Pedidos': <AssignmentIcon />,
    'Notificaciones': <NotificationsIcon/>,
    'Editar Pagina de Inicio': <DisplaySettingsIcon />,
  }
  const pagesUrls = {
    'Productos': "/admin/products/",
    'Pedidos': "/admin/orders/",
    'Notificaciones': "/admin/notifications/",
    'Editar Pagina de Inicio': "/admin/home/edit",
  }
  const modifyTitle = (newTitle) => {
    setTitle(newTitle)
  };

  const editSections = {
    "Sección de Inicio": <TvIcon />, "Sección de Combinaciones": <ListAltIcon />,
    "Sección de Productos": <ListIcon />, "Sección de Aliados": <GroupsIcon />, "Sección de Contacto": <SettingsPhoneIcon />
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault()
    modifyProduct.update()
  }
  const handleDeleteProduct = (e) => {
    e.preventDefault()
    modifyProduct.delete()
  }
  const handleCreateProduct = (e) => {
    e.preventDefault()
    modifyProduct.create()
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "#F2F3F4", color: "black" }}>
        <Toolbar sx={{ paddingInline: "0px !important" }}>
          <IconButton onClick={handleDrawerClose}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

          {title === "Productos" ?
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                width: "100%",
                padding: "10px"
              }}
            >
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                placeholder={"Buscar"}
                fullWidth
                sx={{ maxWidth: "500px" }}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              ></TextField>
              <Button
                sx={{
                  backgroundColor: "#C63CA2",
                  color: "white",
                  fontFamily: "Roboto",
                  "&:hover": {
                    backgroundColor: "#D7194A",
                  },
                }}
                startIcon={<AddIcon />}
                onClick={handleAddProduct}
              >
                Añadir Producto
              </Button>
            </Box> :
            title === "Editar Producto" ?
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  width: "100%",
                  padding: "10px"
                }}
              >
                <Typography variant="h6" noWrap component="div">
                  {title}
                </Typography>
                <Box>
                  <Button variant="contained" color="primary" onClick={handleUpdateProduct} endIcon={<SaveIcon />}>
                    Guardar cambios
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDeleteProduct} style={{ marginLeft: "8px" }} endIcon={<DeleteIcon />}>
                    Eliminar producto
                  </Button>
                </Box>
              </Box> :
              title === "Añadir Producto" ?
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "100%",
                    padding: "10px"
                  }}
                >
                  <Typography variant="h6" noWrap component="div">
                    {title}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleCreateProduct} endIcon={<SaveIcon />}>
                    Guardar producto
                  </Button>
                </Box> :
                <Typography variant="h6" noWrap component="div">
                  {title}
                </Typography>}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Logo imgSize={40} minLen={true} />
          {open && <BarColors cantIntermediate={3} />}
        </DrawerHeader>
        <Divider />
        <List>
          {Object.entries(icons).map(([text, icon], index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={title === text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={(e) => text === "Editar Pagina de Inicio" ? setOpenHomeE(prev => !prev) : navigate(pagesUrls[text])}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                {text === "Editar Pagina de Inicio" ? openHomeE ? <ExpandLess /> : <ExpandMore /> : <></>}
              </ListItemButton>
              {text === "Editar Pagina de Inicio" && <Collapse in={openHomeE} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {Object.entries(editSections).map(([textEdit, icon], index) =>
                    <ListItemButton key={textEdit} sx={{ pl: 4 }}
                      onClick={(e) => {
                        setEditSect(textEdit);
                        navigate(pagesUrls['Editar Pagina de Inicio'] + `?edit-page=${encodeURIComponent(textEdit)}`)
                      }}
                      selected={text === "Editar Pagina de Inicio" && textEdit === editSect}
                    >
                      <ListItemIcon>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={textEdit} />
                    </ListItemButton>
                  )}
                </List>
              </Collapse>}
            </ListItem>
          ))}
        </List>
        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {cloneElement(children, { modifyTitle, search, setModifyProduct })}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
