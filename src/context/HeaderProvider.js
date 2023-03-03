import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const values = useMemo(() => ({
    search,
    setSearch,
    data,
    setData,
  }), [search, setSearch, data, setData]);

  return (
    <HeaderContext.Provider value={ values }>
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
