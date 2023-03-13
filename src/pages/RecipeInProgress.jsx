import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BtnFinish from '../components/BtnFinish';
import BtnsFavAndShare from '../components/BtnsFavAndShare';
import getTitleAndButton from '../helpers/getTitleAndButton';
import { fetchByIds } from '../services/fetchs';
import {
  getInProgressRecipes,
  updateInProgressRecipes,
} from '../services/inProgressRecipesLS';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [pageInfo] = useState(getTitleAndButton(pathname));
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    fetchByIds(pageInfo.title, id, setRecipe);
    setIngredients(getInProgressRecipes()[pageInfo.title.toLowerCase()][id]);
  }, [id, pageInfo]);

  useEffect(() => {
    if (ingredients.length > 0) {
      const verifyCheck = ingredients.some(
        (ingredient) => ingredient.checked === false,
      );
      updateInProgressRecipes(id, pageInfo.title, ingredients);
      setIsFinished(verifyCheck);
    }
  }, [ingredients, id, pageInfo]);

  const handleChange = (index) => {
    const newInstructions = [...ingredients];
    newInstructions[index].checked = !newInstructions[index].checked;
    setIngredients(newInstructions);
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMealThumb || recipe.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <BtnsFavAndShare id={ id } recipe={ recipe } type={ pageInfo.title } />

      <h2>Category</h2>
      <p data-testid="recipe-category">
        {pageInfo.title === 'Meals' ? recipe.strCategory : recipe.strAlcoholic}
      </p>

      <h2>Ingredientes</h2>
      <div>
        {ingredients.map((ingredient, index) => (
          <label key={ index }>
            <input
              type="checkbox"
              checked={ ingredient.checked }
              data-testid={ `${index}-ingredient-step` }
              onChange={ () => handleChange(index) }
            />
            <span className={ ingredient.checked ? 'CheckBoxColor' : undefined }>
              {`${ingredient.ingredient} - ${ingredient.measure}`}
            </span>
          </label>
        ))}
      </div>

      <h2>Intructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <BtnFinish isFinished={ isFinished } />
    </div>
  );
}

export default RecipeInProgress;
