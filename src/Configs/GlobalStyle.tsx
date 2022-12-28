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
        & * {
            box-sizing: border-box;
        }
        &::-webkit-scrollbar, & *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            cursor: pointer;
        }
        &::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb {
            background-color: ${colorVariants.disabledColor};
            background-clip: padding-box;
            border: 1px solid transparent;
            border-radius: 10px;
            height: 20%;
        }
        &::-webkit-scrollbar-track, & *::-webkit-scrollbar-track {
            background-color: transparent;
        }
        &::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner {
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
    button {
        cursor: pointer;
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
            border: 3px solid gray;
            &::-webkit-scrollbar {
                background: transparent;
            }
        }
    }
    .App {
        max-width: 800px;
        margin: 0 auto;
    }
`;

export default GlobalStyle;
