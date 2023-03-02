import React from "react";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TagLi = styled.li`
    display: flex;
    align-items: center;
    padding: 0 12px;
    width: fit-content;
    height: 100%;
    white-space: nowrap;
    border-radius: 24px;
    outline: 2px solid ${colors.black};
    background-color: ${colors.mainColor};
    color: ${colors.black};
`;

const DeleteButton = styled.button`
    background-color: transparent;
    border: none;
    margin-right: -4px;
    color: ${colors.black};
`;

type tagData = {
    keyword: string;
    onClickFunction?: React.MouseEventHandler<HTMLButtonElement>;
};

const Tag = ({ keyword, onClickFunction }: tagData) => {
    return (
        <TagLi>
            <span>{keyword}</span>
            {onClickFunction && (
                <DeleteButton onClick={onClickFunction}>
                    <FontAwesomeIcon icon={faXmark} />
                </DeleteButton>
            )}
        </TagLi>
    );
};

export default Tag;
