import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button";
import CodeEditor from "../Components/CodeEditor";
import StringInput from "../Components/StringInput";
import Textarea from "../Components/Textarea";
import Title from "../Components/Title";

const WriteCodeWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CodeWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 16px auto;
    gap: 20px;
`;

const CodeInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 0.8 0 0;
`;

const WriteCode = () => {
    const [posting, setPosting] = useState({
        title: "",
        code: "",
        description: "",
        language: "",
        tag: [],
    });
    const navigate = useNavigate();

    const codeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, [event.target.id]: event.target.value });
    };

    return (
        <WriteCodeWrapper>
            <Title title="코드 작성하기" />
            <CodeWrapper>
                <CodeEditor
                    code={posting.code}
                    onChangeFunction={codeHandler}
                />
                <CodeInfoWrapper>
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
                        rows={5}
                    />
                    {/* 태그 작성 추가 (space 누르면 태그로 입력되도록) */}
                    <Button
                        disabled={
                            !(
                                posting.code &&
                                posting.language &&
                                posting.title &&
                                posting.description
                            )
                        }
                        content="코드 작성"
                        onClickFunction={() => {}}
                    />
                    <Button
                        disabled={false}
                        content="작성 취소"
                        onClickFunction={() => navigate(-1)}
                    />
                </CodeInfoWrapper>
            </CodeWrapper>
        </WriteCodeWrapper>
    );
};

export default WriteCode;
