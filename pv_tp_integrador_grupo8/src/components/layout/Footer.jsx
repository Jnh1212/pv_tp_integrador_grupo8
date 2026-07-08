import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a237e",
        color: "#ffffff",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {/* Panel Clientes (izquierda) */}
          <Box
            sx={{
              flex: 1,
              minWidth: 250,
              textAlign: "left",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Panel Clientes
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Sistema de Gestión Integral para el Control de Clientes
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
              FI - UNJU
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Jujuy, Argentina
            </Typography>
          </Box>

          {/* Navegación (centro) */}
          <Box
            sx={{
              flex: 1,
              minWidth: 250,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Navegación
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <HomeIcon fontSize="small" />
                <Link
                  component={RouterLink}
                  to="/dashboard"
                  color="inherit"
                  underline="hover"
                  sx={{ opacity: 0.8 }}
                >
                  Dashboard
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PeopleIcon fontSize="small" />
                <Link
                  component={RouterLink}
                  to="/clientes"
                  color="inherit"
                  underline="hover"
                  sx={{ opacity: 0.8 }}
                >
                  Clientes
                </Link>
              </Box>
              {/* <Link
                component={RouterLink}
                to="/perfil"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8 }}
              >
                Mi Perfil
              </Link> */}
            </Box>
          </Box>

          {/* Contacto (derecha) */}
          <Box
            sx={{
              flex: 1,
              minWidth: 250,
              textAlign: "right",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contacto
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  soporte@panelclientes.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Jujuy, Argentina
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <IconButton
                component="a"
                href="https://github.com/Jnh1212/pv_tp_integrador_grupo8"
                target="_blank"
                sx={{ color: "#ffffff", "&:hover": { color: "#90caf9" } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: "#ffffff", "&:hover": { color: "#90caf9" } }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="mailto:soporte@panelclientes.com"
                sx={{ color: "#ffffff", "&:hover": { color: "#90caf9" } }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            opacity: 0.6,
          }}
        >
          <Typography variant="body2">
            © Grupo 8 {new Date().getFullYear()} PV - Todos los derechos
            reservados
          </Typography>
          <Typography variant="body2">Versión 1.0.0</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
