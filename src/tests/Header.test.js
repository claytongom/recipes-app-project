import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import Profile from '../pages/Profile';
import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';

describe('Testando o componente "Header".', () => {
  test('Verifica se tá renderizando ná página Meals.', () => {
    renderWithRouterAndContextProvider(<Meals />);

    // Acessando os elementos.
    const HeaderTitle = screen.getByRole('heading', { name: /meals/i });
    const HeaderLinkProfile = screen.getByRole('img', { name: /profile/i });
    const HeaderBtnSearch = screen.getByRole('img', { name: /search/i });

    // Testando se os elementos estão na tela.
    expect(HeaderTitle).toBeInTheDocument();
    expect(HeaderLinkProfile).toBeInTheDocument();
    expect(HeaderBtnSearch).toBeInTheDocument();
  });

  test('Verifica se tá renderizando ná página Drinks.', () => {
    renderWithRouterAndContextProvider(<Drinks />);

    // Acessando os elementos.
    const HeaderTitle = screen.getByRole('heading', { name: /drinks/i });
    const HeaderLinkProfile = screen.getByRole('img', { name: /profile/i });
    const HeaderBtnSearch = screen.getByRole('img', { name: /search/i });

    // Testando se os elementos estão na tela.
    expect(HeaderTitle).toBeInTheDocument();
    expect(HeaderLinkProfile).toBeInTheDocument();
    expect(HeaderBtnSearch).toBeInTheDocument();
  });

  test('Verifica se na página Profile não possui o botão de busca.', () => {
    renderWithRouterAndContextProvider(<Profile />);

    // Acessando os elementos
    const HeaderTitle = screen.getByRole('heading', { name: /profile/i });
    const HeaderLinkProfile = screen.getByRole('img', { name: /profile/i });
    const HeaderBtnSearch = screen.queryByRole('img', { name: /search/i });

    // Testando os elementos
    expect(HeaderTitle).toBeInTheDocument();
    expect(HeaderLinkProfile).toBeInTheDocument();
    expect(HeaderBtnSearch).toBeNull();
  });

  test('Verifica se o botão profile redireciona para a página de Profile.', () => {
    const { history } = renderWithRouterAndContextProvider(<Meals />);

    // Acessando os elementos.
    const HeaderLinkProfile = screen.getByRole('img', { name: /profile/i });

    // Interagindo com os elemntos
    userEvent.click(HeaderLinkProfile);

    // Testando se o botão redireciona para a página profile.
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Verifica se o botão de lupa renderiza um campo de busca e tipos de buscas, e se clicar novamente eles desaparecem.', () => {
    renderWithRouterAndContextProvider(<Meals />);

    // Acessando os elementos.
    const HeaderBtnSearch = screen.getByRole('img', { name: /search/i });

    // Interagindo com os elementos.
    userEvent.click(HeaderBtnSearch);

    // Testando se renderiza o campo de busca e os tipos.
    const searchField = screen.getByRole('textbox');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(searchField).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    // Verificando se no campo de busca posso escrever.
    userEvent.type(searchField, 'teste');
    expect(searchField).toHaveValue('teste');

    // Verificando se os elementos somem apoś apertar no botão novamente.
    userEvent.click(HeaderBtnSearch);
    expect(searchField).not.toBeInTheDocument();
    expect(ingredientRadio).not.toBeInTheDocument();
    expect(nameRadio).not.toBeInTheDocument();
    expect(firstLetterRadio).not.toBeInTheDocument();
  });
});
