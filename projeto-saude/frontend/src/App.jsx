import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Catalog from './pages/Catalog.jsx';
import Articles from './pages/Articles.jsx';
import Login from './pages/Login.jsx';
import MinhasVacinas from './pages/MinhasVacinas.jsx';

const App = () => {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));

    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setLogado(true)} />} />
          <Route path="/vacinas" element={<MinhasVacinas onLogout={() => setLogado(false)} />} />
        </Routes>
      </>
    );
};

export default App;