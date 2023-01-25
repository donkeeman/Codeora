import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Configs/firebase";
import Button from "../Components/Button";
import CodeEditor from "../Components/CodeEditor";
import StringInput from "../Components/StringInput";
import Tag from "../Components/Tag";
import Textarea from "../Components/Textarea";
import Title from "../Components/Title";
import { currentUserState } from "../Configs/atoms";

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
    @media screen and (max-width: 900px) {
        flex-direction: column;
        gap: 12px;
    }
`;

const CodeInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 0.8 0 0;
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
    const userData = useRecoilValue(currentUserState);
    const [posting, setPosting] = useState({
        title: "",
        code: "",
        description: "",
        language: "",
        tag: [] as string[],
    });
    const navigate = useNavigate();
    const tagRef = useRef<HTMLInputElement>(null);

    const postingHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPosting({ ...posting, [event.target.id]: event.target.value });
    };

    const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPosting({ ...posting, [event.target.id]: event.target.value });
    };

    const addTagHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (tagRef.current) {
            if (event.key === " " || event.key === "Enter") {
                if (posting.tag.length < 3) {
                    posting.tag.push(tagRef.current.value.trim());
                    setPosting({ ...posting });
                } else {
                    alert("태그는 최대 3개까지 입력 가능합니다.");
                }
                tagRef.current.value = "";
            }
        }
    };

    const deleteTagHandler = (index: number) => {
        posting.tag.splice(index, 1);
        setPosting({ ...posting });
    };

    const uploadCodeHandler = async () => {
        if (userData) {
            const result = await addDoc(
                collection(db, `user/${userData.uid}/codes`),
                { ...posting, timestamp: serverTimestamp() }
            );
            if (result) {
                navigate("/");
            }
        }
    };

    return (
        <WriteCodeWrapper>
            <Title title="코드 작성하기" />
            <CodeWrapper>
                <CodeEditor
                    code={posting.code}
                    language={posting.language}
                    onChangeFunction={postingHandler}
                    onSelectFunction={selectHandler}
                />
                <CodeInfoWrapper>
                    <StringInput
                        type="text"
                        id="title"
                        labelName="제목"
                        onChangeFunction={postingHandler}
                    />
                    <Textarea
                        id="description"
                        labelName="코드 설명"
                        onChangeFunction={postingHandler}
                        rows={5}
                    />
                    <StringInput
                        type="text"
                        id="tag"
                        labelName="태그 (최대 3개)"
                        onKeyDownFunction={addTagHandler}
                        innerRef={tagRef}
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
                        onClickFunction={uploadCodeHandler}
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
