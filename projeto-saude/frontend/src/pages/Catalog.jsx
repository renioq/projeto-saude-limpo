import React, { useState } from 'react';
import unitApi from '../services/unitApi';
import Header from '../components/Header';

const Catalog = () => {
  const [location, setLocation] = useState('');
  const [tipo, setTipo] = useState('');
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchUnits = async () => {
    if (!location || !tipo) {
      alert("Por favor, preencha os dois campos.");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await unitApi.get('/units', {
        params: { location, tipo }
      });
      setUnits(response.data);
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Unidades de Saúde</h1>

        <div style={{ marginBottom: '10px' }}>
          <label>Cidade: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Digite a cidade"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Tipo: </label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione</option>
            <option value="hospital">Hospital</option>
            <option value="clinica">Clínica</option>
            <option value="farmacia">Farmácia</option>
            <option value="laboratorio">Laboratório</option>
          </select>
        </div>

        <button onClick={fetchUnits}>Buscar</button>

        {loading && <p>Carregando resultados...</p>}

        {!loading && searched && units.length === 0 && (
          <p>Nenhuma unidade encontrada para os filtros informados.</p>
        )}

        <ul style={{ marginTop: '20px' }}>
          {units.map((unit, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <h3>{unit.nome}</h3>
              <p><strong>Endereço:</strong> {unit.endereco}</p>
              <p><strong>Nota:</strong> {unit.nota ?? 'Sem avaliação'}</p>
              <p><strong>Horário:</strong> {unit.horario ?? 'Não informado'}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Catalog;

