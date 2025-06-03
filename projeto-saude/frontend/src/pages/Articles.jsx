import React, { useEffect, useState } from 'react';
import articleApi from '../services/articleApi';
import './styles/Articles.css';

const Articles = () => {
  // Estados para categoria buscada, artigos retornados e controle de UI
  const [categoria, setCategoria] = useState('');
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  // Ao carregar a página, busca artigos genéricos (destaques)
  useEffect(() => {
    buscarEmDestaque();
  }, []);

  // Busca inicial genérica
  const buscarEmDestaque = async () => {
    setLoading(true);
    try {
      const response = await articleApi.get('/articles');
      setArtigos(response.data.slice(0, 5)); // exibe 5 artigos
      setBuscou(false);
    } catch (error) {
      console.error('Erro ao buscar artigos em destaque:', error);
    }
    setLoading(false);
  };

  // Busca por categoria selecionada
  const buscarPorCategoria = async () => {
    if (!categoria) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    setLoading(true);
    setBuscou(true);
    try {
      const response = await articleApi.get('/articles', {
        params: { categoria }
      });
      setArtigos(response.data);
    } catch (error) {
      console.error('Erro ao buscar artigos por categoria:', error);
    }
    setLoading(false);
  };

  return (
    <div className="articles-container">
      <h1>Notícias de Saúde</h1>

      <div className="form-wrapper">
        <div>
          <label>Categoria: </label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione</option>
            <option value="saude mental">Saúde Mental</option>
            <option value="nutrição">Nutrição</option>
            <option value="bem-estar">Bem-estar</option>
            <option value="exercício">Exercício</option>
            <option value="sono">Sono</option>
          </select>
          <button onClick={buscarPorCategoria}>Buscar</button>
        </div>
      </div>

      {loading && <p>Carregando artigos...</p>}
      {!loading && buscou && artigos.length === 0 && (
        <p>Nenhum artigo encontrado para a categoria selecionada.</p>
      )}

      <ul className="container">
        {artigos.map((artigo, index) => (
          <li key={index} className="card">
            <h3>{artigo.titulo}</h3>
            <p>{artigo.descricao}</p>
            <a href={artigo.url} target="_blank" rel="noopener noreferrer">
              Ler mais
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;