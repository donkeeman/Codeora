import React, { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const CodeEditorWrapper = styled.div`
    position: relative;
    min-height: 400px;
    margin: 0;
    padding: 10px;
`;

const Editor = styled.textarea`
    background-color: transparent;
    color: transparent;
    border: 3px solid transparent;
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

type textareaData = {
    code: string;
    onChangeFunction: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const CodeEditor = ({ code, onChangeFunction }: textareaData) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const preRef =
        wrapperRef.current &&
        (wrapperRef.current.firstElementChild as HTMLPreElement);

    const syncScrollHandler = (event: React.UIEvent<HTMLTextAreaElement>) => {
        const textarea = event.target as HTMLTextAreaElement;
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
                {code}
            </SyntaxHighlighter>
            <label htmlFor="code" className="a11y-hidden">코드 작성</label>
            <Editor
                className="codeEditor textarea"
                onChange={onChangeFunction}
                spellCheck={false}
                onScroll={syncScrollHandler}
                autoComplete="off"
                id="code"
                name="code"
                placeholder="// 코드를 작성해 보세요." // 언어에 따라 주석 형식 변경하기
            ></Editor>
        </CodeEditorWrapper>
    );
};

export default CodeEditor;
