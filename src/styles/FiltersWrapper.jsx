import styled from 'styled-components';

const FiltersWrapper = styled.div`
  display: grid;
  margin-bottom: 12px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 0px;
  padding: 0 12px;
`;

export default FiltersWrapper;
