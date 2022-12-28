import React, { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const CodeEditorWrapper = styled.div`
    position: relative;
    min-height: 300px;
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
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const preRef =
        wrapperRef.current &&
        (wrapperRef.current.firstElementChild as HTMLPreElement);

    const codeInputHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setCode(event.target.value);
    };

    const syncScrollHandler = (event: React.UIEvent<HTMLTextAreaElement>) => {
        const textarea = event.currentTarget as HTMLTextAreaElement;
        if (preRef) {
            preRef.scrollTop = textarea.scrollTop;
        }
    };

    return (
        <CodeEditorWrapper ref={wrapperRef}>
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
                onScroll={syncScrollHandler}
            ></CodeEditor>
        </CodeEditorWrapper>
    );
};

export default WriteCode;
