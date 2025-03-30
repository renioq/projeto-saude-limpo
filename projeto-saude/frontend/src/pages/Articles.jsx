import React, { useEffect, useState } from 'react';
import articleApi from '../services/articleApi';
import Header from '../components/Header.jsx';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');

  const categories = [
    { label: 'Todas', value: '' },
    { label: 'Saúde Mental', value: 'saúde mental' },
    { label: 'Nutrição', value: 'nutrição' },
    { label: 'Atividade Física', value: 'atividade física' },
    { label: 'Doenças e Prevenção', value: 'doenças prevenção' },
    { label: 'Vacinação', value: 'vacinação' },
    { label: 'Sistema de Saúde', value: 'SUS hospitais' }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await articleApi.get('/articles', {
          params: category ? { q: category } : {}
        });
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <>
      <Header />
      <h1>Notícias de Saúde</h1>

      <label>
        Filtrar por categoria:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </label>

      <div>
        {articles.map((art, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <h2>{art.title}</h2>
            <p>Fonte: {art.source}</p>
            <a href={art.link} target="_blank" rel="noopener noreferrer">Ler mais</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Articles;
