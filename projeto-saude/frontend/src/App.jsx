import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog.jsx';
import Articles from './pages/Articles.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
  );
};

export default App;
