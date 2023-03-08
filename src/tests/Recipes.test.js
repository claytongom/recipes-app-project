import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Meals from "../pages/Meals";
import Recipes from "../pages/Recipes";
import mockApiMeals from "./helpers/mockApiMeals";
import renderWithRouterAndContextProvider from "./helpers/renderWithRouterAndContextProvider";

describe("Testando pagina Meals e Drinks ", () => {
  it("Teste renderizando na pagina Meals", async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiMeals),
    });
    renderWithRouterAndContextProvider(<Meals />);
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
  });
});
