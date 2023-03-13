import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
  box-shadow: 0 0 5px 0 black;

  & button {
    background: transparent;
    border: none;
  }
`;

export default HeaderWrapper;
