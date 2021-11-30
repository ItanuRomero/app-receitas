import React from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'

import Header from './components/Header';
import Footer from './components/Footer';
import NewRecipe from './Pages/newRecipe';
import ListRecipes from './Pages/listRecipes';

function App() {

  return (
    <div className="App">
      <Header/>
      <main>
        <NewRecipe />
        <ListRecipes />
      </main>
      <Footer />
    </div>
  );
}

export default withAuthenticator(App);
