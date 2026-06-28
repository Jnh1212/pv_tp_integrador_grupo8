import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: 2,
        textAlign: "center",
        marginTop: "auto", // 👈 asegura que quede al final
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2026 Mi Empresa - Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;