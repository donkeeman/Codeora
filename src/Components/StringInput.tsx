import React, { MutableRefObject } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
`;

const InputLabel = styled.label`
    font-size: 18px;
    font-weight: bold;
    margin-left: 4px;
`;

const Input = styled.input`
    box-sizing: border-box;
    text-align: left;
    font-size: 20px;
    padding: 6px;
    border: 3px solid gray;
    border-radius: 6px;
`;

const ErrorMessage = styled.p`
    margin-left: 4px;
    color: red;
`;

type inputData = {
    type: string;
    id: string;
    labelName: string;
    innerRef: MutableRefObject<HTMLInputElement | null>;
    minLength: number;
    maxLength: number;
    message: string;
    onChangeFunction: React.ChangeEventHandler<HTMLInputElement>;
};

const StringInput = ({
    type,
    id,
    labelName,
    innerRef,
    minLength,
    maxLength,
    message,
    onChangeFunction,
}: inputData) => {
    return (
        <InputWrapper>
            <InputLabel htmlFor={id}>{labelName}</InputLabel>
            <Input
                type={type}
                name={id}
                id={id}
                ref={innerRef}
                minLength={minLength}
                maxLength={maxLength}
                onChange={onChangeFunction}
            />
            <ErrorMessage>{message}</ErrorMessage>
        </InputWrapper>
    );
};

export default StringInput;
