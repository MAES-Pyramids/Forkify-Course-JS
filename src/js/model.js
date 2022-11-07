import { async } from 'regenerator-runtime';
import { URL, MAX_RESULTS_NUMBER } from './config.js';
import { GetJSON } from './helper.js';

export const state = {
  exportedRecipe: {},
  search: {
    query: '',
    current_page: 1,
    results_number: MAX_RESULTS_NUMBER,
    result: [],
  },
  bookmarks: [],
};
///////////////////////////////////////
export const loadRecipe = async function (id) {
  try {
    const data = await GetJSON(`${URL}${id}`);
    const { recipe } = data.data;
    state.exportedRecipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.exportedRecipe.bookmarked = true;
    else state.exportedRecipe.bookmarked = false;
  } catch (err) {
    // console.error(err);
    throw err;
  }
};
///////////////////////////////////////
export const loadSearch = async function (query) {
  try {
    state.search.query = query;
    const data = await GetJSON(`${URL}?search=${query}`);
    state.search.result = data.data.recipes.map(result => {
      return {
        id: result.id,
        title: result.title,
        publisher: result.publisher,
        image: result.image_url,
      };
    });
    state.search.current_page = 1;
  } catch (err) {
    throw err;
  }
};
///////////////////////////////////////
export const getSearchResultsPage = function (
  page = state.search.current_page
) {
  state.search.current_page = page;
  const start = (page - 1) * state.search.results_number;
  const end = page * state.search.results_number;
  return state.search.result.slice(start, end);
};
///////////////////////////////////////
export const updateService = function (
  new_serving = state.exportedRecipe.servings
) {
  state.exportedRecipe.ingredients.forEach(element => {
    element.quantity =
      element.quantity * (new_serving / state.exportedRecipe.servings);
  });
  state.exportedRecipe.servings = new_serving;
};
///////////////////////////////////////
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
///////////////////////////////////////
export const addBookmarks = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id == state.exportedRecipe.id)
    state.exportedRecipe.bookmarked = true;

  persistBookmarks();
};
///////////////////////////////////////
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.exportedRecipe.id) state.exportedRecipe.bookmarked = false;
  persistBookmarks();
};
///////////////////////////////////////
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
