(async function () {
    'use strict';

    const RecipeSelect = $('#recipes');
    const RecipeContainter = $('#recipeContainer');

    async function loadJson(url) {
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    async function loadRecipes() {
        const recipes = await loadJson('./recipes.json');
        recipes.forEach(recipe => {
            RecipeSelect.append(`<option value="${recipe.id}">${recipe.name}</option>`)
        });

        RecipeSelect.change(RecipeSelected);
    }

    async function RecipeSelected(e) {
        RecipeContainter.empty();

        const recipe = await loadJson(`${this.value}.json`);

        $(`
            <h2>${recipe.name}</h2>
            <img src="${recipe.picture}"/>
            <h3>ingredients:</h3>
            <ul id="ingredientList"></ul>
        `).appendTo(RecipeContainter);
        recipe.ingredients.forEach(ingredient => {
            $(`<li>${ingredient}</li>`).appendTo('#ingredientList');
        })
    }

    loadRecipes();
}());

    /* <h2 id="name"></h2>
    <img id="picture">
    <h3 class="noRecipe">ingredients</h3>
    <ul id="ingredients"></ul> */