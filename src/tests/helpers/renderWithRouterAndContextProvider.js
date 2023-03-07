import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import RecipesProvider from "../../context/RecipesProvider";
import HeaderProvider from "../../context/HeaderProvider";

const renderWithRouterAndContextProvider = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <RecipesProvider>
        <HeaderProvider>
          <Router history={history}>{component}</Router>
        </HeaderProvider>
      </RecipesProvider>
    ),
    history,
  };
};
export default renderWithRouterAndContextProvider;
