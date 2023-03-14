import styled from 'styled-components';

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;

  & button {
    background-color: transparent;
    padding: 5px;
    border: none;
  }

  & > p {
    text-align: center;
  }
`;

export default DetailsWrapper;
