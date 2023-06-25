import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';

export default function RecipeDetails({selectedRecipe}) {

    const [recipe, setRecipe] = useState();
    
    useEffect(() => {
      async function getRecipe() {
          try {
              const response = await fetch(`${selectedRecipe}.json`);
              if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
              }
              const data = await response.json();
              setRecipe(data)
          } catch(e) {
              console.error(e);
          }
      }

      getRecipe();
    },[selectedRecipe]);

    return (
      <>
        {selectedRecipe !== 0 && recipe
        ? <Recipe recipe={recipe}/>
        : <div>
            <h3 className='site'>Select a Recipe</h3>
          </div>}
      </>
    )
}

/*

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
      
    )
  }
}

 */