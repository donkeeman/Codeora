import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { colorVariants } from "../Constants/colorVariants";
import { headerMaxHeight } from "../Constants/variables";

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        border: none;
    }
    body, button, input, textarea, select, a {
        text-align: center;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        letter-spacing: -0.8px;
        color: ${colorVariants.white};
        word-break: keep-all;
    }
    body {
        background-color: ${colorVariants.black};
        padding: 20px 8%;
        &::-webkit-scrollbar, & *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            cursor: pointer;
        }
        &::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb {
            background-color: ${colorVariants.gray};
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
        text-decoration: none;
        line-height: normal;
    }
    button {
        cursor: pointer;
    }
    input, textarea, select{
        background-color: ${colorVariants.black};
    }
    textarea {
        resize: none;
    }
    .a11y-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        clip: rect(0, 0, 0, 0);
        margin: -1px;
        overflow: hidden;
    }
    .highlighter {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        letter-spacing: 1px;
        &.editor {
            border: 3px solid transparent;
            &::-webkit-scrollbar {
                background: transparent;
            }
            &::-webkit-scrollbar-thumb {
                background: transparent;
            }
        }
        &.block {
            border: 3px solid gray;
        }
    }
    .App {
        max-width: 1000px;
        margin: ${headerMaxHeight}px auto 0;
    }
`;

export default GlobalStyle;
