//pages
import Home from "./pages/Home";
import Login from "./pages/Login";

//react-dom
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth";
import CreateCrm from "./pages/CreateCrm";
import Crm from "./pages/Crm";

const Private = ({ Item }) => {
  const { signed } = useContext(AuthContext);
  return signed ? <Item /> : <Navigate to="/" />;
};

export const portBackEnd = 5000;
export const url_base = `http://localhost:${portBackEnd}`;

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Private Item={Home} />} />
        <Route path="/createCrm" element={<Private Item={CreateCrm} />} />
        <Route path="/crm" element={<Private Item={Crm} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
