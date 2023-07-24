(function () {
    'use strict';

    const recipe_select = $('select');
    const single_recipe = $('#single_recipe');
    const recipe_form = $('#recipe_form');
    const add_recipe_button = $('#add_recipe');
    const ingredients_form = $('#ingredients_form');
    const name_input = $('#name');
    const picture_input = $('#picture');
    const add_input_button = $('#add_input');
    const remove_inputs = $('#remove_input');
    const cancel_button = $('#cancel');

    let editing;
    let editId;

    recipe_form.hide();

    (async () => {
        try {

            const response = await fetch('/api/recipes');
            if (!response.ok) {
                throw new Error(response.status,response.text());
            }

            let recipes = await response.json();

            if(!recipes.length) {
                single_recipe.empty();
                $(`
                    <h3>No Recipes Added</h3>
                `).appendTo(single_recipe);
                return;
            }

            recipes = recipes.sort((a,b) => a.name.localeCompare(b.name));

            recipes.forEach(recipe => {
                const {id,name} = recipe;
                $(`
                    <option value="${id}">${name}</option>
                `).appendTo(recipe_select);

            });

            recipe_select.change(show_recipe)
            
        } catch(e) {
            console.log(this.value)
        }
    })();

    add_recipe_button.on('click',() => {
        //maybe .show? decide when i do the absolute window of this thing
        if(!$('#edit').is(':disabled')) {
            $(`
                <input class="ingredients" required/>
            `).appendTo(ingredients_form);
            recipe_form.slideDown('slow');
            add_recipe_button.prop('disabled',true);
        } else {
            editing = false;
            recipe_form[0].reset();
            ingredients_form.empty()
            ingredients_form.text('Ingredients: ');
            $(`
                <input class="ingredients" required/>
            `).appendTo(ingredients_form);
            add_recipe_button.prop('disabled',true);
            $('#edit').prop('disabled',false)
        }
        
    })

    cancel_button.on('click',() => {
        form_cancel();
    });

    add_input_button.on('click',() => {
        $(`
            <input class="ingredients" required/>
        `).appendTo(ingredients_form);
    })

    remove_inputs.on('click',() => {
        ingredients_form.empty();
        ingredients_form.text('Ingredients: ')
        $(`
            <input class="ingredients" required/>
        `).appendTo(ingredients_form);
    });
    
    async function show_recipe(e) {

        form_cancel();

        async function get_recipe(id) {
            const response = await fetch(`/api/recipes/${id}`)
            if(!response.ok) {
                throw new Error(response.status,response.text());
            }
            const recipe = await response.json();
            return recipe;
        }

        const recipe = await get_recipe(this.value);
        const {name,picture,ingredients} = recipe;

        single_recipe.empty();

        const ingredient_list = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        
        
        const recipe_display  = $(`
            <div id="info_display">
                <h1>${name}</h1>
                <div>
                    <button id="edit">edit</button>
                    <button id="delete">delete</button>
                </div>
            </div>
            <img src=${picture} alt"pic of ${name}"/>
            <h4>Ingredients: </h4>
            <ul>
                ${ingredient_list}
            </ul>
        `).appendTo(single_recipe)

        recipe_display.find('#edit').on('click', () => {
            $('#edit').prop('disabled',true);
            add_recipe_button.prop('disabled',false);
            edit_form(this.value,recipe);
        })

        recipe_display.find('#delete').on('click', async () => await delete_form(this.value));
    }

    async function delete_form(id) {

        form_cancel();
        
        let agree = prompt('Are you sure you want to delete this? If that is so, please type in "DELETE"')
        if (agree === 'DELETE') {
            try {
                const response = await fetch(`/api/recipes/${id}`, {
                    method: 'DELETE'
                });

                if(!response.ok) {
                    throw new Error(response.status, response.text());
                }

                location.reload(true)
            } catch(e) {
                console.error(e)
            }
        } if(!agree) {
            alert('Enjoy your food!');
        } else if(agree !== 'DELETE') {
            alert(`That was not "DELETE". Therefore, your recipe won't be deleted. Enjoy your food!`);
        }
    }

    function edit_form(id,recipe) {

        editing = true;
        editId = id;

        const {name,picture,ingredients} = recipe;
        ingredients_form.empty();
        ingredients_form.text('Ingredients: ')
        ingredients.map(ingredient => {
            $(`<input class="ingredients" required/>`).val(ingredient).appendTo(ingredients_form);
        });

        name_input.val(name);
        picture_input.val(picture);

        recipe_form.slideDown('slow');
    }

    recipe_form.on('submit',async (e) => {
        e.preventDefault();
        
        const method = editing ? 'PUT' : 'POST';
        let url = editing? `/api/recipes/${editId}` : `api/recipes`;

        const newRecipe = {
            name: name_input.val(),
            picture: picture_input.val(),
            ingredients: []
        }

        const ingredient_names = $('#ingredients_form input');
        let ingredient_array = [];
        for (let i = 0; i < ingredient_names.length; i++) {
            ingredient_array.push($(ingredient_names[i]).val());
        }
        ingredient_array = JSON.stringify(ingredient_array);
        newRecipe.ingredients.push(ingredient_array);

        try {
            const response = await fetch(url, {
                method,
                body: JSON.stringify(newRecipe),
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(response.status, response.text());
            }

            location.reload(true)
        } catch(e) {
            console.error(e);
        }
    });

    function form_cancel () {
        recipe_form.slideUp('fast')
        recipe_form[0].reset();
        ingredients_form.empty();
        ingredients_form.text('Ingredients: ');
        if(add_recipe_button.is(":disabled")) {
            add_recipe_button.prop('disabled',false);
        }
        if($('#edit').is(':disabled')) {
            $('#edit').prop('disabled',false);
            editing = false;
        }
    }
}());