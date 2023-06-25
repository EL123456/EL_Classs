import './App.css';
import React, { useEffect, useState } from 'react'
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';

export default function App() {

  const [recipes,setRecipes] = useState([]);
  const [selectedRecipe,selectRecipe] = useState();

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await fetch('recipes.json');
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        const data = await response.json();
        setRecipes(data);
      } catch (e) {
        console.error(e);
      }
    }

    getRecipes()
  })
  
  
  return (
    <div className='siteContent'>
        <h1>Recipes</h1>
        <RecipeList recipes={recipes} selectRecipe={selectRecipe}/>
        <RecipeDetails selectedRecipe={selectedRecipe}/>
    </div>
  )
}