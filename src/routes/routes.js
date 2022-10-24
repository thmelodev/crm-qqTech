//pages
import Crm from '../pages/Crm';
import Home from '../pages/Home';
import Login from '../pages/Login';

//react-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Private = ({Item}) => {
    const signed = false;

    return signed ? <Item /> : <Login /> 
}

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Private Item={Home} />} />
        <Route path="/crm" element={<Private Item={Crm} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
