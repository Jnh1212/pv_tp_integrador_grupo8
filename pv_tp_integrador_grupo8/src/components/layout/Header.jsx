import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext"; // 👈 Importa tu contexto

const Header = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin(); // 👈 Obtenemos admin y logout del contexto

  const handleLogout = () => {
    logout(); // limpia el contexto y localStorage
    navigate("/login"); // redirige al login
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Nombre y sector del administrador */}
        {admin && (
          <Box>
            <Typography variant="h6">
              {admin.nombre} - {admin.sector}
            </Typography>
          </Box>
        )}

        {/* Botón de cerrar sesión alineado a la derecha */}
        <IconButton
          color="inherit"
          onClick={handleLogout}
          sx={{ ml: "auto" }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;