import React, { useEffect, useState } from 'react';
import vacineApi from '../services/vacineApi';
import '../../index.css';

const MinhasVacinas = ({ onLogout }) => {
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState({ nome: '', data: '', local: '', dose: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {

    vacineApi.get('/vacinas')
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

    vacineApi.post('/vacinas', novaVacina)
      .then(res => {
        setVacinas([{ ...novaVacina, objectId: res.data.id }, ...vacinas]);
        setNovaVacina({ nome: '', data: '', local: '', dose: '', objetivo: '' });
        setMensagem('Vacina cadastrada com sucesso.');
        setErro('');
      })
      .catch(err => {
        console.error(err);
        setErro('Erro ao cadastrar vacina.');
      });
  };

  const excluirVacina = (id) => {
    if (!window.confirm('Deseja realmente excluir esta vacina?')) return;

    vacineApi.delete('/vacinas/' + id)
      .then(() => {
        setVacinas(vacinas.filter(v => v.objectId !== id));
        setMensagem('Vacina removida.');
      })
      .catch(err => {
        console.error(err);
        setErro('Erro ao excluir vacina.');
      });
  };

  if (!token) {
    return <p>Usuário não autenticado. Faça login.</p>;
  }

  return (
    <div className="vacina-container">
      <h2>Minhas Vacinas</h2>

      {mensagem && <div className="vacina-success">{mensagem}</div>}
      {erro && <div className="vacina-error">{erro}</div>}

      <div className="vacina-form">
        <input placeholder="Nome" value={novaVacina.nome} onChange={e => setNovaVacina({ ...novaVacina, nome: e.target.value })} />
        <input type="date" value={novaVacina.data} onChange={e => setNovaVacina({ ...novaVacina, data: e.target.value })} />
        <input placeholder="Local" value={novaVacina.local} onChange={e => setNovaVacina({ ...novaVacina, local: e.target.value })} />
        <input placeholder="Dose" value={novaVacina.dose} onChange={e => setNovaVacina({ ...novaVacina, dose: e.target.value })} />
        <input placeholder="Objetivo (doença tratada)" value={novaVacina.objetivo} onChange={e => setNovaVacina({ ...novaVacina, objetivo: e.target.value })} />
        <button onClick={adicionarVacina}>Cadastrar</button>
      </div>

      <div className="vacina-grid">
        {vacinas.map((v) => (
          <div key={v.objectId} className="vacina-card">
            <h3>{v.nome}</h3>
            <p><strong>Data:</strong> {new Date(v.data).toLocaleDateString()}</p>
            <p><strong>Local:</strong> {v.local}</p>
            <p><strong>Dose:</strong> {v.dose}</p>
            <p><strong>Objetivo:</strong> {v.objetivo}</p>
            <button onClick={() => excluirVacina(v.objectId)}>Excluir</button>
          </div>
        ))}
      </div>

      <button className="vacina-logout" onClick={() => {
        localStorage.removeItem('token');
        onLogout();
      }}>
        Sair
      </button>
    </div>
  );
};

export default MinhasVacinas;
