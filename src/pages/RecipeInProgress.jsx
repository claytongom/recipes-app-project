import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BtnFinish from '../components/BtnFinish';
import BtnsFavAndShare from '../components/BtnsFavAndShare';
import getTitleAndButton from '../helpers/getTitleAndButton';
import { fetchByIds } from '../services/fetchs';
import {
  getInProgressRecipes,
  updateInProgressRecipes,
} from '../services/inProgressRecipesLS';
import DetailsHeader from '../styles/DetailsHeader';
import DetailsImage from '../styles/DetailsImage';
import DetailsWrapper from '../styles/DetailsWrapper';
import logo from '../images/chef.png';
import PatternHeading from '../styles/PatternHeading';
import RadioWrapper from '../styles/RadioWrapper';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [pageInfo] = useState(getTitleAndButton(pathname));
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    fetchByIds(pageInfo.title, id, setRecipe);
  }, [id, pageInfo]);

  useEffect(() => {
    const getIngredients = () => {
      const ingredientData = Object.entries(recipe).filter((item) => {
        const str = item[0].includes('strIngredient') || item[0].includes('strMeasure');
        const isNotNull = item[1];
        const isNotEmpty = isNotNull
          ? item[1] !== '' && item[1] !== ' '
          : isNotNull;
        if (str && isNotEmpty) {
          return item;
        }
        return false;
      });

      // Partindo no meio o array que veio metade ingrediente e metade medidas
      const max = ingredientData.length / 2;
      const ingredientPart = ingredientData
        .slice(0, max)
        .map((ingredient) => ingredient[1]);

      const measurePart = ingredientData
        .slice(max)
        .map((measure) => measure[1]);
      // o map acima retira somente os nomes e valores.

      // o map abaixo junta o nome e valor do ingrediente e um objeto e faz um array com esses objetos
      return ingredientPart.map((ingredient, index) => ({
        ingredient,
        measure: measurePart[index],
        checked: false,
      }));
    };
    setIngredients(
      getInProgressRecipes()[pageInfo.title.toLowerCase()][id]
        || getIngredients(),
    );
  }, [recipe, pageInfo, id]);

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
    <>
      <DetailsHeader>
        <img src={ logo } alt="Imagem logo" />
        <PatternHeading data-testid="recipe-title">
          {recipe.strMeal || recipe.strDrink}
        </PatternHeading>
      </DetailsHeader>
      <DetailsWrapper>
        <DetailsImage
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid="recipe-photo"
        />

        <BtnsFavAndShare id={ id } recipe={ recipe } type={ pageInfo.title } />

        <h2>Category</h2>
        <p data-testid="recipe-category">
          {pageInfo.title === 'Meals'
            ? recipe.strCategory
            : recipe.strAlcoholic}
        </p>

        <h2>Ingredientes</h2>
        <RadioWrapper>
          {ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ ingredient.checked ? 'marked' : undefined }
            >
              <input
                type="checkbox"
                checked={ ingredient.checked }
                onChange={ () => handleChange(index) }
              />
              <span>{`${ingredient.ingredient} - ${ingredient.measure}`}</span>
            </label>
          ))}
        </RadioWrapper>

        <h2>Intructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </DetailsWrapper>
      <BtnFinish
        isFinished={ isFinished }
        history={ useHistory() }
        id={ id }
        recipe={ recipe }
        type={ pageInfo.title }
      />
    </>
  );
}

export default RecipeInProgress;
