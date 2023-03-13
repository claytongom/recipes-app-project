const MEALS = 'meals';
const DRINKS = 'drinks';

export const getUrl = (idRecipe, path) => {
  if (path.includes(MEALS)) {
    return {
      type: MEALS,
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`,
    };
  }
  if (path.includes(DRINKS)) {
    return {
      type: DRINKS,
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`,
    };
  }
};
