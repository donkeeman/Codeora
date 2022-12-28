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
    body {
        padding: 30px 8%;
        &::-webkit-scrollbar, & *::-webkit-scrollbar {
            width: 12px;
        }
        &::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb {
            background-color: ${colorVariants.disabledColor};
            background-clip: padding-box;
            border: 2px solid transparent;
            border-radius: 10px;
            height: 20%;
        }
        &::-webkit-scrollbar-track, & *::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }
    h1, h2 {
        font-weight: bold;
    }
    a, a:visited, a:hover {
        color: inherit;
        text-decoration: underline;
    }
    .codeEditor {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        letter-spacing: 1px;
        &.pre {
            border: 2px solid ${colorVariants.disabledColor};
            height: 100%;
        }
        &.textarea::-webkit-scrollbar {
            display: none;
        }
    }
    .App {
        max-width: 800px;
        margin: 0 auto;
    }
`;

export default GlobalStyle;
