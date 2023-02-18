import React from "react";
import "./codeCard.css";

type codeData = {
    title: string;
    description: string;
    tags: Array<string>;
    language: string;
    date: Date;
};

function CodeCard({ title, description, tags, language, date }: codeData) {
    return (
        <li className="card">
            <h3 className="title">{title}</h3>
            <p className="description">{description}</p>
            <ul className="tagList">
                {tags.map((tag) => (
                    <li>{tag}</li>
                ))}
            </ul>
            <div className="langDateContainer">
                <span className="language">{language}</span>
                <span className="date">{date.toLocaleDateString()}</span>
            </div>
        </li>
    );
}

export default CodeCard;
