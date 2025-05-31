import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MinhasVacinas = ({ onLogout }) => {
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState({ nome: '', data: '', local: '', dose: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios.get(import.meta.env.VITE_API_BASE + '/vacinas', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => {
      const vacinasOrdenadas = res.data.sort((a, b) => new Date(b.data) - new Date(a.data));
      setVacinas(vacinasOrdenadas);
    })
    .catch(err => {
      console.error(err); 
      setErro('Erro ao carregar vacinas.');
    });
  }, []);

  const validarCampos = () => {
    const { nome, data, local, dose, objetivo } = novaVacina;
    return nome && data && local && dose && objetivo;
  };

  const adicionarVacina = () => {
    if (!validarCampos()) {
      setErro('Preencha todos os campos.');
      return;
    }

    axios.post(import.meta.env.VITE_API_BASE + '/vacinas', novaVacina, {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(res => {
      setVacinas([...vacinas, { ...novaVacina, objectId: res.data.id }]);
      setNovaVacina({ nome: '', data: '', local: '', dose: '', objetivo: '' });
      setMensagem('Vacina cadastrada com sucesso!');
      setErro('');
    })
    .catch(err => {
      console.error(err);
      setErro('Erro ao cadastrar vacina');
    });
  };

  const excluirVacina = (id) => {
    if (!window.confirm('Deseja realmente excluir esta vacina?')) return;

    axios.delete(import.meta.env.VITE_API_BASE + '/vacinas/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(() => {
      setVacinas(vacinas.filter(v => v.objectId !== id));
      setMensagem('Vacina removida');
    }).catch(err => {
      console.error(err)
      setErro('Erro ao excluir vacina.');
    });
  };

  if (!token) {
    return <p>Usuário não autenticado. Faça login.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Minhas Vacinas</h2>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div>
        <input placeholder="Nome" value={novaVacina.nome} onChange={(e) => setNovaVacina({ ...novaVacina, nome: e.target.value })} />
        <input type="date" value={novaVacina.data} onChange={(e) => setNovaVacina({ ...novaVacina, data: e.target.value })} />
        <input placeholder="Local" value={novaVacina.local} onChange={(e) => setNovaVacina({ ...novaVacina, local: e.target.value })} />
        <input placeholder="Dose" value={novaVacina.dose} onChange={(e) => setNovaVacina({ ...novaVacina, dose: e.target.value })} />
        <input placeholder="Objetivo (doença tratada)" value={novaVacina.objetivo} onChange={(e) => setNovaVacina({ ...novaVacina, objetivo: e.target.value })} />
        <button onClick={adicionarVacina}>Cadastrar</button>
      </div>

      <ul>
        {vacinas.map((v) => (
          <li key={v.objectId}>
            <strong>{v.nome}</strong> - {new Date(v.data).toLocaleDateString()} - {v.local} - {v.dose} - {v.objetivo}
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
