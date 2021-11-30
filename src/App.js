import React from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/home';

function App() {
  return (
      <div className="App">
        <Header/>
          <Home/>
        <Footer />
      </div>
  );
}

export default withAuthenticator(App);
