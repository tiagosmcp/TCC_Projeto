import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Inicializa o estado lendo do localStorage para persistir o login
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // Endpoint de login criado na seção 2.2
    const res = await axios.post("http://localhost:8800/auth/login", inputs); 
    // res.data contém: {id, nome, cor, tipo}
    setCurrentUser(res.data);
    return res.data;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Salva o usuário no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};