import { useState } from "react";

export const Formularios = ({ cerrarModal, agregarCliente }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    city: "",
  });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const respuesta = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      if (respuesta.status === 200 || respuesta.status === 201) {
        const datos = await respuesta.json();

        if (agregarCliente) {
          agregarCliente(datos);
        }

        if (cerrarModal) {
          cerrarModal();
        }

        setAlerta({
          mostrar: true,
          tipo: "success",
          mensaje: `¡Cliente creado con éxito! ID asignado: ${datos.id}`,
        });

        setFormData({ email: "", username: "", phone: "", city: "" });
      } else {
        throw new Error("Error");
      }
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
      }, 4000);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Crear Cliente"}
        </button>
      </form>

      {alerta.mostrar && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: alerta.tipo === "success" ? "#d4edda" : "#f8d7da",
            color: alerta.tipo === "success" ? "#155724" : "#721c24",
            borderRadius: "5px",
          }}
        >
          {alerta.mensaje}
        </div>
      )}
    </div>
  );
};
