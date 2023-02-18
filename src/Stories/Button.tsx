import React from "react";
import "./button.css";

type buttonData = {
    disabled?: boolean;
    buttonType: string;
    social?: string;
    content: string;
};

function Button({ disabled, buttonType, social, content }: buttonData) {
    const classList = `button ${buttonType} ${social}`;
    return (
        <button className={classList} disabled={disabled}>
            {social && <div className="icon">icon</div>}
            {social} {content}
        </button>
    );
}

export default Button;
