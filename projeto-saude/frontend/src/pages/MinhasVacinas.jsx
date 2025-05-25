import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MinhasVacinas = ({ onLogout }) => {
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState({ nome: '', data: '', local: '', dose: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios.get(import.meta.env.VITE_API_BASE + '/vacinas', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => setVacinas(res.data))
    .catch(err => console.error(err));
  }, []);

  const adicionarVacina = () => {
    axios.post(import.meta.env.VITE_API_BASE + '/vacinas', novaVacina, {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => {
      setVacinas([...vacinas, { ...novaVacina, objectId: res.data.id }]);
      setNovaVacina({ nome: '', data: '', local: '', dose: '' });
    })
    .catch(err => console.error(err));
  };

  const excluirVacina = (id) => {
    axios.delete(import.meta.env.VITE_API_BASE + '/vacinas/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(() => {
      setVacinas(vacinas.filter(v => v.objectId !== id));
    }).catch(err => console.error(err));
  };

  if (!token) {
    return <p>Usuário não autenticado. Faça login.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Minhas Vacinas</h2>
      <div>
        <input placeholder="Nome" value={novaVacina.nome} onChange={(e) => setNovaVacina({ ...novaVacina, nome: e.target.value })} />
        <input type="date" value={novaVacina.data} onChange={(e) => setNovaVacina({ ...novaVacina, data: e.target.value })} />
        <input placeholder="Local" value={novaVacina.local} onChange={(e) => setNovaVacina({ ...novaVacina, local: e.target.value })} />
        <input placeholder="Dose" value={novaVacina.dose} onChange={(e) => setNovaVacina({ ...novaVacina, dose: e.target.value })} />
        <button onClick={adicionarVacina}>Cadastrar</button>
      </div>
      <ul>
        {vacinas.map((v) => (
          <li key={v.objectId}>
            <strong>{v.nome}</strong> - {v.data} - {v.local} - {v.dose}
            <button onClick={() => excluirVacina(v.objectId)}>Excluir</button>
          </li>
        ))}
      </ul>
      <button onClick={() => { localStorage.removeItem('token'); onLogout(); }}>
        Sair
      </button>
    </div>
  );
};

export default MinhasVacinas;
