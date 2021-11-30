import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { AppRoutes } from './routes';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './styles/global.css';

function App() {
  return (
    <Router>
      <Header/>
      
      <main>
        <AppRoutes />
      </main>
      
      <Footer/>
    </Router>
  );
}

export default withAuthenticator(App);
