import PropTypes from 'prop-types';
import React from 'react';

function BtnFinish({ isFinished }) {
  return (
    <button data-testid="finish-recipe-btn" disabled={ isFinished }>
      Finish Recipe
    </button>
  );
}

BtnFinish.propTypes = {
  isFinished: PropTypes.bool.isRequired,
};

export default BtnFinish;
