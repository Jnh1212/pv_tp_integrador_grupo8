import React, { createContext, useState, useEffect, useContext } from "react";

const ModoAhorroContext = createContext();

export const ModoAhorroProvider = ({ children }) => {
  const [modoAhorro, setModoAhorro] = useState(() => {
    const saved = localStorage.getItem("modoAhorro");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("modoAhorro", JSON.stringify(modoAhorro));
  }, [modoAhorro]);

  const toggleModoAhorro = () => setModoAhorro(!modoAhorro);

  return (
    <ModoAhorroContext.Provider value={{ modoAhorro, toggleModoAhorro }}>
      {children}
    </ModoAhorroContext.Provider>
  );
};

export const useModoAhorro = () => useContext(ModoAhorroContext);