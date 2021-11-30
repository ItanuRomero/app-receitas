import React from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <div className="App">
        <Header/>
          <main>
              <Link to="/recipes">
                  <h1>Ver receitas</h1>
              </Link>
              <Link to="/new">
                  <h1>Criar receitas</h1>
              </Link>
          </main>
        <Footer/>
      </div>
  );
}

export default withAuthenticator(App);
