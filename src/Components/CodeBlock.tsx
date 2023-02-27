import { faCopy } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { languageMap } from "../Constants/languageMap";
import { HighlighterData } from "../Constants/types";
import IconButton from "./IconButton";

const CodeBlockWrapper = styled.div`
    position: relative;
    min-height: 520px;
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

const CodeBlock = ({ code, language }: HighlighterData) => {
    const copyHandler = async () => {
        await window.navigator.clipboard.writeText(code);
        alert("복사되었습니다.");
    };

    return (
        <CodeBlockWrapper>
            <SyntaxHighlighter
                className="highlighter block"
                language={language}
                style={a11yDark}
                wrapLongLines={true}
                customStyle={{
                    margin: "0",
                    padding: "24px 20px",
                    borderRadius: "6px",
                }}
                codeTagProps={{
                    style: {
                        overflowWrap: "break-word",
                    },
                }}
            >
                {code}
            </SyntaxHighlighter>
            <IconButton
                onClickFunction={copyHandler}
                icon={faCopy}
                message="복사하기"
                subMessage="복사"
            />
            <Language>{languageMap.get(language)?.name}</Language>
        </CodeBlockWrapper>
    );
};

export default CodeBlock;
