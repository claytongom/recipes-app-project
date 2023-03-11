import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import getTitleAndButton from '../helpers/getTitleAndButton';

function Recipes() {
  const { pathname } = useLocation();
  const [pageInfo] = useState(getTitleAndButton(pathname));

  return (
    <div>
      <Header title={ pageInfo.title } searchButton={ pageInfo.haveButton } />
    </div>
  );
}

export default Recipes;
