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

export const addToDoneRecipes = (idRecipe, type, recipe) => {
  const date = Date.now();
  const today = new Date(date);
  const newRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: type === 'Meals' ? 'meal' : 'drink',
    nationality: recipe.strArea,
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strDrinkThumb || recipe.strMealThumb,
    doneDate: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`,
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };

  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = getDoneRecipes();

    if (doneRecipes.length === 0) {
      localStorage.setItem('doneRecipes', JSON.stringify([newRecipe]));
    } else if (!doneRecipes.some((el) => el.id === idRecipe)) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, newRecipe]),
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
