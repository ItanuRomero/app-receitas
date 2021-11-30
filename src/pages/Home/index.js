import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export const Home = () => {
  return (
    <div className="home-container">
      <Link to="/recipes" className="recipes-link">
        <h1>Ver receitas</h1>
      </Link>

      <Link to="/create-recipe" className="create-recipe-link">
        <h1>Criar receitas</h1>
      </Link>
    </div>
  );
}
