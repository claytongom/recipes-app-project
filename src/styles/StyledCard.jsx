import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 5px 8px;
  color: ${({ theme }) => theme.colors.primary};
  width: 80vw;
  padding-bottom: 12px;

  border: 2px solid;

  & h3 {
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
    display: block;
    border-radius: 8px;
    text-align: center;
    width: 100%;
  }

  & img {
    border-radius: 8px;
    height: 70px;
  }

  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 95%;
  }

  & > div > div {
    height: 70px;

    & span {
        font-weight: 700;
        margin-right: 5px;
    }
  }
`;

export default StyledCard;
