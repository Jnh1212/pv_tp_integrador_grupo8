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
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #f0f0f0, #d9e4f5)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "400px",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="../assets/logo.png"
            alt="Logo de Empresa"
            style={{
              maxWidth: "150px",   // se ajusta en pantallas pequeñas
              width: "100%",       // ocupa todo el ancho disponible
              height: "auto",      // mantiene proporción
              marginBottom: "20px"
            }}
          />
        </div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;