import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
        {/* Grid principal con 3 columnas simétricas */}
        <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
          
          {/* Columna 1: Panel Clientes (izquierda) */}
          <Grid item xs={12} sm={3}>
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
          </Grid>

          {/* Columna 2: Navegación (centro) */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Navegación
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link
                component={RouterLink}
                to="/dashboard"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8 }}
              >
                Dashboard
              </Link>
              <Link
                component={RouterLink}
                to="/clientes"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8 }}
              >
                Clientes
              </Link>
              <Link
                component={RouterLink}
                to="/perfil"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8 }}
              >
                Mi Perfil
              </Link>
            </Box>
          </Grid>

          {/* Columna 3: Contacto (derecha) */}
          <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contacto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-end" }}>
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
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
              <IconButton
                component="a"
                href="https://github.com"
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
          </Grid>
        </Grid>

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
            © {new Date().getFullYear()} PV - Todos los derechos reservados
          </Typography>
          <Typography variant="body2">Versión 1.0.0</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;