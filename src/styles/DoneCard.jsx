import styled from 'styled-components';

const DoneCard = styled.div`
  display: flex;
  width: 80vw;
  gap: 10px;
  border-radius: 8px;
  padding: 5px 8px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};

  & a {
    color: ${({ theme }) => theme.colors.primary};
  }

  & button {
    background-color: transparent;
    border: none;
  }

  border: 2px solid;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

export default DoneCard;
