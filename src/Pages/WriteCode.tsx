import React, { useState } from "react";
import CodeEditor from "../Components/CodeEditor";

const WriteCode = () => {
    const [posting, setPosting] = useState({
        title: "",
        code: "",
        lang: "",
        tag: [],
    });

    const codeInputHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, code: event.target.value });
    };

    return (
        <CodeEditor code={posting.code} onChangeFunction={codeInputHandler} />
    );
};

export default WriteCode;
