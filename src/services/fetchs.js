export const fetchData = async (type, fn) => {
  if (type === 'Meals') {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    fn(data.meals);
  }
  if (type === 'Drinks') {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    fn(data.drinks);
  }
};

export const fetchCaterorys = async (type, fn) => {
  if (type === 'Meals') {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const data = await response.json();
    fn(data.meals);
  }
  if (type === 'Drinks') {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const data = await response.json();
    fn(data.drinks);
  }
};

export const fetchByIds = async (type, id, fn) => {
  if (type === 'Meals') {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    fn(data.meals[0]);
  }
  if (type === 'Drinks') {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    fn(data.drinks[0]);
  }
};

export const fetchByFilter = async (type, filter, fn) => {
  if (type === 'Meals') {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    fn(data.meals);
  }
  if (type === 'Drinks') {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    fn(data.drinks);
  }
};

export const fetchBySearch = async (type, typeSearch, search, fn) => {
  const URL_TYPE = type === 'Meals' ? 'themealdb' : 'thecocktaildb';

  const URL_API_INGREDIENTES = `https://www.${URL_TYPE}.com/api/json/v1/1/filter.php?i=${search}`;
  const URL_API_NOME = `https://www.${URL_TYPE}.com/api/json/v1/1/search.php?s=${search}`;
  const URL_API_FIRST_LETTER = `https://www.${URL_TYPE}.com/api/json/v1/1/search.php?f=${search}`;

  let URL;
  switch (typeSearch) {
  case 'ingredient':
    URL = URL_API_INGREDIENTES;
    break;
  case 'name':
    URL = URL_API_NOME;
    break;
  case 'first-letter':
    URL = URL_API_FIRST_LETTER;
    break;
  default:
    return;
  }

  const responseAPI = await fetch(URL);
  const dataAPI = await responseAPI.json();
  const key = type.toLowerCase();
  if (dataAPI[key] === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  } else {
    fn(dataAPI[key]);
  }
};
