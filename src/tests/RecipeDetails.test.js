// import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import RecipeDetails from '../pages/RecipeDetails';
// import mockSushi from './helpers/Mocks/Recipes/mockSushi';
// import renderWithRouterAndContextProvider from './helpers/renderWithRouterAndContextProvider';
// import getTitleAndButton from '../helpers/getTitleAndButton';
// import mockData from './helpers/Mocks/Recipes/mockData';
// import App from '../App';
// import Recipes from '../pages/DoneRecipes';

// jest.mock('../helpers/getTitleAndButton');

// describe('Teste da página Recipe Details', () => {
//   // Fazendo o mock da receita e a renderização da página Recipe Details.
//   beforeEach(async () => {
//     const { history } = renderWithRouterAndContextProvider(<App />);

//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: jest
//         .fn()
//         .mockResolvedValue(mockSushi)
//         .mockResolvedValueOnce(mockData),
//     });

//     getTitleAndButton.mockReturnValue({
//       title: 'Meals',
//       haveButton: false,
//     });

//     act(() => {
//       history.push('/meals/53065');
//     });

//     // await waitFor(() => {
//     //   expect(screen.getByText(/corba/i)).toBeInTheDocument();
//     // });
//   });

//   test('Verifica se possui um título para o nome da receita', () => {});
// });
