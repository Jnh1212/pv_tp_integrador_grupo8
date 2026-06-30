import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogContent
} from "@mui/material";
import { Formularios } from "../components/common/Formularios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
      <Header />

      <Box sx={{ flex: 1, padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ margin: 0 }}>
            Lista de Clientes
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setAbrirModal(true)}>
            Nuevo Cliente
          </Button>
        </Box>

        <Dialog open={abrirModal} onClose={handleCerrarModal} maxWidth="sm" fullWidth>
          <DialogContent>
            <Formularios cerrarModal={handleCerrarModal} agregarCliente={agregarClienteLocal} />
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre completo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Ciudad</TableCell>
                  <TableCell>Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientesFiltrados.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.id}</TableCell>
                    <TableCell>
                      {cliente.name.firstname} {cliente.name.lastname}
                    </TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.phone}</TableCell>
                    <TableCell>{cliente.address.city}</TableCell>
                    <TableCell>
                      <Button variant="contained" component={Link} to={`/clientes/${cliente.id}`}>
                        Ver Ficha Completa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {clientesFiltrados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No se encontraron clientes.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box component="footer" sx={{ backgroundColor: "#f5f5f5", padding: 2, textAlign: "center" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ListaClientes;