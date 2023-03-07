import { faCopy, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { languageMap } from "../Constants/languageMap";
import { HighlighterData } from "../Constants/types";
import { variables } from "../Constants/variables";
import IconButton from "./IconButton";

const CodeBlockWrapper = styled.div`
    position: relative;
    min-height: 520px;
    margin: 0;
    flex: 0.9 0 0;
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        min-height: 300px;
    }
`;

const IconList = styled.ul`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 6px;
    & li {
        width: 24px;
        height: 24px;
    }
`;

const Language = styled.span`
    position: absolute;
    font-size: 16px;
    bottom: 8px;
    right: 16px;
`;

const CodeBlock = ({ title, code, language }: HighlighterData) => {
    const copyHandler = async () => {
        await window.navigator.clipboard.writeText(code);
        alert("복사되었습니다.");
    };

    const downloadHandler = async () => {
        const encodedUri = encodeURIComponent(code);
        const downloadLink = document.createElement("a");
        downloadLink.setAttribute(
            "href",
            "data:text/plain; charset=utf-8," + encodedUri
        );
        downloadLink.setAttribute(
            "download",
            `${title}.${languageMap.get(language)?.extension}`
        );
        downloadLink.click();
        document.removeChild(downloadLink);
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
                    overflowX: "hidden",
                }}
                codeTagProps={{
                    style: {
                        overflowWrap: "break-word",
                    },
                }}
            >
                {code}
            </SyntaxHighlighter>
            <IconList>
                <li>
                    <IconButton
                        onClickFunction={copyHandler}
                        icon={faCopy}
                        message="코드 복사"
                        subMessage="복사"
                    />
                </li>
                <li>
                    <IconButton
                        onClickFunction={downloadHandler}
                        icon={faFileDownload}
                        message="코드 다운로드"
                        subMessage="다운로드"
                    />
                </li>
            </IconList>
            <Language>{languageMap.get(language)?.name}</Language>
        </CodeBlockWrapper>
    );
};

export default CodeBlock;
