import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';

import { listRecipes } from '../../graphql/queries';
import { deleteRecipe as deleteRecipeMutation } from '../../graphql/mutations';

import './styles.css';

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

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
    
    setRecipes(recipesFromAPI);
  }

  async function deleteRecipe({ id }) {
    const recipesNewArray = recipes.filter(recipe => recipe.id !== id);

    setRecipes(recipesNewArray);

    await API.graphql({ query: deleteRecipeMutation, variables: { input: { id } }});
  }

  return (
    <div className="recipes-container">
      <Link to="/" className="back-link">
        <h2>Home</h2>
      </Link>

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div className="recipe" key={recipe.id || recipe.title}>
            {recipe.image && <img src={recipe.image} alt={recipe.title + ' Imagem'} />}

            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>{recipe.ingredients}</p>
            
            <button onClick={() => deleteRecipe(recipe)}>Remover receita</button>
          </div>    
         ))}   
      </div>
    </div>
  )
}