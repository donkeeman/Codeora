import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { languageMap } from "../Constants/languageMap";
import Tag from "./Tag";

const Card = styled(Link)`
    text-align: left;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
    background-color: ${colors.black};
    color: ${colors.white};
    width: 100%;
    height: 250px;
    border: 3px solid ${colors.mainColor};
    border-radius: 6px;
    transition: all linear .2s;
    cursor: pointer;
    &:hover,
    &:focus-visible {
        outline-style: none;
        background-color: ${colors.mainColor};
        color: ${colors.black};
    }
    overflow: hidden;
`;

const CardTitle = styled.h3`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.4;
`;

const CardDesc = styled.p`
    display: -webkit-box;
    width: 100%;
    max-height: 100px;
    font-size: 16px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    white-space: pre-wrap;
`;

const TagList = styled.ul`
    display: flex;
    gap: 4px;
    font-size: 16px;
    height: 24px;
    flex-wrap: wrap;
    max-width: 100%;
    align-items: center;
    & > li {
        overflow: hidden;
        & > span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.4;
        }
    }
`;

const LangDateContainer = styled.div`
    margin-top: auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
`;

type codeDataType = {
    id: string;
    title: string;
    description: string;
    tags: Array<string>;
    language: string;
    date: Date;
};

const CodeCard = ({
    id,
    title,
    description,
    tags,
    language,
    date,
}: codeDataType) => {
    return (
        <Card
            to={`/code/${id}`}
        >
            <CardTitle>{title}</CardTitle>
            <CardDesc>{description}</CardDesc>
            <TagList>
                {tags
                    .sort((tag1, tag2) => tag1.length - tag2.length)
                    .map((tag, index) => (
                        <Tag key={index} keyword={tag} />
                    ))}
            </TagList>
            <LangDateContainer>
                <span>{languageMap.get(language)?.name}</span>
                <time dateTime={date.toLocaleDateString()}>
                    {date.toLocaleDateString()}
                </time>
            </LangDateContainer>
        </Card>
    );
};

export default CodeCard;
