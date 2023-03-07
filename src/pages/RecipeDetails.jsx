import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MEALS = 'meals';
const DRINKS = 'drinks';
const urlApiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlApiMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeData, setRecipeData] = useState([]);
  const [strIngredient, setStrIngredient] = useState([]);
  const [video, setVideo] = useState('');
  const [dataApiDrinks, setDataApiDrinks] = useState([]);
  const [dataApiMeals, setDataApiMeals] = useState([]);

  // Função para definir a url para o fetch e verificar se é meal ou drink.
  const getUrl = () => {
    if (pathname.includes(MEALS)) {
      return {
        type: MEALS,
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      };
    }
    return {
      type: DRINKS,
      url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    };
  };
  const [urlAndType] = useState(getUrl());

  const getDataApiDrinkAndMeal = async () => {
    const responseDrinks = await fetch(urlApiDrinks);
    const dataDrinks = await responseDrinks.json();
    setDataApiDrinks(dataDrinks);
    const responseMeals = await fetch(urlApiMeals);
    const dataMeals = await responseMeals.json();
    setDataApiMeals(dataMeals);
  };

  // useEffect para fazer o fetch para alimentar o estado recipeData.
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(urlAndType.url);
      const data = await response.json();
      setRecipeData(data[urlAndType.type][0]);
    };
    fetchApi();
    getDataApiDrinkAndMeal();
  }, [urlAndType]);
  // useEffect usado para pegar os ingredientes válidos da receita.
  useEffect(() => {
    const getIngredients = () => {
      const ingredientData = Object.entries(recipeData).filter((item) => {
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
      }));
    };
    setStrIngredient(getIngredients());
  }, [recipeData]);

  // useEffect para pegar o id da url do vídeo do youtube.
  useEffect(() => {
    if (recipeData.strYoutube) {
      const cut = 32;
      const videoId = recipeData.strYoutube.slice(cut);
      setVideo(videoId);
    }
  }, [recipeData.strYoutube]);

  const ingredientElements = strIngredient.map((item, index) => {
    const { ingredient, measure } = item;
    return (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
        {`${ingredient} - ${measure}`}
      </li>
    );
  });

  const type = urlAndType.type === MEALS ? 'Meal' : 'Drink';

  return (
    <div>
      <h1 data-testid="recipe-title">{recipeData[`str${type}`]}</h1>

      <img
        src={ recipeData[`str${type}Thumb`] }
        alt={ `Recipe ${recipeData[`str${type}`]}` }
        data-testid="recipe-photo"
      />

      {urlAndType.type === MEALS ? (
        <p data-testid="recipe-category">{recipeData.strCategory}</p>
      ) : (
        <p data-testid="recipe-category">{recipeData.strAlcoholic}</p>
      )}

      <h2>Ingredientes</h2>
      <ul>{ingredientElements}</ul>

      <h2>Intructions</h2>
      <p data-testid="instructions">{recipeData.strInstructions}</p>

      <h2>Video</h2>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${video}` }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}

export default RecipeDetails;
