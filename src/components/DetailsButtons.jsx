import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function DetailsButtons(props) {
  const { isDoneRecipe, isInProgress, isFavorite, startRecFunc, toggleFav } = props;
  const [copied, setCopied] = useState(false);

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

  return (
    <div>
      {!isDoneRecipe && (
        <button
          data-testid="start-recipe-btn"
          className="FixedBottom"
          onClick={ startRecFunc }
        >
          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}

      <div className="FixedBottomLeft">
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
      </div>
    </div>
  );
}

DetailsButtons.propTypes = {
  isDoneRecipe: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isInProgress: PropTypes.bool.isRequired,
  startRecFunc: PropTypes.func.isRequired,
  toggleFav: PropTypes.func.isRequired,
};

export default DetailsButtons;
