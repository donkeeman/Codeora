import React from "react";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { TextareaData } from "../Constants/types";

const TextareaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
    margin-bottom: 10px;
`;

const TextareaLabel = styled.label`
    font-size: 18px;
    margin-left: 4px;
`;

const ContentTextarea = styled.textarea`
    display: block;
    text-align: left;
    font-size: 16px;
    padding: 6px;
    border: 3px solid gray;
    border-radius: 6px;
    background-color: transparent;
    caret-color: ${colors.white};
    &:focus-visible {
        outline-style: none;
        border-color: ${colors.mainColor};
    }
`;

const Textarea = ({
    id,
    labelName,
    innerRef,
    onChangeFunction,
    rows,
    defaultValue,
}: TextareaData) => {
    return (
        <TextareaWrapper>
            <TextareaLabel htmlFor={id}>{labelName}</TextareaLabel>
            <ContentTextarea
                id={id}
                ref={innerRef}
                onChange={onChangeFunction}
                rows={rows}
                spellCheck={false}
                defaultValue={defaultValue}
            />
        </TextareaWrapper>
    );
};

export default Textarea;
