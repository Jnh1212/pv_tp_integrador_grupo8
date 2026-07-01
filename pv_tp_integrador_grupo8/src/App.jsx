import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider, AdminContext } from "./context/AdminContext";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Box } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { admin } = useContext(AdminContext);
  return admin ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Box sx={{ flex: 1 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <ListaClientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes/:id"
            element={
              <PrivateRoute>
                <DetalleCliente />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
