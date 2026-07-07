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
  Snackbar,
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
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    phone: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
  });

  const [errores, setErrores] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
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
    if (!formData.firstname) nuevosErrores.firstname = "* Ingrese un nombre *";
    if (!formData.lastname) nuevosErrores.lastname = "* Ingrese un apellido *";
    if (!formData.username) nuevosErrores.username = "* Ingrese un usuario *";
    if (!formData.email)
      nuevosErrores.email = "* Ingrese un correo electrónico *";
    if (!formData.phone) nuevosErrores.phone = "* Ingrese un teléfono *";
    if (!formData.city) nuevosErrores.city = "* Seleccione una ciudad *";
    if (!formData.street) nuevosErrores.street = "* Ingrese una calle *";
    if (!formData.number) nuevosErrores.number = "* Ingrese un número *";
    if (!formData.zipcode)
      nuevosErrores.zipcode = "* Ingrese un código postal *";

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
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        address: {
          city: formData.city,
          street: formData.street,
          number: Number(formData.number),
          zipcode: formData.zipcode,
          geolocation: { lat: "0", long: "0" },
        },
        phone: formData.phone,
      };

      const datos = await registrarClienteAPI(payload);

      const ultimoId = Number(localStorage.getItem("ultimoId")) || 10;
      const nuevoId = ultimoId + 1;

      localStorage.setItem("ultimoId", nuevoId);

      const nuevoCliente = {
        id: nuevoId,
        email: formData.email,
        username: formData.username,
        password: "password123",
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        address: {
          city: formData.city,
          street: formData.street,
          number: Number(formData.number),
          zipcode: formData.zipcode,
          geolocation: { lat: "0", long: "0" },
        },
        phone: formData.phone,
      };

      agregarCliente(nuevoCliente);

      setAlerta({
        mostrar: true,
        tipo: "success",
        mensaje: `Cliente creado con éxito. ID asignado: ${nuevoCliente.id}`,
      });

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        phone: "",
        city: "",
        street: "",
        number: "",
        zipcode: "",
      });

      setTimeout(() => {
        cerrarModal();
      }, 1200);
    } catch (error) {
      setAlerta({
        mostrar: true,
        tipo: "error",
        mensaje: "Hubo un error al crear el cliente.",
      });
    } finally {
      setCargando(false);
    }
  };

  const cerrarConConfirmacion = () => {
    const hayCambios = Object.values(formData).some((valor) => valor !== "");

    if (hayCambios) {
      const confirmar = window.confirm(
        "Hay datos sin guardar. ¿Desea salir igualmente?",
      );

      if (!confirmar) return;
    }

    cerrarModal();
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
          label="Nombre"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          fullWidth
          error={!!errores.firstname}
          helperText={errores.firstname}
        />

        <TextField
          label="Apellido"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          fullWidth
          error={!!errores.lastname}
          helperText={errores.lastname}
        />
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
        <TextField
          label="Calle"
          name="street"
          value={formData.street}
          onChange={handleChange}
          fullWidth
          error={!!errores.street}
          helperText={errores.street}
        />

        <TextField
          label="Número"
          name="number"
          type="number"
          value={formData.number}
          onChange={handleChange}
          fullWidth
          error={!!errores.number}
          helperText={errores.number}
        />

        <TextField
          label="Código Postal"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          fullWidth
          error={!!errores.zipcode}
          helperText={errores.zipcode}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={cerrarConConfirmacion}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            disabled={cargando}
          >
            {cargando ? "Guardando..." : "Crear Cliente"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={alerta.mostrar}
        autoHideDuration={3000}
        onClose={() => setAlerta({ mostrar: false, tipo: "", mensaje: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alerta.tipo || "info"}
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};
