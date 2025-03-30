import React, { useEffect, useState } from 'react';
import articleApi from '../services/articleApi';
import Header from '../components/Header';

const Articles = () => {
  const [categoria, setCategoria] = useState('');
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  // Buscar artigos genéricos ao iniciar
  useEffect(() => {
    buscarEmDestaque();
  }, []);

  const buscarEmDestaque = async () => {
    setLoading(true);
    try {
      const response = await articleApi.get('/articles');
      setArtigos(response.data.slice(0, 5)); // apenas 5 artigos
      setBuscou(false); // impede a mensagem "nenhum artigo" aparecer
    } catch (error) {
      console.error('Erro ao buscar artigos em destaque:', error);
    }
    setLoading(false);
  };

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
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Notícias de Saúde</h1>

        <div style={{ marginBottom: '10px' }}>
          <label>Categoria: </label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione</option>
            <option value="saude mental">Saúde Mental</option>
            <option value="nutrição">Nutrição</option>
            <option value="bem-estar">Bem-estar</option>
            <option value="exercício">Exercício</option>
            <option value="sono">Sono</option>
          </select>
          <button onClick={buscarPorCategoria} style={{ marginLeft: '10px' }}>
            Buscar
          </button>
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
    </>
  );
};

export default Articles;
