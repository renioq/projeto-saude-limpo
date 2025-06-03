import React, { useEffect, useState } from 'react';
import vacineApi from '../services/vacineApi';
import './styles/MinhasVacinas.css';

const MinhasVacinas = ({ onLogout }) => {
  // Estados principais
  const [vacinas, setVacinas] = useState([]); // Lista de vacinas
  const [novaVacina, setNovaVacina] = useState({ nome: '', data: '', local: '', dose: '', objetivo: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [editandoId, setEditandoId] = useState(null); // ID da vacina em edição
  const [vacinaEditada, setVacinaEditada] = useState(null); // Dados temporários para edição

  const token = localStorage.getItem('token'); // Token JWT para autenticação

  // Busca vacinas do usuário autenticado
  const buscarVacinas = () => {
    vacineApi.get('/vacinas')
      .then(res => {
        const ordenadas = res.data.sort((a, b) => new Date(b.data) - new Date(a.data)); // ordena por data decrescente
        setVacinas(ordenadas);
      })
      .catch(() => setErro('Erro ao carregar vacinas.'));
  };

  // Carrega vacinas ao montar o componente, se usuário estiver autenticado
  useEffect(() => {
    if (token) buscarVacinas();
  }, []);

  // Valida se todos os campos obrigatórios foram preenchidos
  const validarCampos = (vacina) => {
    const { nome, data, local, dose, objetivo } = vacina;
    return nome && data && local && dose && objetivo;
  };

  // Cadastra nova vacina
  const adicionarVacina = () => {
    if (!validarCampos()) {
      setErro('Preencha todos os campos.');
      return;
    }

    vacineApi.post('/vacinas', novaVacina)
      .then(() => {
        buscarVacinas();
        setNovaVacina({ nome: '', data: '', local: '', dose: '', objetivo: '' });
        setMensagem('Vacina cadastrada com sucesso.');
        setErro('');
      })
      .catch(err => {
        console.error(err);
        setErro('Erro ao cadastrar vacina.');
      });
  };

  // Exclui vacina confirmada pelo usuário
  const excluirVacina = (id) => {
    if (!window.confirm('Deseja realmente excluir esta vacina?')) return;

    vacineApi.delete('/vacinas/' + id)
      .then(() => {
        buscarVacinas();
        setMensagem('Vacina removida.');
      })
      .catch(err => {
        console.error(err);
        setErro('Erro ao excluir vacina.');
      });
  };

  // Inicia o processo de edição de uma vacina
  const iniciarEdicao = (vacina) => {
    setEditandoId(vacina.objectId);
    setVacinaEditada({
      nome: vacina.nome,
      data: vacina.data?.iso?.split('T')[0],
      local: vacina.local,
      dose: vacina.dose,
      objetivo: vacina.objetivo
    });
  };

  // Salva edição no servidor
  const salvarEdicao = (id) => {
    if (!validarCampos(vacinaEditada)) {
      setErro('Preencha todos os campos.');
      return;
    }

    const vacinaFormatada = {
      ...vacinaEditada,
      data: {
        __type: "Date",
        iso: new Date(vacinaEditada.data).toISOString()
      }
    };

    vacineApi.put('/vacinas/' + id, vacinaFormatada)
      .then(() => {
        setMensagem('Vacina atualizada com sucesso.');
        setEditandoId(null);
        buscarVacinas();
      })
      .catch(() => setErro('Erro ao atualizar vacina.'));
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setVacinaEditada(null);
  };

  // Se o token estiver ausente, exibe tela de bloqueio
  if (!token) {
    return (
      <div className="vacina-container">
        <div className="vacina-error">
          Você precisa estar logado para acessar essa página.
        </div>
        <a href="/login">
          <button className="vacina-logout">Ir para Login</button>
        </a>
      </div>
    );
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
            {editandoId === v.objectId ? (
              <>
                <input value={vacinaEditada.nome} onChange={(e) => setVacinaEditada({ ...vacinaEditada, nome: e.target.value })} />
                <input type="date" value={vacinaEditada.data} onChange={(e) => setVacinaEditada({ ...vacinaEditada, data: e.target.value })} />
                <input value={vacinaEditada.local} onChange={(e) => setVacinaEditada({ ...vacinaEditada, local: e.target.value })} />
                <input value={vacinaEditada.dose} onChange={(e) => setVacinaEditada({ ...vacinaEditada, dose: e.target.value })} />
                <input value={vacinaEditada.objetivo} onChange={(e) => setVacinaEditada({ ...vacinaEditada, objetivo: e.target.value })} />
                <button onClick={() => salvarEdicao(v.objectId)}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <h3>{v.nome}</h3>
                <p><strong>Data:</strong> {new Date(v.data?.iso).toLocaleDateString()}</p>
                <p><strong>Local:</strong> {v.local}</p>
                <p><strong>Dose:</strong> {v.dose}</p>
                <p><strong>Objetivo:</strong> {v.objetivo}</p>
                <button onClick={() => iniciarEdicao(v)}>Editar</button>
                <button onClick={() => excluirVacina(v.objectId)}>Excluir</button>
              </>
            )}
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
