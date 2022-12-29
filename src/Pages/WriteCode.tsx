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

    const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosting({ ...posting, title: event.target.value });
    };

    const descriptionInputHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, title: event.target.value });
    };

    const codeInputHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, code: event.target.value });
    };

    return (
        <>
            <Title title="코드 작성하기" />
            <CodeEditor
                code={posting.code}
                onChangeFunction={codeInputHandler}
            />
            <StringInput
                type="text"
                id="title"
                labelName="제목"
                onChangeFunction={titleInputHandler}
            />
            <Textarea
                id="description"
                labelName="코드 설명"
                onChangeFunction={descriptionInputHandler}
            />
        </>
    );
};

export default WriteCode;
