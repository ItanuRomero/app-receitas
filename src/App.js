import logo from './logo.svg';
import React from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>É isso time</h1>
        <p>Agora com Auth:</p>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
