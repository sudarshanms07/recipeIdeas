// src/services/recipeApi.js
import axios from "axios";

const API_FILTER = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const API_LOOKUP = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export async function fetchRecipesByIngredient(ingredient) {
  try {
    const res = await axios.get(API_FILTER + encodeURIComponent(ingredient.trim()));
    return res.data.meals || [];
  } catch (error) {
    throw new Error("Network error. Please try again.");
  }
}

export async function fetchRecipeDetails(id) {
  try {
    const res = await axios.get(API_LOOKUP + id);
    return res.data.meals?.[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch recipe details.");
  }
}
