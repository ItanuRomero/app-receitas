import React, { useState, useEffect } from 'react';
import { listRecipes } from '../graphql/queries';
import { createRecipe as createRecipeMutation, deleteRecipe as deleteRecipeMutation } from '../graphql/mutations';
import { API, Storage } from 'aws-amplify';


function ListRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    async function fetchRecipes() {
        const apiData = await API.graphql({ query: listRecipes });
        const recipesFromAPI = apiData.data.listRecipes.items;
        await Promise.all(recipesFromAPI.map(async recipe => {
        if (recipe.image) {
            const image = await Storage.get(recipe.image);
            recipe.image = image;
        }
        return recipe;
        }))
        setRecipes(apiData.data.listRecipes.items);
    }

    async function deleteRecipe({ id }) {
        const recipesNewArray = recipes.filter(recipe => recipe.id !== id);
        setRecipes(recipesNewArray);
        await API.graphql({ query: deleteRecipeMutation, variables: { input: { id } }});
    }

    return(
        <div>
          {
            recipes.map(recipe => (
              <div key={recipe.id || recipe.title}>
                {
                  recipe.image && <img src={recipe.image} style={{width: 400}}  alt={recipe.title + ' Imagem'}/>
                }
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.ingredients}</p>
                <button onClick={() => deleteRecipe(recipe)}>Apagar Receita</button>
              </div>
            ))
          }
        </div>
    )
}

export default ListRecipes;