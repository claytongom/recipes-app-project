import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext({});

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const values = useMemo(() => ({
    email, setEmail,
  }), [email]);
  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}
LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoginProvider;
