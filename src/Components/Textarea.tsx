import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

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
    font-size: 20px;
    padding: 6px;
    border: 3px solid gray;
    border-radius: 6px;
    background-color: transparent;
    caret-color: ${colorVariants.white};
`;

type textareaData = {
    id: string;
    labelName: string;
    innerRef?: MutableRefObject<HTMLTextAreaElement>;
    onChangeFunction: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const Textarea = ({
    id,
    labelName,
    innerRef,
    onChangeFunction,
}: textareaData) => {
    return (
        <TextareaWrapper>
            <TextareaLabel htmlFor={id}>{labelName}</TextareaLabel>
            <ContentTextarea
                id={id}
                ref={innerRef}
                onChange={onChangeFunction}
            />
        </TextareaWrapper>
    );
};

export default Textarea;
