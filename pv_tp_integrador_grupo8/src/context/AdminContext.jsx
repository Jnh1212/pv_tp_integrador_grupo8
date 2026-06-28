import React, { createContext, useState, useEffect, useContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Estado inicial directamente desde localStorage
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  // Persistencia en tiempo real
  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  const login = (nombre, sector) => {
    const adminData = { nombre, sector };
    setAdmin(adminData);
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);