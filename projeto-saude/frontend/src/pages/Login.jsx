import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const realizarLogin = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE + '/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess();
    } catch (error) {
      alert('Login inválido');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={realizarLogin}>Entrar</button>
    </div>
  );
};

export default Login;
