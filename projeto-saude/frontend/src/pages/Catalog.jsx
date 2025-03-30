import React, { useEffect, useState } from 'react';
import unitApi from '../services/unitApi';
import Header from '../components/Header.jsx';

const Catalog = () => {
  const [units, setUnits] = useState([]);
  const [location, setLocation] = useState('');
  const [tipo, setTipo] = useState('hospital');

  const fetchUnits = async () => {
    try {
      const response = await unitApi.get(`/units?location=${location}&tipo=${tipo}`);
      setUnits(response.data);
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
    }
  };

  useEffect(() => {
    if (location && tipo) fetchUnits();
  }, [location, tipo]);

  return (
    <>
      <Header />
      <h1>Unidades de Saúde</h1>
      <input type="text" placeholder="Cidade" value={location} onChange={(e) => setLocation(e.target.value)} />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="hospital">Hospital</option>
        <option value="clinica">Clínica</option>
        <option value="farmacia">Farmácia</option>
        <option value="laboratorio">Laboratório</option>
      </select>
      <div>
        {units.map((u, i) => (
          <div key={i}>
            <h2>{u.nome}</h2>
            <p>{u.endereco}</p>
            <p>Avaliação: {u.nota}</p>
            <p>Status: {u.horario}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Catalog;
