import React, { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const CodeEditorWrapper = styled.div`
    position: relative;
    min-height: 300px;
    margin: 0;
    padding: 10px;
`;

const CodeEditor = styled.textarea`
    background-color: transparent;
    color: transparent;
    border: 3px solid transparent;
    resize: none;
    caret-color: ${colorVariants.white};
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    overflow-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    overflow: auto;
    border-radius: 6px;
    padding: 10px;
`;

const WriteCode = () => {
    const [posting, setPosting] = useState({
        title: "",
        code: "",
        lang: "",
        tag: [],
    });
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const preRef =
        wrapperRef.current &&
        (wrapperRef.current.firstElementChild as HTMLPreElement);

    const codeInputHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, code: event.target.value });
    };

    const syncScrollHandler = (event: React.UIEvent<HTMLTextAreaElement>) => {
        const textarea = event.currentTarget as HTMLTextAreaElement;
        if (preRef) {
            preRef.scrollTop = textarea.scrollTop;
            preRef.scrollLeft = textarea.scrollLeft;
        }
    };

    return (
        <CodeEditorWrapper ref={wrapperRef}>
            <SyntaxHighlighter
                className="codeEditor pre"
                language="javascript"
                style={a11yDark}
                wrapLongLines={true}
                customStyle={{
                    margin: 0,
                    padding: "10px",
                    borderRadius: "6px",
                }}
            >
                {posting.code}
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
