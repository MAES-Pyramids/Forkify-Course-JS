// https://forkify-api.herokuapp.com/v2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
///////////////////////////////////////
import * as model from './model.js';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultView from './view/resultView';
import paginationView from './view/paginationView';

///////////////////////////////////////
// Render Recipes
async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // @) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());

    await model.loadRecipe(id); //we are calling async function inside a async so we need to wait

    //Render Recipes
    recipeView.render(model.state.exportedRecipe);
  } catch (error) {
    console.error(error);
    recipeView.renderErrorMessage();
  }
}

// Render Searches
async function controlSearch() {
  try {
    const query = searchView.getQueries();
    if (!query) return;

    resultView.renderSpinner();

    await model.loadSearch(query);

    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
}

function controlPagination(page_number) {
  resultView.render(model.getSearchResultsPage(page_number));
  paginationView.render(model.state.search);
}

function controlServicesNumber(servicesNumber) {
  model.updateService(servicesNumber);
  recipeView.update(model.state.exportedRecipe);
}

function controlBookmarks() {
  if (!model.state.exportedRecipe.bookmarked)
    model.addBookmarks(model.state.exportedRecipe);
  else {
    model.deleteBookmark(model.state.exportedRecipe.id);
  }

  recipeView.update(model.state.exportedRecipe);
}

// publisher subscriber pattern for adding event listener
function init() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandleServices(controlServicesNumber);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
}
init();
