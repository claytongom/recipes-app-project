import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  // Vou alimentar o estado email com o que tem no localStorage segundo o requisito.
  const [email, setEmail] = useState('');
  const history = useHistory();

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
      <Header
        headerTypes={ {
          title: 'Profile',
          searchButton: false,
          profileIcone: true,
          drink: false,
        } }
      />
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button type="button" data-testid="profile-logout-btn" onClick={ DoLogout }>
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
