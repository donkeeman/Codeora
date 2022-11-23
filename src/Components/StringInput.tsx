import React, { MutableRefObject } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const InputLabel = styled.label`
    font-size: 18px;
    font-weight: bold;
    margin-left: 4px;
`;

const Input = styled.input`
    box-sizing: border-box;
    font-size: 20px;
    padding: 6px;
    border: 3px solid gray;
    border-radius: 6px;
`;

const ErrorMessage = styled.p`
    margin-left: 4px;
    font-size: 14px;
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
};

const StringInput = ({
    type,
    id,
    labelName,
    innerRef,
    minLength,
    maxLength,
    message,
}: inputData) => {
    return (
        <InputWrapper>
            <InputLabel htmlFor={id}>
                {labelName}
            </InputLabel>
            <Input
                type={type}
                name={id}
                id={id}
                ref={innerRef}
                minLength={minLength}
                maxLength={maxLength}
            />
            <ErrorMessage>{message}</ErrorMessage>
        </InputWrapper>
    );
};

export default StringInput;
