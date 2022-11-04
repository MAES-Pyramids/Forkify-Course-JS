// https://forkify-api.herokuapp.com/v2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
///////////////////////////////////////
import * as model from './model.js';
import recipeView from './view/recipeview';

const recipeContainer = document.querySelector('.recipe');
///////////////////////////////////////
// Render Recipes
async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // fetch Recipe
    await model.loadRecipe(id); //we are calling async function inside a async so we need to wait

    //Render Recipes
    recipeView.renderRecipe(model.state.exportedRecipe);
  } catch (error) {
    alert(error);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
}
init();
