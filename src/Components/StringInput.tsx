import React, { MutableRefObject } from "react";
import styled from "styled-components";

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
`;

const ErrorMessage = styled.p`
    position: absolute;
    bottom: -18px;
    margin-left: 4px;
    color: red;
`;

type inputData = {
    type: string;
    id: string;
    labelName: string;
    innerRef?: MutableRefObject<HTMLInputElement | null>;
    onChangeFunction: React.ChangeEventHandler<HTMLInputElement>;
    message?: string;
    value?: string;
};

const StringInput = ({
    type,
    id,
    labelName,
    innerRef,
    message,
    onChangeFunction,
    value,
}: inputData) => {
    return (
        <InputWrapper>
            <InputLabel htmlFor={id}>{labelName}</InputLabel>
            <Input
                type={type}
                name={id}
                id={id}
                ref={innerRef}
                onChange={onChangeFunction}
                defaultValue={value}
                autoComplete="off"
            />
            <ErrorMessage>{message}</ErrorMessage>
        </InputWrapper>
    );
};

export default StringInput;
