import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginHeading from '../styles/LoginHeading';
import LoginLogo from '../styles/LoginLogo';
import LoginWrapper from '../styles/LoginWrapper';
import StyledButton from '../styles/StyledButton';
import Logo from '../images/chef.png';
import StyledInput from '../styles/StyledInput';

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
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <LoginWrapper>
      <LoginHeading>
        <LoginLogo src={ Logo } />
        <span>Recipes App</span>
      </LoginHeading>
      <StyledInput
        type="text"
        placeholder="email..."
        data-testid="email-input"
        onChange={ ({ target }) => {
          setUserEmail(target.value);
          validation();
        } }
      />
      <StyledInput
        type="password"
        placeholder="password..."
        data-testid="password-input"
        onChange={ ({ target }) => {
          setUserPassword(target.value);
          validation();
        } }
      />
      <StyledButton
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => {
          localStorage.setItem('user', JSON.stringify({ email: userEmail }));
          history.push('/meals');
        } }
        disabled={ isDisabled }
      >
        Login
      </StyledButton>
    </LoginWrapper>
  );
}

export default Login;
