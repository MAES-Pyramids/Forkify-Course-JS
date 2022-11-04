import { async } from 'regenerator-runtime';
import { URL } from './config.js';
import { GetJSON } from './helper.js';

export const state = {
  exportedRecipe: {},
};
///////////////////////////////////////
export const loadRecipe = async function (id) {
  try {
    const data = await GetJSON(`${URL}/${id}`);
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
  } catch (err) {
    console.error(err);
  }
};
///////////////////////////////////////
