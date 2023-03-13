import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchByIds } from '../services/fetchs';
import getTitleAndButton from '../helpers/getTitleAndButton';
import { addToDoneRecipes } from '../services/doneRecipesLS';
import { recipeIsInFavoriteRecipes,
  addToFavoriteRecipes, removeFromFavoriteRecipes } from '../services/favoriteRecipesLS';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { getInProgressRecipes } from '../services/inProgressRecipesLS';

export default function RecipesInProgress() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();
  const [pageInfo] = useState(getTitleAndButton(pathname));
  const [recipeData, setRecipeData] = useState({});
  const [instructions, setInstructions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (copied) {
      const time = 1500;
      const copyTimeOut = setTimeout(() => {
        setCopied(false);
      }, time);
      return () => {
        clearTimeout(copyTimeOut);
      };
    }
  }, [copied]);

  useEffect(() => {
    fetchByIds(pageInfo.title, id, setRecipeData);
    const newIngredients = getInProgressRecipes();
    setInstructions(newIngredients[pageInfo.title.toLowerCase()][id]);
  }, [id, pageInfo]);

  useEffect(() => {
    const verifyCheck = instructions.some((el) => el.checked === false);
    setDisabled(verifyCheck);
    recipeIsInFavoriteRecipes(id, setIsFavorite);
  }, [instructions, id]);

  const handleChange = (index) => {
    const newInstructions = [...instructions];
    newInstructions[index].checked = !newInstructions[index].checked;
    setInstructions(newInstructions);
  };

  const toggleFav = () => {
    const recipe = {
      id: recipeData.idMeal || recipeData.idDrink,
      type: pageInfo.title === 'Meals' ? 'meal' : 'drink',
      nationality: recipeData.strArea || '',
      category: recipeData.strCategory || '',
      alcoholicOrNot: recipeData.strAlcoholic || '',
      name: recipeData.strMeal || recipeData.strDrink,
      image: recipeData.strMealThumb || recipeData.strDrinkThumb,
    };
    if (isFavorite) {
      removeFromFavoriteRecipes(id);
      setIsFavorite(false);
    } else {
      addToFavoriteRecipes(id, recipe);
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <img
        src={ recipeData.strDrinkThumb || recipeData.strMealThumb }
        data-testid="recipe-photo"
        alt="Foto da receita"
      />
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          copy(document.location.href);
          setCopied(true);
        } }
      >
        Compartilhar
      </button>
      <button onClick={ toggleFav }>
        Favoritar
        <img
          src={ isFavorite ? blackHeart : whiteHeart }
          alt="coração"
          data-testid="favorite-btn"
        />
      </button>
      <h1 data-testid="recipe-title">{ recipeData.strDrink || recipeData.strMeal }</h1>
      <div className="FixedBottomLeft">
        {copied && <p>Link copied!</p>}
      </div>
      <h2 data-testid="recipe-category">{ recipeData.strCategory }</h2>
      <h3 data-testid="instructions">Instruções</h3>
      { instructions.map((el, index) => (
        <label key={ index }>
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
            onChange={ () => handleChange(index) }
          />
          <span
            className={ el.checked ? 'CheckBoxColor' : undefined }
          >
            { el.ingredient }
          </span>
        </label>
      ))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => {
          addToDoneRecipes(id, recipeData);
          history.push('/done-recipes');
        } }
        disabled={ disabled }
        style={ {
          position: 'fixed',
          bottom: '0px',
        } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}
