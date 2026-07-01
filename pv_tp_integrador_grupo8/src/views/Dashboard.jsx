import { Button, Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Panel principal
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 2,
        }}
      >
        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h6">Gestión de clientes</Typography>
            <Typography>Consulta, búsqueda y detalle de clientes.</Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h6">Perfiles</Typography>
            <Typography>
              Soporte visualiza y Gerencia puede eliminar.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button
        variant="contained"
        component={Link}
        to="/clientes"
        sx={{ mt: 3 }}
      >
        Ir a clientes
      </Button>
    </Box>
  );
};

export default Dashboard;
