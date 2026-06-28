import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Estado inicial: lee localStorage, si no hay nada → null
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};