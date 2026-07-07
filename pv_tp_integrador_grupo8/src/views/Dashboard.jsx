import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import { useAdmin } from "../context/AdminContext";
import logo from "../assets/logo.png";

const Dashboard = () => {
  const { admin } = useAdmin();
  const [totalClientes, setTotalClientes] = useState(0);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const clientesGuardados = JSON.parse(
      localStorage.getItem("clientes") || "[]",
    );
    const actividadesGuardadas = JSON.parse(
      localStorage.getItem("actividades") || "[]",
    );

    setTotalClientes(clientesGuardados.length);
    setActividades(actividadesGuardadas);
  }, []);

  const permisos =
    admin?.sector === "Gerencia"
      ? ["Ver clientes", "Crear clientes", "Eliminar clientes"]
      : ["Ver clientes"];

  const borrarHistorial = () => {
    const confirmar = window.confirm(
      "¿Desea borrar todo el registro de actividad?",
    );

    if (!confirmar) return;

    localStorage.removeItem("actividades");
    setActividades([]);
  };

  return (
    <Box sx={{ p: 3, minHeight: "calc(100vh - 20px)" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4">Panel principal</Typography>
          <Typography color="text.secondary">
            Resumen general del sistema de clientes
          </Typography>
        </Box>

        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 70,
            width: "auto",
            maxWidth: 140,
            objectFit: "contain",
            ml: 3,
            display: "block",
            alignSelf: "center",
            mt: 0,
          }}
        />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        <Card className="dashboard-card">
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <PeopleIcon color="primary" />
              <Typography variant="h6">Clientes</Typography>
            </Stack>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {totalClientes}
            </Typography>
            <Typography color="text.secondary">
              Clientes guardados en el sistema.
            </Typography>
            {/* BOTON REINICIAR CLIENTES OPCIONAL */}
            {/* <Button
              color="error"
              onClick={() => {
                localStorage.removeItem("clientes");
                window.location.reload();
              }}
            >
              Reiniciar Clientes
            </Button> */}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon color="primary" />
              <Typography variant="h6">Perfil</Typography>
            </Stack>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {admin?.nombre}
            </Typography>
            <Typography color="text.secondary">
              Cargo: {admin?.sector}
            </Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <SecurityIcon color="primary" />
              <Typography variant="h6">Permisos</Typography>
            </Stack>
            <List dense>
              {permisos.map((permiso) => (
                <ListItem key={permiso} disablePadding>
                  <ListItemText primary={permiso} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <HistoryIcon color="primary" />
              <Typography variant="h6">Registro de actividad</Typography>
            </Stack>

            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={borrarHistorial}
              disabled={actividades.length === 0}
            >
              Borrar historial
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {actividades.length === 0 ? (
            <Typography color="text.secondary">
              Todavía no hay actividades registradas.
            </Typography>
          ) : (
            <List dense>
              {actividades.map((actividad) => (
                <ListItem key={actividad.id} divider>
                  <ListItemText
                    primary={actividad.actividad}
                    secondary={`${actividad.usuario} - ${actividad.sector} - ${actividad.fecha}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

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
