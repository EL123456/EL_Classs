import React, { Component } from 'react'
import Recipe from './Recipe';

export default class RecipeDetails extends Component {

  state = {
    recipe: {},
    pictureShowing: true
  }

  async componentDidUpdate(prevProps) {
    if((this.props.selectedRecipe !== 0 && prevProps.selectedRecipe !== this.props.selectedRecipe) || (Object.keys(this.state.recipe).length === 0 && this.props.selectedRecipe !== 0)) {
      await this.getRecipe();
    }
  }

  async getRecipe() {
    try {
      const response = await fetch(`${this.props.selectedRecipe}.json`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const data = await response.json();
      this.setState({
        recipe: data
      });
    } catch(e) {
      console.error(e);
    }
  }

  togglePicture = () => {
    this.setState({
      pictureShowing: !this.state.pictureShowing
    })
  }

  render() {
    return (
      <>
        {this.props.selectedRecipe !== 0
        ? <Recipe recipe={this.state.recipe} pictureShowing={this.state.pictureShowing} setPictureShowing={this.togglePicture}/>
        : <div>
          <h3 className='site'>Select a Recipe</h3>
          </div>}
      </>
    )
  }
}

