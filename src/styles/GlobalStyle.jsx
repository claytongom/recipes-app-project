import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    body {
        background-color: ${({ theme }) => theme.colors.background};
    }

    a {
        text-decoration: none;
    }

    .marked {
        text-decoration: line-through solid rgb(0, 0, 0);
    }
`;

export default GlobalStyle;
