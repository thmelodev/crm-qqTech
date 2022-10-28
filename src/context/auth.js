import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import appService from "../services/AppService";
import colaboradorService from "../services/ColaboradorService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ username, password }) => {
    try {
      const response = await appService.login({
        username,
        password,
      });

      setUser(username);
      const colaborador = await colaboradorService.findOne(
        username,
        response.data.access_token
      );
      localStorage.setItem("@Auth:token", response.data.access_token);
      localStorage.setItem("@Auth:user", colaborador);
    } catch (e) {
      alert("Usuário ou senha incorreta");
    }
  };

  const signOut = () =>{
    localStorage.clear()
    setUser(null);
    return <Navigate to='/' />
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn,signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
