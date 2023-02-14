import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { CopyButton } from "./IconButton";

const CodeBlockWrapper = styled.div`
    position: relative;
    min-height: 500px;
    margin: 0;
    flex: 0.9 0 0;
    @media screen and (max-width: 800px) {
        min-height: 300px;
    }
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
        </CodeBlockWrapper>
    );
};

export default CodeBlock;
