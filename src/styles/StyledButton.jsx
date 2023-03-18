import styled from 'styled-components';

const StyledButton = styled.button`
    margin-top: 5px;
    padding: 5px 20px;

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};

    border-radius: 8px;
    border: none;

    &:disabled {
        opacity: 50%;
    }
`;

export default StyledButton;
