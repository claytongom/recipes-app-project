export const createLocalInProgressRecipe = () => {
  const inProgressRecipes = {
    drinks: {},
    meals: {},
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const verifyLocalInProgressRecipe = () => {
  if (!localStorage.getItem('inProgressRecipes')) {
    createLocalInProgressRecipe();
    return false;
  }
  return true;
};

export const getInProgressRecipes = () => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  return inProgressRecipes;
};

export const addToInProgressRecipes = (idRecipe, type, ingredients) => {
  if (verifyLocalInProgressRecipe()) {
    const inProgressRecipes = getInProgressRecipes();
    if (!inProgressRecipes[type][idRecipe]) {
      const newProgress = {
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [idRecipe]: ingredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
    }
  }
};

export const removeFromInProgressRecipes = (idRecipe, type) => {
  if (verifyLocalInProgressRecipe()) {
    const inProgressRecipes = getInProgressRecipes();
    delete inProgressRecipes[type][idRecipe];
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
};

export const recipeIsInProgressRecipes = (idRecipe, type, fn) => {
  if (verifyLocalInProgressRecipe) {
    const inProgressRecipes = getInProgressRecipes();
    const inProgressKeys = Object.keys(inProgressRecipes[type]);
    const inProgressVerify = inProgressKeys.some((key) => key === idRecipe);
    fn(inProgressVerify);
  }
};
