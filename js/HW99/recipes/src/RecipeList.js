import React from 'react'

export default function RecipeList({recipes,selectRecipe}) {

    
    return (
        <div>
            <select onChange={(e) => {
                const recipe = recipes.find(recipe => recipe.name === e.target.value);
                selectRecipe(recipe.id)
            }}>
                <option hidden >Choose a recipe</option>
                {recipes?.map((recipe) => <option key={recipe.id}>{recipe.name}</option>)}
            </select>
        </div>
    
  )
}