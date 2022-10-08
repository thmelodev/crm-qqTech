import './css/App.css';
import Crm from './pages/Crm';
import Home from './pages/Home';
import Login from './pages/Login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/crm' element={<Crm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
