import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const validation = () => {
    const min = 6;
    const emailRegex = /^\S+@\S+\.\S+$/i.test(userEmail);
    if (emailRegex && userPassword.length >= min) {
      setIsDisabled(false);
    } else { setIsDisabled(true); }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="EMAIL"
        data-testid="email-input"
        onChange={ ({ target }) => {
          setUserEmail(target.value);
          validation();
        } }
      />
      <input
        type="password"
        placeholder="SENHA"
        data-testid="password-input"
        onChange={ ({ target }) => {
          setUserPassword(target.value);
          validation();
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => {
          localStorage.setItem('user', JSON
            .stringify({ email: userEmail }));
          history.push('/meals');
        } }
        disabled={ isDisabled }
      >
        Logar
      </button>

    </div>
  );
}

export default Login;
