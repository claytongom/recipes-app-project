export const createLocalFavRecipe = () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
};

export const verifyLocalFavRecipe = () => {
  if (!localStorage.getItem('favoriteRecipes')) {
    createLocalFavRecipe();
    return false;
  }
  return true;
};

export const getFavoritesRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return favoriteRecipes;
};

export const addToFavoriteRecipes = (idRecipe, recipe) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    } else if (!favoriteRecipes.some((el) => el.id === idRecipe)) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipes, recipe]),
      );
    }
  }
};

export const removeFromFavoriteRecipes = (idRecipe) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes.some((el) => el.id === idRecipe)) {
      const newFavorites = favoriteRecipes.filter((fav) => fav.id !== idRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  }
};

export const recipeIsInFavoriteRecipes = (idRecipe, fn) => {
  if (verifyLocalFavRecipe) {
    const favoriteRecipes = getFavoritesRecipes();
    const favoriteVerify = favoriteRecipes.some((el) => el.id === idRecipe);
    fn(favoriteVerify);
  }
};
