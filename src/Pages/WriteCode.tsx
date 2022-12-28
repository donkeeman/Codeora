import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const CodeEditorWrapper = styled.div`
    position: relative;
    min-height: 300px;
    white-space: pre;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
`;

const CodeEditor = styled.textarea`
    background-color: transparent;
    color: transparent;
    border: none;
    outline: none;
    white-space: pre;
    caret-color: ${colorVariants.white};
    padding: 1em;
    margin: 0.5em 0px;
    line-height: 1.5;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    resize: none;
`;

const WriteCode = () => {
    const [code, setCode] = useState("");

    const codeInputHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setCode(event.target.value);
    };

    return (
        <CodeEditorWrapper>
            <SyntaxHighlighter
                className="codeEditor pre"
                language="javascript"
                style={a11yDark}
            >
                {code}
            </SyntaxHighlighter>
            <CodeEditor
                className="codeEditor textarea"
                onChange={codeInputHandler}
                spellCheck={false}
            ></CodeEditor>
        </CodeEditorWrapper>
    );
};

export default WriteCode;
