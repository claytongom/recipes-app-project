import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import Carousel from '../components/Carousel';
import StartButton from '../components/StartButton';
import getTitleAndButton from '../helpers/getTitleAndButton';
import { fetchByIds } from '../services/fetchs';

function NewRecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [pageInfo] = useState(getTitleAndButton(pathname));

  // useEffect pra pegar os dados da receita pelo seu id.
  useEffect(() => {
    fetchByIds(pageInfo.title, id, setRecipe);
  }, [id, pageInfo]);

  // useEffect usado para pegar os ingredientes válidos da receita.
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
      }));
    };
    setIngredients(getIngredients());
  }, [recipe]);

  return (
    <div>
      {Object.keys(recipe).length > 0 && (
        <DetailsCard
          recipe={ recipe }
          ingredients={ ingredients }
          id={ id }
          type={ pageInfo.title }
        />
      )}
      <Carousel type={ pageInfo.title } />

      <StartButton
        id={ id }
        type={ pageInfo.title }
        ingredients={ ingredients }
        history={ useHistory() }
      />
    </div>
  );
}

export default NewRecipeDetails;
