import React from "react";
import styled from "styled-components";
import { colors } from "../Constants/colors";
import { CheckBoxInputData } from "../Constants/types";

const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 6px 4px 2px;
    &,
    & * {
        cursor: pointer;
    }
    &:focus-within {
        outline-style: none;
        box-shadow: 0 0 0 2px ${colors.mainColor};
        border-radius: 6px;
    }
`;

const CheckBoxInput = styled.input`
    width: 16px;
    height: 16px;
    accent-color: ${colors.mainColor};
    &:focus-visible {
        outline-style: none;
    }
`;

const CheckBoxLabel = styled.label`
    font-size: 16px;
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
