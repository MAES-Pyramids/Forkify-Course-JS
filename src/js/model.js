import { async } from 'regenerator-runtime';

export const state = {
  exportedRecipe: {},
};
///////////////////////////////////////
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

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
    alert(err);
  }
};
///////////////////////////////////////
