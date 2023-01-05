import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TagLi = styled.li`
display: flex;
align-items: center;
gap: 4px;
    padding: 8px 12px;
    border-radius: 24px;
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
};

const Tag = ({ keyword }: tagData) => {
    return (
        <TagLi>
            {keyword}
            <DeleteButton>
                <FontAwesomeIcon icon={faXmark} />
            </DeleteButton>
        </TagLi>
    );
};

export default Tag;
