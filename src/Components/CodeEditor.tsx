import React, { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { languageMap } from "../Constants/languageMap";
import { EditorData } from "../Constants/types";

const CodeEditorWrapper = styled.div`
    position: relative;
    min-height: 520px;
    margin: 0;
    flex: 0.9 0 0;
    @media screen and (max-width: 800px) {
        min-height: 300px;
    }
`;

const Editor = styled.textarea`
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    letter-spacing: 1px;
    padding: 24px 20px;
    background-color: transparent;
    color: transparent;
    border: 3px solid gray;
    caret-color: ${colorVariants.white};
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 16px;
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
    &:focus-visible {
        outline-style: none;
        border-color: ${colorVariants.mainColor};
    }
`;

const Select = styled.select`
    position: absolute;
    top: 0;
    right: 0;
    border: 3px solid gray;
    border-radius: 6px;
    width: 100px;
    z-index: 100;
    &:focus-visible {
        outline-style: none;
        border-color: ${colorVariants.mainColor};
    }
`;

const CodeEditor = ({
    code,
    language,
    onChangeFunction,
    onKeyDownFunction,
    onSelectFunction,
}: EditorData) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const preRef =
        wrapperRef.current &&
        (wrapperRef.current.firstElementChild as HTMLPreElement);

    const getComment = (language: string) => {
        return `${
            languageMap.get(language)?.commentStart
        }코드를 작성해 보세요.${languageMap.get(language)?.commentEnd}`;
    };

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
                className="highlighter editor"
                language={language}
                style={a11yDark}
                wrapLongLines={true}
                customStyle={{
                    margin: "0",
                    padding: "24px 20px",
                    borderRadius: "6px",
                    overflowX: "hidden",
                }}
            >
                {code}
            </SyntaxHighlighter>
            <Select
                onChange={onSelectFunction}
                id="language"
                key={language}
                defaultValue={language || "언어 선택"}
            >
                <option disabled>언어 선택</option>
                {Array.from(languageMap.keys()).map((lang) => (
                    <option key={lang} value={lang}>
                        {languageMap.get(lang)?.name}
                    </option>
                ))}
            </Select>
            <label htmlFor="code" className="a11y-hidden">
                코드 작성
            </label>
            <Editor
                onChange={onChangeFunction}
                onKeyDown={onKeyDownFunction}
                onScroll={syncScrollHandler}
                spellCheck={false}
                autoComplete="off"
                id="code"
                name="code"
                disabled={!language}
                placeholder={language && getComment(language)}
                value={code}
            />
        </CodeEditorWrapper>
    );
};

export default CodeEditor;
