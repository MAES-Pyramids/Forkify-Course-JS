// https://forkify-api.herokuapp.com/v2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
///////////////////////////////////////
import * as model from './model.js';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultView from './view/resultView';

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
    recipeView.render(model.state.exportedRecipe);
  } catch (error) {
    console.log(error);
    recipeView.renderErrorMessage();
  }
}

// Render Searches
async function controlSearch() {
  try {
    const query = searchView.getQueries();
    if (!query) return;

    resultView.renderSpinner();

    // fetch Searches
    await model.loadSearch(query);

    resultView.render(model.state.search.result);
  } catch (error) {
    console.log(error);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearch);
}
init();
