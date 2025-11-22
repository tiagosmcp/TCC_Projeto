import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Inicializa o estado lendo do localStorage para persistir o login
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // requisição vai para /auth/login
    const res = await axios.post("https://tcc-projeto.onrender.com/auth/login", inputs) 
    
    // Armazena os dados do usuário logado (id, nome, cor, tipo)
    setCurrentUser(res.data);
    
    // Armazena no Local Storage para persistência 
    localStorage.setItem("user", JSON.stringify(res.data));
    
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