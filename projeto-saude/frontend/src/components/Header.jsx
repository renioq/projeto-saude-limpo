import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/login">Login</Link> | <Link to="/catalog">Unidades</Link> | <Link to="/articles">Artigos</Link> | <Link to="/minhasvacinas">Minhas Vacinas</Link>
  </nav>
);

export default Header;
