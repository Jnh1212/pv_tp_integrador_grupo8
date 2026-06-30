import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
} from "@mui/material";

export default function DetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Fetch detalle

  useEffect(() => {
    const getCliente = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!res.ok) throw new Error("Error al obtener el detalle del cliente");

        const data = await res.json();
        setCliente(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCliente();
  }, [id]);

  //Delete Simulado
  const eliminarCliente = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el cliente");
      }

      alert("Cliente eliminado correctamente");
      navigate("/clientes");
    } catch (error) {
      alert("No se pudo eliminar el cliente");
    }
  };

  //ESTADOS
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!cliente) {
    return <Alert severity="info">No se encontró el cliente</Alert>;
  }

  const { name, email, phone, address, username, password } = cliente;

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
      <CardContent>
      <Button
        variant="outlined"
        onClick={() => navigate("/clientes")}
        sx={{ mb: 2 }}
      >
        ← Volver a Lista clientes
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
          {name.firstname} {name.lastname}
        </Typography>
        <Typography> Email: {email}</Typography>
        <Typography> Teléfono: {phone}</Typography>

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
        <Typography> Calle: {address.street}</Typography>
        <Typography> Número: {address.number}</Typography>
        <Typography> Ciudad: {address.city}</Typography>
        <Typography> Código Postal: {address.zipcode}</Typography>

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
          Credenciales:{" "}
        </Typography>
        <Typography> Usuario: {username}</Typography>
        <Typography> Contraseña: {password}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* //CONTROL DE PERMISOS */}
        {admin?.sector === "Gerencia" && (
          <Button variant="contained" color="error" onClick={eliminarCliente}>
            Eliminar Cliente de la Base de Datos
          </Button>
        )}
        {admin?.sector === "Soporte" && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Solo tienes permisos de visualizacion
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
