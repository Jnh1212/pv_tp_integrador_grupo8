import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Box,
} from "@mui/material";

export default function DetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin, registrarActividad } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetch detalle
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const getCliente = async () => {
      try {
        setLoading(true);
        setError(null);
        // BUSCAR DETALLES DE CLIENTES EN LA API
        // const res = await fetch(`https://fakestoreapi.com/users/${id}`);
        // if (!res.ok) throw new Error("Error al obtener el detalle del cliente");
        // const data = await res.json();
        // setCliente(data);
        
        // BUSCAR DETALLES DE CLIENTES EN LOCAL STORAGE
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        const clienteEncontrado = clientes.find(
          (cliente) => cliente.id === Number(id),
        );

        if (!clienteEncontrado) {
          throw new Error("Cliente no encontrado");
        }

        setCliente(clienteEncontrado);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCliente();
  }, [id]);

  //Delete Simulado
  const eliminarCliente = () => {
    const confirmar = window.confirm(
      `¿Desea eliminar a ${cliente.name.firstname} ${cliente.name.lastname}?`,
    );

    if (!confirmar) return;

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const clientesActualizados = clientes.filter((c) => c.id !== cliente.id);

    localStorage.setItem("clientes", JSON.stringify(clientesActualizados));

    registrarActividad(
      `Eliminó el cliente ${cliente.name.firstname} ${cliente.name.lastname}`,
    );

    alert("Cliente eliminado correctamente.");

    navigate("/clientes");
  };

  //ESTADOS
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!cliente) {
    return <Alert severity="info">No se encontró el cliente</Alert>;
  }

  const { name, email, phone, address, username, password } = cliente;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 4,
      }}
    >
      <Card
        className="detalle-card"
        sx={{
          maxWidth: 600,
          width: "40%",
          margin: "0 auto",
          mt: 4,
          p: 2,
          backgroundColor: "#ffffff",
          color: "#1f2937",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ color: "#1f2937" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/clientes")}
            sx={{ mb: 2.5 }}
          >
            Volver
          </Button>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
              color: "primary.main",
            }}
          >
            <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            {name.firstname} {name.lastname}
          </Typography>
          <Typography sx={{ color: "#1f2937" }}>Email: {email}</Typography>
          <Typography sx={{ color: "#1f2937" }}>Teléfono: {phone}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              mb: 1,
            }}
          >
            {" "}
            Dirección:{" "}
          </Typography>
          <Typography sx={{ color: "#1f2937" }}>
            Calle: {address.street}
          </Typography>
          <Typography sx={{ color: "#1f2937" }}>
            Número: {address.number}
          </Typography>
          <Typography sx={{ color: "#1f2937" }}>
            Ciudad: {address.city}
          </Typography>
          <Typography sx={{ color: "#1f2937" }}>
            Código Postal: {address.zipcode}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {admin?.sector === "Gerencia" && (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 1,
                }}
              >
                {" "}
                Credenciales:{" "}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography sx={{ color: "#1f2937" }}>
                  Usuario: {username}
                </Typography>
                <Typography sx={{ color: "#1f2937" }}>
                  Contraseña: {password}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          )}
          {/* //CONTROL DE PERMISOS */}
          {admin?.sector === "Gerencia" && (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={eliminarCliente}
              sx={{ mt: 2 }}
            >
              Eliminar Cliente
            </Button>
          )}
          {admin?.sector === "Soporte" && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Solo lectura
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
