import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { colorVariants } from "../Constants/colorVariants";

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
        word-break: keep-all;
    }
    body{
        padding: 30px 8%;
    }
    h1, h2 {
        font-weight: bold;
    }
    a, a:visited, a:hover{
        color: inherit;
        text-decoration: underline;
    }
    .App{
        max-width: 800px;
        margin: 0 auto;
    }
`;

export default GlobalStyle;
