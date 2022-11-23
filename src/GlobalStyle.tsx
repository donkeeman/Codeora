import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { colorVariants } from "./Constants/colorVariants";

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body, button, input {
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 10px;
        letter-spacing: -0.8px;
        color: ${colorVariants.black};
    }
    body {
        padding: 20px;
    }
    button, button:hover, button:focus {
        background-color: inherit;
        cursor: pointer;
    }
`;

export default GlobalStyle;
