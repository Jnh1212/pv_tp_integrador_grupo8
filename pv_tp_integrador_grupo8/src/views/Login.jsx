// src/views/Login.jsx
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("Soporte");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(nombre, sector);
    navigate("/clientes");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Acceso Administrador</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
