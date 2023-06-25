import './App.css';
import React, { Component } from 'react'
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';

export default class App extends Component {
  //css?

  //then hw100

  state = {
    recipes: [],
    selectedRecipe: 0
  }
  
  selectRecipe = (selectedRecipe) => {
    this.setState({
      selectedRecipe: selectedRecipe
    })
  }

  async componentDidMount() {
    await this.getRecipes();
  }

  async getRecipes() {
    try {
      const response = await fetch('recipes.json');
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const data = await response.json();
      this.setState({
        recipes: data
      })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className='siteContent'>
        <h1>Recipes</h1>
        <RecipeList recipes={this.state.recipes} selectRecipe={this.selectRecipe}/>
        <RecipeDetails selectedRecipe={this.state.selectedRecipe}/>
      </div>
    )
  }
}
