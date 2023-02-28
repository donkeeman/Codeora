import React from "react";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { CheckBoxInputData } from "../Constants/types";

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

const CheckBox = ({
    id,
    labelName,
    onChangeFunction,
    checked,
}: CheckBoxInputData) => {
    return (
        <CheckBoxWrapper>
            <CheckBoxInput
                type="checkbox"
                name={id}
                id={id}
                onChange={onChangeFunction}
                checked={checked}
            />
            <CheckBoxLabel htmlFor={id}>{labelName}</CheckBoxLabel>
        </CheckBoxWrapper>
    );
};

export default CheckBox;
