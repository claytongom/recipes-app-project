// Rota "/": não possui header
// Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa
// Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa
// Rota "/meals/:id-da-receita": não possui header
// Rota "/drinks/:id-da-receita": não possui header
// Rota "/meals/:id-da-receita/in-progress": não possui header
// Rota "/drinks/:id-da-receita/in-progress": não possui header
// Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa
// Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa
// Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa

const getTitleAndButton = (pathname) => {
  if (pathname.includes('meals')) {
    return {
      title: 'Meals',
      haveButton: true,
    };
  }
  if (pathname.includes('drinks')) {
    return {
      title: 'Drinks',
      haveButton: true,
    };
  }
  if (pathname.includes('profile')) {
    return {
      title: 'Profile',
      haveButton: false,
    };
  }
  if (pathname.includes('done')) {
    return {
      title: 'Done Recipes',
      haveButton: false,
    };
  }
  if (pathname.includes('favorite')) {
    return {
      title: 'Favorite Recipes',
      haveButton: false,
    };
  }
};

export default getTitleAndButton;
