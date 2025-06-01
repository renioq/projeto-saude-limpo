import React, { useState } from 'react';
import unitApi from '../services/unitApi';
import './styles/Catalog.css';


const Catalog = () => {
  const [bairro, setBairro] = useState('');
  const [tipo, setTipo] = useState('');
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detalhes, setDetalhes] = useState({}); //Armazena detalhes por place_id

  const fetchUnits = async () => {
    if (!bairro || !tipo) {
      alert("Por favor, preencha os dois campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await unitApi.get('/units', {
        params: { bairro, tipo }
      });
      setUnits(response.data);
      setDetalhes({}); // Limpa detalhes anteriores
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
    }
    setLoading(false);
  };

  const buscarDetalhes = async (placeId) => {
    try {
      const res = await unitApi.get(`/unit-details/${placeId}`);
      setDetalhes(prev => ({ ...prev, [placeId]: res.data }));
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
    }
  };

  return (
    <>
      <div className="catalog-container">
        <h1>Unidades de Saúde em Fortaleza</h1>
  
        <div className="form-wrapper">
          <div>
            <label>Bairro: </label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Digite o bairro"
            />
          </div>
  
          <div>
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
        </div>
  
        {loading && <p>Carregando unidades...</p>}
        {!loading && units.length === 0 && (
          <p>Nenhuma unidade encontrada para os filtros informados.</p>
        )}
  
        <ul className="container">
          {units.map((unit, index) => (
            <li key={index} className="card">
              <h3>{unit.nome}</h3>
              <p><strong>Endereço:</strong> {unit.endereco}</p>
              <p><strong>Nota:</strong> {unit.nota ?? 'Sem avaliação'}</p>
              <p><strong>Status:</strong> {unit.status ?? 'Não informado'}</p>
              {!detalhes[unit.place_id] ? (
                <button onClick={() => buscarDetalhes(unit.place_id)}>
                  Ver mais detalhes
                </button>
              ) : (
                <p><strong>Horário:</strong> {detalhes[unit.place_id].horario}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );  
};

export default Catalog;

