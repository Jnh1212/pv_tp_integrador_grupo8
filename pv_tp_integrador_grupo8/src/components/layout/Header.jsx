import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const Header = () => {
  const { admin, logout } = useContext(AdminContext);

  return (
    <header>
      {admin ? (
        <div>
          <span>{admin.nombre} ({admin.sector})</span>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <span>No conectado</span>
      )}
    </header>
  );
};

export default Header;