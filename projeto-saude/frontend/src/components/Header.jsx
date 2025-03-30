import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/catalog">Unidades</Link> | <Link to="/articles">Artigos</Link>
  </nav>
);

export default Header;
