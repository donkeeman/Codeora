import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { colorVariants } from "./Constants/colorVariants";

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body, button, input {
        background-color: ${colorVariants.black};
        text-align: center;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        letter-spacing: -0.8px;
        color: ${colorVariants.white};
    }
    body {
        padding: 20px;
    }
    h1, h2 {
        font-size: 20px;
        font-weight: bold;
    }
    a, a:visited, a:hover{
        color: inherit;
        text-decoration: underline;
    }
`;

export default GlobalStyle;
