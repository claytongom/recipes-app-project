import styled from 'styled-components';

const CarouselContainer = styled.div`
  border: 5px solid ${({ theme }) => theme.colors.primary};
  white-space:  nowrap;
  overflow-x: scroll;
  height: 125px;
  width: 240px;
  border-radius: 8px;
`;

export default CarouselContainer;
