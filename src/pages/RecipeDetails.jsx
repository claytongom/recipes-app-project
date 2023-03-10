import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import {
  addToFavoriteRecipes,
  recipeIsInFavoriteRecipes,
  removeFromFavoriteRecipes,
} from '../services/favoriteRecipesLS';
import {
  addToInProgressRecipes,
  recipeIsInProgressRecipes,
} from '../services/inProgressRecipesLS';
import { recipeIsInDoneRecipes } from '../services/doneRecipesLS';
import DetailsCard from '../components/DetailsCard';
import DetailsButtons from '../components/DetailsButtons';

const MEALS = 'meals';
const DRINKS = 'drinks';
// const urlApiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
// const urlApiMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipeData, setRecipeData] = useState([]);
  const [strIngredient, setStrIngredient] = useState([]);
  const [video, setVideo] = useState('');
  // const [dataApiDrinks, setDataApiDrinks] = useState([]);
  // const [dataApiMeals, setDataApiMeals] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);

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
  // ------------------------------------------------------------------------- //

  useEffect(() => {
    recipeIsInFavoriteRecipes(id, setIsFavorite);
    recipeIsInProgressRecipes(id, urlAndType.type, setIsInProgress);
    recipeIsInDoneRecipes(id, setIsDoneRecipe);
  }, [id, urlAndType]);

  // const getDataApiDrinkAndMeal = async () => {
  //   const responseDrinks = await fetch(urlApiDrinks);
  //   const dataDrinks = await responseDrinks.json();
  //   setDataApiDrinks(dataDrinks.drinks);
  //   const responseMeals = await fetch(urlApiMeals);
  //   const dataMeals = await responseMeals.json();
  //   setDataApiMeals(dataMeals.meals);
  // };

  // useEffect para fazer o fetch para alimentar o estado recipeData.
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(urlAndType.url);
      const data = await response.json();
      setRecipeData(data[urlAndType.type][0]);
    };
    fetchApi();
    // getDataApiDrinkAndMeal();
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

  // Função do botão Start Recipe
  const startRecFunc = () => {
    const { type } = urlAndType;
    addToInProgressRecipes(id, type, strIngredient);
    history.push(`/${type}/${id}/in-progress`);
  };

  // Função para adicionar a receita no local storage
  const toggleFav = () => {
    const recipe = {
      id: recipeData.idMeal || recipeData.idDrink,
      type: urlAndType.type === MEALS ? 'meal' : 'drink',
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

  const type = urlAndType.type === MEALS ? 'Meal' : 'Drink';
  return (
    <div>
      <DetailsCard
        recipeData={ recipeData }
        type={ type }
        video={ video }
        strIngredient={ strIngredient }
        urlAndType={ urlAndType }
      />

      <DetailsButtons
        isDoneRecipe={ isDoneRecipe }
        isInProgress={ isInProgress }
        isFavorite={ isFavorite }
        startRecFunc={ startRecFunc }
        toggleFav={ toggleFav }
      />
    </div>
  );
}
export default RecipeDetails;
