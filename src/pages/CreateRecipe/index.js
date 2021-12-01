import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { Link } from 'react-router-dom';

import { listRecipes } from '../../graphql/queries'
import { createRecipe as createRecipeMutation } from '../../graphql/mutations';

import './styles.css';

const formFirstBreath = {
  title: '',
  description: '',
  ingredients: '',
  portions: 0,
  preparationMethod: '',
  tips: '',
  preparationTime: '',
}

export const CreateRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState(formFirstBreath);

  useEffect(() => {
      fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const apiData = await API.graphql({ query: listRecipes });
    const recipesFromAPI = apiData.data.listRecipes.items;

    await Promise.all(
      recipesFromAPI.map(async recipe => {
        if (recipe.image) {
          const image = await Storage.get(recipe.image);
          recipe.image = image;
        }

        return recipe;
      })
    );

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
    
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }

    setRecipes([ ...recipes, formData ]);
    setFormData(formFirstBreath);
  }

  async function processImage(e) {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];

    setFormData({ ...formData, image: file.name });

    await Storage.put(file.name, file);

    fetchRecipes();
  }
  
  return (
    <div className="crate-recipe-container">
      <Link to="/" className="back-link">
        <h2>Home</h2>
      </Link>

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

        <input
          type="file"
          onChange={processImage}
        />

        <button onClick={createRecipe}>Salvar receita</button>
      </form>
    </div>
  );
}
