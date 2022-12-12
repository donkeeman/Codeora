import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";

const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const CheckBoxInput = styled.input`
    width: 16px;
    height: 16px;
    accent-color: ${colorVariants.mainColor};
`;

const CheckBoxLabel = styled.label`
    font-size: 16px;
    margin-left: 4px;
`;

type inputData = {
    id: string;
    labelName: string;
    onChangeFunction: React.ChangeEventHandler<HTMLInputElement>;
};

const CheckBox = ({ id, labelName, onChangeFunction }: inputData) => {
    return (
        <CheckBoxWrapper>
            <CheckBoxInput
                type="checkbox"
                name={id}
                id={id}
                onChange={onChangeFunction}
            />
            <CheckBoxLabel htmlFor={id}>{labelName}</CheckBoxLabel>
        </CheckBoxWrapper>
    );
};

export default CheckBox;
