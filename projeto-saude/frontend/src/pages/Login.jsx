import React, { useState } from 'react';
import axios from 'axios';
import './styles/Login.css';


const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cadastroAtivo, setCadastroAtivo] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const realizarLogin = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE + '/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess();
      setMensagem('Login realizado com sucesso!');
    } catch (error) {
      alert('Login inválido');
      console.error(error);
    }
  };

const realizarCadastro = async () => {
    try {
      await axios.post('https://parseapi.back4app.com/users', {
        username,
        password
      }, {
        headers: {
          'X-Parse-Application-Id': import.meta.env.VITE_BACK4APP_APP_ID,
          'X-Parse-REST-API-Key': import.meta.env.VITE_BACK4APP_REST_KEY,
          'Content-Type': 'application/json'
        }
      });
      setMensagem('Usuário cadastrado com sucesso! Faça login.');
      setCadastroAtivo(false);
    } catch (error) {
      alert('Erro ao cadastrar usuário');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>{cadastroAtivo ? 'Cadastrar novo usuário' : 'Login'}</h2>
  
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
  
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
  
      {!cadastroAtivo ? (
        <>
          <button onClick={realizarLogin}>Entrar</button>
          <small>Não tem conta? <button onClick={() => setCadastroAtivo(true)}>Cadastrar</button></small>
        </>
      ) : (
        <>
          <button onClick={realizarCadastro}>Criar Conta</button>
          <small>Já tem conta? <button onClick={() => setCadastroAtivo(false)}>Fazer login</button></small>
        </>
      )}
  
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
  
};

export default Login;
