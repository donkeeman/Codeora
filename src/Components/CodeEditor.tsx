import React, { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const CodeEditorWrapper = styled.div`
    position: relative;
    min-height: 500px;
    margin: 0;
    flex: 0.9 0 0;
`;

const Editor = styled.textarea`
    background-color: transparent;
    color: transparent;
    border: 3px solid gray;
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
    padding: 24px 20px;
`;

const Select = styled.select`
    position: absolute;
    top: 0;
    right: 0;
    border: 3px solid gray;
    border-radius: 6px;
    width: 100px;
    z-index: 100;
`;

type textareaData = {
    code: string;
    language: string;
    onChangeFunction: React.ChangeEventHandler<HTMLTextAreaElement>;
    onSelectFunction: React.ChangeEventHandler<HTMLSelectElement>;
};

const CodeEditor = ({
    code,
    language,
    onChangeFunction,
    onSelectFunction,
}: textareaData) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const preRef =
        wrapperRef.current &&
        (wrapperRef.current.firstElementChild as HTMLPreElement);

    const languageList = [
        "Bash",
        "C",
        "C++",
        "C#",
        "CSS",
        "Go",
        "HTML",
        "Java",
        "JavaScript",
        "JSON",
        "Kotlin",
        "Lua",
        "Markdown",
        "PlainText",
        "Python",
        "Ruby",
        "Rust",
        "SQL",
        "Swift",
        "Vim",
        "Xml",
    ];

    const syncScrollHandler = (event: React.UIEvent<HTMLTextAreaElement>) => {
        const textarea = event.target as HTMLTextAreaElement;
        if (preRef) {
            preRef.scrollTop = textarea.scrollTop;
            preRef.scrollLeft = textarea.scrollLeft;
        }
    };

    return (
        <CodeEditorWrapper ref={wrapperRef}>
            <Select
                onChange={onSelectFunction}
                id="language"
                defaultValue="javascript"
            >
                {languageList.map((language) => (
                    <option
                        key={language}
                        value={language
                            .toLowerCase()
                            .replace("++", "pp")
                            .replace("#", "sharp")}
                    >
                        {language}
                    </option>
                ))}
            </Select>
            <SyntaxHighlighter
                className="codeEditor pre"
                language={language}
                style={a11yDark}
                wrapLongLines={true}
                customStyle={{
                    margin: 0,
                    padding: "24px 20px",
                    borderRadius: "6px",
                }}
            >
                {code}
            </SyntaxHighlighter>
            <label htmlFor="code" className="a11y-hidden">
                코드 작성
            </label>
            <Editor
                className="codeEditor textarea"
                onChange={onChangeFunction}
                spellCheck={false}
                onScroll={syncScrollHandler}
                autoComplete="off"
                id="code"
                name="code"
                placeholder={language}
            />
        </CodeEditorWrapper>
    );
};

export default CodeEditor;
