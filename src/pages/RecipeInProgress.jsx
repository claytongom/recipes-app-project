import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import copy from 'clipboard-copy';
import { fetchByIds } from '../services/fetchs';
import getTitleAndButton from '../helpers/getTitleAndButton';
// import whiteHeart from '../images/whiteHeartIcon.svg';
// import blackHeart from '../images/blackHeartIcon.svg';

export default function RecipesInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [pageInfo, setPageInfo] = useState({
    title: '',
    haveButton: true,
  });
  const [recipeData, setRecipeData] = useState({});
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    setPageInfo(getTitleAndButton(pathname));
  }, [pathname]);

  useEffect(() => {
    fetchByIds(pageInfo.title, id, setRecipeData);
  }, [id, pageInfo]);

  useEffect(() => {
    if (recipeData.strInstructions) {
      const splitedData = recipeData.strInstructions
        .split('.').filter((instruction) => instruction !== '');
      const objectData = splitedData.map((el) => ({
        name: el,
        checked: false,
      }));
      setInstructions(objectData);
    }
  }, [recipeData]);

  const handleChange = (index) => {
    const newInstructions = [...instructions];
    newInstructions[index].checked = !newInstructions[index].checked;
    setInstructions(newInstructions);
  };

  return (
    <div>
      <img
        src={ recipeData.strDrinkThumb || recipeData.strMealThumb }
        data-testid="recipe-photo"
        alt="Foto da receita"
      />
      <h1 data-testid="recipe-title">{ recipeData.strDrink || recipeData.strMeal }</h1>
      {/* <div className="FixedBottomLeft">
        {copied && <p>Link copied!</p>}
        <button
          data-testid="share-btn"
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
      </div> */}
      <h2 data-testid="recipe-category">{ recipeData.strCategory }</h2>
      <h3 data-testid="instructions">Instruções</h3>
      { instructions.map((el, index) => (
        <label key={ index }>
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
            onChange={ () => handleChange(index) }
          />
          { el.name }
        </label>
      ))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled="true"
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
