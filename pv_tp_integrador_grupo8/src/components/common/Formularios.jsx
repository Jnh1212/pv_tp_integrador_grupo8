import { useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Snackbar
} from "@mui/material";

const registrarClienteAPI = async (datosCliente) => {
  const respuesta = await fetch("https://fakestoreapi.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosCliente),
  });

  if (!respuesta.ok) {
    throw new Error("Error en la petición");
  }

  return await respuesta.json();
};

export const Formularios = ({ cerrarModal, agregarCliente }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    city: "",
  });

  const [errores, setErrores] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
  });

  const cities = [
    "Killcole",
    "Cullman",
    "San Antonio",
    "El Paso",
    "Fresno",
    "Mesa",
    "Miami",
    "Fort Wayne",
  ];

  const [alerta, setAlerta] = useState({
    mostrar: false,
    tipo: "",
    mensaje: "",
  });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrores({
      ...errores,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = {};

    if (!formData.username) nuevosErrores.username = "* Ingrese un usuario *";
    if (!formData.email) nuevosErrores.email = "* Ingrese un correo electrónico *";
    if (!formData.phone) nuevosErrores.phone = "* Ingrese un teléfono *";
    if (!formData.city) nuevosErrores.city = "* Seleccione una ciudad *";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setCargando(false);
      return;
    }

    setCargando(true);

    try {
      const payload = {
        email: formData.email,
        username: formData.username,
        password: "password123",
        name: {
          firstname: "Nuevo",
          lastname: "Cliente",
        },
        address: {
          city: formData.city,
          street: "Calle Falsa",
          number: 1,
          zipcode: "0000",
          geolocation: { lat: "0", long: "0" },
        },
        phone: formData.phone,
      };

      const datos = await registrarClienteAPI(payload);

      setAlerta({
        mostrar: true,
        tipo: "success",
        mensaje: `¡Cliente creado con éxito! ID asignado: ${datos.id}`,
      });

      setFormData({ email: "", username: "", phone: "", city: "" });
    } catch (error) {
      setAlerta({
        mostrar: true,
        tipo: "error",
        mensaje: "Hubo un error al crear el cliente.",
      });
    } finally {
      setCargando(false);

      setTimeout(() => {
        setAlerta({ mostrar: false, tipo: "", mensaje: "" });

        if (cerrarModal && alerta.tipo !== "error") {
          cerrarModal();
        }
      }, 1500);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 550 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <PersonAddAlt1Icon color="primary" />
        <Typography variant="h5" fontWeight="bold">
          Nuevo Cliente
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
      >
        <TextField
          label="Nombre de Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          error={!!errores.username}
          helperText={errores.username}
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          error={!!errores.email}
          helperText={errores.email}
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          error={!!errores.phone}
          helperText={errores.phone}
        />
        <FormControl fullWidth error={!!errores.city}>
          <InputLabel>Ciudad</InputLabel>

          <Select
            name="city"
            value={formData.city}
            label="Ciudad"
            onChange={handleChange}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errores.city}</FormHelperText>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" startIcon={<CloseIcon />} onClick={cerrarModal}>
            Cancelar
          </Button>

          <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />} disabled={cargando}>
            {cargando ? "Guardando..." : "Crear Cliente"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={alerta.mostrar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={alerta.tipo || "info"} sx={{ width: "100%", boxShadow: 3 }}>
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};