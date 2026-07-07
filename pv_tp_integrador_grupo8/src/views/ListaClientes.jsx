import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CardActions,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Grid,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Formularios } from "../components/common/Formularios";
import { useAdmin } from "../context/AdminContext";

const ListaClientes = () => {
  const { admin, registrarActividad } = useAdmin();
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        const clientesGuardados = localStorage.getItem("clientes");

        if (clientesGuardados) {
          setClientes(JSON.parse(clientesGuardados));
          return;
        }

        const respuesta = await fetch("https://fakestoreapi.com/users");
        if (!respuesta.ok) throw new Error("Error al obtener clientes");
        const datos = await respuesta.json();
        setClientes(datos);
        localStorage.setItem("clientes", JSON.stringify(datos));
      } catch (error) {
        setError("No se pudieron cargar los clientes.");
      } finally {
        setCargando(false);
      }
    };
    obtenerClientes();
  }, []);

  const agregarClienteLocal = (nuevoCliente) => {
    const clientesActualizados = [...clientes, nuevoCliente];

    setClientes(clientesActualizados);
    localStorage.setItem("clientes", JSON.stringify(clientesActualizados));

    registrarActividad(
      `Creó el cliente ${nuevoCliente.name.firstname} ${nuevoCliente.name.lastname}`,
    );

    setMensaje("Cliente creado correctamente.");
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase();
    return (
      cliente.name.lastname.toLowerCase().includes(texto) ||
      cliente.address.city.toLowerCase().includes(texto) ||
      cliente.name.firstname.toLowerCase().includes(texto)
    );
  });

  return (
    <Box sx={{ p: 3, minHeight: "calc(100vh - 10px)" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 3 }}
      >
        <Typography variant="h4">Lista de Clientes</Typography>

        {admin?.sector === "Gerencia" && (
          <Button variant="contained" onClick={() => setAbrirModal(true)}>
            Nuevo Cliente
          </Button>
        )}
      </Box>

      <Dialog
        open={abrirModal}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            setAbrirModal(false);
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Formularios
            cerrarModal={() => setAbrirModal(false)}
            agregarCliente={agregarClienteLocal}
          />
        </DialogContent>
      </Dialog>

      <TextField
        fullWidth
        label="Buscar por nombre, apellido o ciudad"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 3 }}
      />

      {cargando && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!cargando && !error && (
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
          >
            {clientesFiltrados.map((cliente) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={cliente.id}
                sx={{ display: "flex" }}
              >
                <Card
                  className="cliente-card"
                  elevation={3}
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: "100%",
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      gutterBottom
                      noWrap
                    >
                      {cliente.name.firstname} {cliente.name.lastname}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      <strong>Email:</strong> {cliente.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Teléfono:</strong> {cliente.phone}
                    </Typography>

                    <Chip
                      label={cliente.address.city}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2 }}
                    />
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2, justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<VisibilityIcon />}
                      component={Link}
                      to={`/clientes/${cliente.id}`}
                    >
                      Ver
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Snackbar
        open={!!mensaje}
        autoHideDuration={3000}
        onClose={() => setMensaje("")}
        message={mensaje}
      />
    </Box>
  );
};

export default ListaClientes;
