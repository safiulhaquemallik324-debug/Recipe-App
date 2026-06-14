const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchMeals = async (query) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await response.json();

  return data.meals || [];
};

export const getMealSuggestions = async (query) => {
  if (!query.trim()) return [];

  const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await response.json();

  return data.meals ? data.meals.slice(0, 5) : [];
};