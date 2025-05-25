import React, { useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './pages/Catalog.jsx';
import Articles from './pages/Articles.jsx';
import Login from './pages/Login';
import MinhasVacinas from './pages/MinhasVacinas';

const App = () => {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<Login onLoginSuccess={() => setLogado(true)} />} />
        <Route path="/vacinas" element={<MinhasVacinas onLogout={() => setLogado(false)} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;