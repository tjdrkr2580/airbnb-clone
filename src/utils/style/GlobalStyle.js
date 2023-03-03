import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
    font-family: Pretendard;
    list-style: none;
    }
    
    button {
        border: none;
    }
    input {
        &:focus {
            outline: none;
        }
    }
    body {
        overflow-x: hidden;
        min-width: 100vw;
        height: 100vh;
    }
`;

export default GlobalStyle;
