// remover os favoritos
export const handleRemoveFavorite = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // atualizando os favoritos
  const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);
  // salvando as atualizações
  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));

  setFavorites(updatedFavorites);
};
// definir armazenamento local
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
// obter e-mail do usuário do armazenamento local
export const getUserEmailFromLocalStorage = () => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user.email;
  }
  return null;
};
