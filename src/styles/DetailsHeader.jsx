import styled from 'styled-components';

const DetailsHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 50px;
  & > img {
    width: 65px;
  }
`;

export default DetailsHeader;
