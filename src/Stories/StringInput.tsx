import React from "react";
import "./stringInput.css";

type inputData = {
    type: string;
    labelName: string;
    errorMessage: string;
};

export const StringInput = ({ type, labelName, errorMessage }: inputData) => {
    return (
        <div className="inputWrapper">
            <label className="inputLabel" htmlFor={labelName}>
                {labelName}
            </label>
            <input
                type={type}
                name={labelName}
                id={labelName}
                placeholder={labelName}
                autoComplete="off"
            />
            {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
    );
};
