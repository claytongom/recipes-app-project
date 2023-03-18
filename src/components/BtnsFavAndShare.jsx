import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import share from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import {
  addToFavoriteRecipes,
  recipeIsInFavoriteRecipes,
  removeFromFavoriteRecipes,
} from '../services/favoriteRecipesLS';

function BtnsFavAndShare({ id, recipe, type }) {
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    recipeIsInFavoriteRecipes(id, setIsFavorite);
  }, [id]);

  // useEffect para remover o elemento criado com a msg de link copiado
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

  const copyFunction = () => {
    copy(`http://localhost:3000/${type.toLowerCase()}/${id}`);
    setCopied(true);
  };

  const toggleFavorite = () => {
    const newRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: type === 'Meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };
    if (isFavorite) {
      removeFromFavoriteRecipes(id);
      setIsFavorite(false);
    } else {
      addToFavoriteRecipes(id, newRecipe);
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <button onClick={ copyFunction }>
        <img src={ share } alt="share button" data-testid="share-btn" />
      </button>
      <button onClick={ toggleFavorite }>
        <img
          src={ isFavorite ? blackHeart : whiteHeart }
          alt="favorite button"
          data-testid="favorite-btn"
        />
      </button>
      {copied && <p>Link copied!</p>}
    </div>
  );
}

BtnsFavAndShare.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default BtnsFavAndShare;
