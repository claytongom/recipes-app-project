import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import getTitleAndButton from '../helpers/getTitleAndButton';
import { getInProgressRecipes } from '../services/inProgressRecipesLS';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [pageInfo] = useState(getTitleAndButton(pathname));

  useEffect(() => {
    const newIngredients = getInProgressRecipes();
    setIngredients(newIngredients[pageInfo.title.toLowerCase()][id]);
  }, [id, pageInfo]);

  return <div>RecipeInProgress</div>;
}

export default RecipeInProgress;
