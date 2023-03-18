import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 12px;
  & > div {
    display: flex;
    gap: 10px;
  }
`;

export default SearchBarWrapper;
