import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TagLi = styled.li`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 12px;
    height: 100%;
    white-space: nowrap;
    border-radius: 24px;
    outline: 2px solid ${colorVariants.black};
    background-color: ${colorVariants.mainColor};
    color: ${colorVariants.black};
`;

const DeleteButton = styled.button`
    background-color: transparent;
    border: none;
    margin-right: -4px;
    color: ${colorVariants.black};
`;

type tagData = {
    keyword: string;
    onClickFunction?: React.MouseEventHandler<HTMLButtonElement>;
};

const Tag = ({ keyword, onClickFunction }: tagData) => {
    return (
        <TagLi>
            {keyword}
            {onClickFunction && (
                <DeleteButton onClick={onClickFunction}>
                    <FontAwesomeIcon icon={faXmark} />
                </DeleteButton>
            )}
        </TagLi>
    );
};

export default Tag;
