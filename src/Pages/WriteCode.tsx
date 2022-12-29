import React, { useState } from "react";
import CodeEditor from "../Components/CodeEditor";
import StringInput from "../Components/StringInput";
import Textarea from "../Components/Textarea";
import Title from "../Components/Title";

const WriteCode = () => {
    const [posting, setPosting] = useState({
        title: "",
        code: "",
        description: "",
        language: "",
        tag: [],
    });

    const codeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, [event.target.id]: event.target.value });
    };

    return (
        <>
            <Title title="코드 작성하기" />
            <CodeEditor code={posting.code} onChangeFunction={codeHandler} />
            <StringInput
                type="text"
                id="title"
                labelName="제목"
                onChangeFunction={codeHandler}
            />
            <Textarea
                id="description"
                labelName="코드 설명"
                onChangeFunction={codeHandler}
            />
        </>
    );
};

export default WriteCode;
