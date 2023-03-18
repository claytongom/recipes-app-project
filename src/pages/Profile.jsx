import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import getTitleAndButton from '../helpers/getTitleAndButton';
import FilterButton from '../styles/FilterButton';
import FiltersWrapper from '../styles/FiltersWrapper';
import StyledEmail from '../styles/StyledEmail';

function Profile() {
  // Vou alimentar o estado email com o que tem no localStorage segundo o requisito.
  const history = useHistory();
  const { pathname } = useLocation();
  const [email, setEmail] = useState('');
  const [pageInfo] = useState(getTitleAndButton(pathname));

  // Só pra colocar algo no local storage
  // localStorage.setItem("user", JSON.stringify({ email: "email@email.com" }));

  // UseEffect verifica se a chave existe e reatribui o estado email com o valor.
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setEmail(user.email);
    }
  }, []);

  // Função para o Botão logout
  const DoLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title={pageInfo.title} searchButton={pageInfo.haveButton} />
      <StyledEmail data-testid="profile-email">
        <span>E-mail:</span>
        {`${email}`}
      </StyledEmail>
      <FiltersWrapper>
        <FilterButton
          type="button"
          data-testid="profile-done-btn"
          onClick={() => history.push('/done-recipes')}>
          Done Recipes
        </FilterButton>
        <FilterButton
          type="button"
          data-testid="profile-favorite-btn"
          onClick={() => history.push('/favorite-recipes')}>
          Favorite Recipes
        </FilterButton>
        <FilterButton
          type="button"
          data-testid="profile-logout-btn"
          onClick={DoLogout}>
          Logout
        </FilterButton>
      </FiltersWrapper>
      <Footer />
    </div>
  );
}

export default Profile;
