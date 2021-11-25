import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import { listRecipes } from './graphql/queries';
import { createRecipe as createRecipeMutation, deleteRecipe as deleteRecipeMutation } from './graphql/mutations';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const formFirstBreath = {
  title: '',
  description: '',
  ingredients: '',
  portions: 0,
  preparationMethod: '',
  tips: '',
  preparationTime: '',
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState(formFirstBreath);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const apiData = await API.graphql({ query: listRecipes });
    setRecipes(apiData.data.listRecipes.items);
  }

  async function createRecipe() {
    if (
      !formData.title
      || !formData.ingredients
      || !formData.preparationMethod
      || !formData.preparationTime
    ) return;
    await API.graphql({ query: createRecipeMutation, variables: { input: formData } });
    setRecipes([ ...recipes, formData ]);
    setFormData(formFirstBreath);
  }

  async function deleteRecipe({ id }) {
    const recipesNewArray = recipes.filter(recipe => recipe.id !== id);
    setRecipes(recipesNewArray);
    await API.graphql({ query: deleteRecipeMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>app-receitas</h1>
      </header>
      <main>
        <h1>
          Create your own recipe:
        </h1>
        <form>
          <input 
            onChange={e => setFormData({ ...formData, 'title': e.target.value})}
            placeholder="Título"
            value={formData.title}
          />
          <input
            type="text"
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
            placeholder="Descrição"
            value={formData.description}
          />
          <input 
            onChange={e => setFormData({ ...formData, 'ingredients': e.target.value})}
            placeholder="Ingredientes"
            value={formData.ingredients}
          />
          <input 
            onChange={e => setFormData({ ...formData, 'portions': parseInt(e.target.value)})}
            placeholder="Porções"
            value={formData.portions}
          />
          <input
            type="text" 
            onChange={e => setFormData({ ...formData, 'preparationMethod': e.target.value})}
            placeholder="Modo de preparo"
            value={formData.preparationMethod}
          />
          <input
            type="text" 
            onChange={e => setFormData({ ...formData, 'tips': e.target.value})}
            placeholder="Dicas"
            value={formData.tips}
          />
          <input
            onChange={e => setFormData({ ...formData, 'preparationTime': e.target.value})}
            placeholder="Tempo de preparo"
            value={formData.preparationTime}
          />
          <button onClick={createRecipe}>Salvar receita</button>
        </form>
        <div>
          {
            recipes.map(recipe => (
              <div key={recipe.id || recipe.title}>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.ingredients}</p>
                <button onClick={() => deleteRecipe(recipe)}>Apagar Receita</button>
              </div>
            ))
          }
        </div>
      </main>
      <footer>
        <AmplifySignOut />
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
