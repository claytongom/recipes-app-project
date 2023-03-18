import styled from 'styled-components';

const StartFinishButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 10vw;
  transform: translateY(-15px);
  padding: 5px 20px;
  width: 80vw;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  border: none;

  &:disabled{
    opacity: 70%;
  }
`;

export default StartFinishButton;
