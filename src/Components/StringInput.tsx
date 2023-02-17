import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { StringInputData } from "../Constants/types";

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
    margin-bottom: 10px;
`;

const InputLabel = styled.label`
    font-size: 18px;
    margin-left: 4px;
`;

const Input = styled.input`
    text-align: left;
    font-size: 20px;
    padding: 6px;
    border: 3px solid gray;
    border-radius: 6px;
    &:focus-visible {
        outline-style: none;
        border-color: ${colorVariants.mainColor};
    }
`;

const ErrorMessage = styled.p`
    position: absolute;
    bottom: -18px;
    margin-left: 4px;
    color: red;
`;

const StringInput = ({
    type,
    id,
    labelName,
    innerRef,
    message,
    onChangeFunction,
    onKeyDownFunction,
    value,
}: StringInputData) => {
    return (
        <InputWrapper>
            <InputLabel htmlFor={id}>{labelName}</InputLabel>
            <Input
                type={type}
                name={id}
                id={id}
                ref={innerRef}
                onChange={onChangeFunction}
                onKeyDown={onKeyDownFunction}
                defaultValue={value}
                autoComplete="off"
            />
            <ErrorMessage>{message}</ErrorMessage>
        </InputWrapper>
    );
};

export default StringInput;
