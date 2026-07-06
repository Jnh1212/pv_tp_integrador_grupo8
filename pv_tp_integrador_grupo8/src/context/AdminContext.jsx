import React, { createContext, useState, useEffect, useContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  const registrarActividad = (actividad) => {
    const nuevaActividad = {
      id: Date.now(),
      usuario: admin?.nombre || "Sin usuario",
      sector: admin?.sector || "Sin sector",
      fecha: new Date().toLocaleString("es-AR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
      actividad,
    };

    const actividadesGuardadas = JSON.parse(
      localStorage.getItem("actividades") || "[]",
    );

    localStorage.setItem(
      "actividades",
      JSON.stringify([nuevaActividad, ...actividadesGuardadas].slice(0, 10)),
    );
  };

  const login = (nombre, sector) => {
    setAdmin({ nombre, sector });
  };

  const logout = () => {
    registrarActividad("Cerró sesión");
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, registrarActividad }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
