import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Button, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { useState } from "react";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sol
import Brightness2Icon from "@mui/icons-material/Brightness2"; // Luna
import { useModoAhorro } from "../../context/ModoAhorroContext";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";

const Header = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const { modoAhorro, toggleModoAhorro } = useModoAhorro();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
  const confirmar = window.confirm(
    "¿Está seguro de que desea cerrar sesión?"
  );

  if (!confirmar) return;

    logout();
    navigate("/login", { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
       position="sticky"
       sx={{
         backgroundColor: "#1a237e",
         boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
         color: "#ffffff",
         py: 1, 
  }}
>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "70px" }}>
    {/* Título / Logo */}
    <Typography
      variant="h5"
      component={Link}
      to="/dashboard"
      sx={{
        color: "#ffffff",
        textDecoration: "none",
        fontWeight: "bold",
        letterSpacing: "0.5px",
        fontSize: "1.8rem",
      }}
    >
      📊 Panel Clientes
    </Typography>

    {/* Usuario y logout */}
    {admin ? (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
          Hola, {admin.nombre}
        </Typography>
        <Typography sx={{ color: "#bbdefb", fontSize: "0.9rem", fontWeight: "bold" }}>
          ({admin.sector})
        </Typography>
        
        <IconButton onClick={handleMenu} sx={{ padding: 0 }}>
          <Avatar sx={{ bgcolor: "#4db6ac", width: 40, height: 40, color: "#1a237e" }}>
            {admin.nombre?.charAt(0).toUpperCase() || "A"}
          </Avatar>
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ minWidth: 220 }}        
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            <Avatar sx={{ bgcolor: "#4db6ac", width: 50, height: 50, mb: 1 }}>
              {admin.nombre?.charAt(0).toUpperCase() || "A"}
            </Avatar>
            <Typography sx={{ fontWeight: "bold" }}>{admin.nombre}</Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
              {admin.sector}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.disabled" }}>
              {"correo@gmail.com"}
            </Typography>
          </Box>
          <MenuItem onClick={handleLogout} sx={{ color: "#d32f2f", justifyContent: "center" }}>
             <LogoutIcon sx={{ mr: 1 }} />
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Box>
    ) : (
      <Button color="inherit" component={Link} to="/login">
        Iniciar Sesión
      </Button>
    )}
  </Toolbar>
  <Toolbar sx={{ backgroundColor: "#283593", minHeight: "50px", display: "flex" }}>
  {/* Navegación central */}
  <Box
  sx={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 2,
  }}
>
    <Button
      component={NavLink}
      to="/dashboard"
      startIcon={<HomeIcon />}
      sx={{
      color: "#ffffff",
      textTransform: "none",
      fontWeight: "bold",
      "&.active": {
        backgroundColor: "#3949ab",
      },
      fontSize: "1rem",
      borderRadius: "4px",
      "&:hover": {
      backgroundColor: "#3949ab",
      },
    }}
    >
        DASHBOARD
    </Button>
    <Button
        component={NavLink}
        to="/clientes"
        startIcon={<PeopleIcon />}
        sx={{ color: "#ffffff", 
          textTransform: "none", 
          fontWeight: "bold", 
          "&.active": {
          backgroundColor: "#3949ab",
        },
          fontSize: "1rem",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#3949ab",
          }
         }}
    >
        CLIENTES
    </Button>
  </Box>
    <Button onClick={toggleModoAhorro} sx={{ color: "#ffffff" }}>
      {modoAhorro ? <Brightness2Icon /> : <Brightness7Icon />}
    </Button>
  </Toolbar>
</AppBar>
  );
};

export default Header;