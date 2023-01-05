import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button";
import CodeEditor from "../Components/CodeEditor";
import StringInput from "../Components/StringInput";
import Tag from "../Components/Tag";
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
    overflow: hidden;
`;

const TagList = styled.ul`
    width: 100%;
    height: 36px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: scroll;
`;

const WriteCode = () => {
    const [posting, setPosting] = useState({
        title: "",
        code: "",
        description: "",
        language: "",
        tag: [
            "자바스크립트",
            "알고리즘",
            "아주_아주_길고_길고_길고_긴_태그_태그",
        ],
    });
    const navigate = useNavigate();

    const codeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, [event.target.id]: event.target.value });
    };

    const deleteTagHandler = (index: number) => {
        posting.tag.splice(index, 1);
        setPosting({ ...posting });
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
                    <StringInput
                        type="text"
                        id="tag"
                        labelName="태그 (최대 3개)"
                        onChangeFunction={() => {}}
                    />
                    <TagList>
                        {posting.tag.map((tag, index) => {
                            return (
                                <Tag
                                    key={index}
                                    keyword={tag}
                                    onClickFunction={() => {
                                        deleteTagHandler(index);
                                    }}
                                ></Tag>
                            );
                        })}
                    </TagList>
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
                        type="secondary"
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
