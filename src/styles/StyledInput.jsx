import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 5px 8px;
    border: 2px solid  ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.primary};
`;

export default StyledInput;
