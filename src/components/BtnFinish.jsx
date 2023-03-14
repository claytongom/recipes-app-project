import PropTypes from 'prop-types';
import React from 'react';
import StartFinishButton from '../styles/StartFinishButton';

function BtnFinish({ isFinished }) {
  return (
    <StartFinishButton data-testid="finish-recipe-btn" disabled={ isFinished }>
      Finish Recipe
    </StartFinishButton>
  );
}

BtnFinish.propTypes = {
  isFinished: PropTypes.bool.isRequired,
};

export default BtnFinish;
