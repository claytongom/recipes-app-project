export const createLocalDoneRecipes = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
};

export const verifyLocalDoneRecipes = () => {
  if (!localStorage.getItem('doneRecipes')) {
    createLocalDoneRecipes();
    return false;
  }
  return true;
};

export const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return doneRecipes;
};

export const addToDoneRecipes = (idRecipe, recipe) => {
  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = getDoneRecipes();

    if (doneRecipes.length === 0) {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    } else if (!doneRecipes.some((el) => el.id === idRecipe)) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, recipe]),
      );
    }
  }
};

export const removeFromDoneRecipes = (idRecipe) => {
  if (verifyLocalDoneRecipes()) {
    const doneRecipes = getDoneRecipes();
    if (doneRecipes.some((el) => el.id === idRecipe)) {
      const newDoneRecipes = doneRecipes.filter(
        (recipe) => recipe.id !== idRecipe,
      );
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
  }
};

export const recipeIsInDoneRecipes = (idRecipe, fn) => {
  if (verifyLocalDoneRecipes()) {
    const doneRecipes = getDoneRecipes();
    const doneRecipesVerify = doneRecipes.some((el) => el.id === idRecipe);
    fn(doneRecipesVerify);
  }
};
