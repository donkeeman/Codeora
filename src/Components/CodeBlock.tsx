import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { languageMap } from "../Constants/languageMap";
import { CopyButton } from "./IconButton";

const CodeBlockWrapper = styled.div`
    position: relative;
    min-height: 500px;
    margin: 0;
    flex: 0.9 0 0;
    @media screen and (max-width: 800px) {
        min-height: 300px;
    }
    & > button {
        position: absolute;
        top: 3px;
        right: 3px;
    }
`;

const Language = styled.span`
    position: absolute;
    font-size: 16px;
    bottom: 8px;
    right: 16px;
`;

type codeBlockData = {
    code: string;
    language: string;
};

const CodeBlock = ({ code, language }: codeBlockData) => {
    return (
        <CodeBlockWrapper>
            <SyntaxHighlighter
                className="codeEditor pre"
                language={language}
                style={a11yDark}
                wrapLongLines={true}
                customStyle={{
                    margin: 0,
                    padding: "24px 20px",
                    border: `3px solid ${colorVariants.mainColor}`,
                    borderRadius: "6px",
                    fontSize: "16px",
                }}
            >
                {code}
            </SyntaxHighlighter>
            <CopyButton onClickFunction={() => {}} />
            <Language>{languageMap.get(language)?.name}</Language>
        </CodeBlockWrapper>
    );
};

export default CodeBlock;
