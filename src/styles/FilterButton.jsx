import styled from 'styled-components';

const FilterButton = styled.button`
    margin-top: 5px;
    padding: 5px 20px;

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};

    border-radius: 8px;
    border: none;
`;

export default FilterButton;
