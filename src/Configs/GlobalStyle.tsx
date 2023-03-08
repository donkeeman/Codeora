import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { colors } from "../Constants/colors";
import { variables } from "../Constants/variables";

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        border: none;
    }
    html, body{
        max-height: 100vh;
        background-color: ${colors.black};
        ::-webkit-scrollbar {
            display: none;
        }
    }
    body{
        & *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            cursor: pointer;
        }
        & *::-webkit-scrollbar-thumb {
            background-color: ${colors.gray};
            background-clip: padding-box;
            border: 1px solid transparent;
            border-radius: 10px;
            height: 50px;
        }
        & *::-webkit-scrollbar-track {
            background-color: transparent;
        }
        & *::-webkit-scrollbar-corner {
            background-color: transparent;
        }
    }
    .App, button, input, textarea, select, a {
        text-align: center;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        letter-spacing: -0.8px;
        color: ${colors.white};
        word-break: keep-all;
    }
    .App{
        max-height: 100%;
        overflow: auto;
        margin: ${variables.HEADER_HEIGHT}px auto 0;
        padding: 20px 6%;
    }
    .main {
        max-width: ${variables.MAX_WIDTH}px;
        margin: 0 auto;
    }
    h1, h2 {
        font-weight: bold;
    }
    a, a:visited, a:hover {
        text-decoration: none;
        line-height: normal;
    }
    button {
        cursor: pointer;
    }
    input, textarea, select{
        background-color: ${colors.black};
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
`;

export default GlobalStyle;
