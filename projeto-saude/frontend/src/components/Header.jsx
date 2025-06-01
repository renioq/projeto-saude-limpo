import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <nav className="header-nav">
    <Link to="/login">Login</Link>
    <Link to="/catalog">Unidades</Link>
    <Link to="/articles">Artigos</Link>
    <Link to="/vacinas">Minhas Vacinas</Link>
  </nav>
);

export default Header;
