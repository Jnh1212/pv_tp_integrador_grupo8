import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
//import HomeIcon from "@mui/icons-material/Home";
import { Formularios } from "../components/common/Formularios";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  //const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
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

  const ciudades = [
    ...new Set(clientes.map((cliente) => cliente.address.city)),
  ];

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase();
    const coincideBusqueda =
      cliente.name.lastname.toLowerCase().includes(texto) ||
      cliente.address.city.toLowerCase().includes(texto);

    const coincideCiudad =
      ciudadSeleccionada === "" || cliente.address.city === ciudadSeleccionada;

    return coincideBusqueda && coincideCiudad;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>

      <Formularios />

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        {/* CONTENIDO PRINCIPAL */}
        <TextField
          label="Buscar por apellido o ciudad"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ flex: "1 1 260px" }}
        />
        <FormControl sx={{ flex: "1 1 220px" }}>
          <InputLabel>Ciudad</InputLabel>
          <Select
            value={ciudadSeleccionada}
            label="Ciudad"
            onChange={(e) => setCiudadSeleccionada(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {ciudades.map((ciudad) => (
              <MenuItem key={ciudad} value={ciudad}>
                {ciudad}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {cargando && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!cargando && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 2,
          }}
        >
          {clientesFiltrados.map((cliente) => (
            <Card key={cliente.id} className="cliente-card">
              <CardContent>
                <Typography variant="h6">
                  {cliente.name.firstname} {cliente.name.lastname}
                </Typography>
                <Typography>ID: {cliente.id}</Typography>
                <Typography>Email: {cliente.email}</Typography>
                <Typography>Teléfono: {cliente.phone}</Typography>
                <Typography>Ciudad: {cliente.address.city}</Typography>

                <Button
                  variant="contained"
                  component={Link}
                  to={`/clientes/${cliente.id}`}
                  sx={{ mt: 2 }}
                >
                  Ver ficha completa
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ListaClientes;
