import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Formularios } from "../components/common/Formularios";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        setError("");
        const respuesta = await fetch("https://fakestoreapi.com/users");
        if (!respuesta.ok) throw new Error("Error al obtener clientes");
        const datos = await respuesta.json();
        setClientes(datos);
      } catch (error) {
        setError("No se pudieron cargar los clientes.");
      } finally {
        setCargando(false);
      }
    };
    obtenerClientes();
  }, []);

  const agregarClienteLocal = (nuevoCliente) => {
    setClientes((clientesAnteriores) => [...clientesAnteriores, nuevoCliente]);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase();
    return (
      cliente.name.lastname.toLowerCase().includes(texto) ||
      cliente.address.city.toLowerCase().includes(texto) ||
      cliente.name.firstname.toLowerCase().includes(texto)
    );
  });

  const handleCerrarModal = () => {
    setAbrirModal(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flex: 1, padding: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ margin: 0 }}>
            Lista de Clientes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAbrirModal(true)}
          >
            Nuevo Cliente
          </Button>
        </Box>

        <Dialog
          open={abrirModal}
          onClose={handleCerrarModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <Formularios
              cerrarModal={handleCerrarModal}
              agregarCliente={agregarClienteLocal}
            />
          </DialogContent>
        </Dialog>

        <TextField
          fullWidth
          label="Buscar por apellido o ciudad"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        {cargando && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!cargando && !error && (
          <Grid container spacing={3}>
            {clientesFiltrados.map((cliente) => (
              <Grid item xs={12} sm={6} md={4} key={cliente.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {cliente.name.firstname} {cliente.name.lastname}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>ID:</strong> {cliente.id}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {cliente.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Teléfono:</strong> {cliente.phone}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginBottom: 2 }}
                    >
                      <strong>Ciudad:</strong> {cliente.address.city}
                    </Typography>

                    <Button
                      variant="outlined"
                      fullWidth
                      component={Link}
                      to={`/clientes/${cliente.id}`}
                    >
                      Ver Ficha Completa
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Mensaje por si la búsqueda no encuentra a nadie */}
            {clientesFiltrados.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  No se encontraron clientes.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ListaClientes;
