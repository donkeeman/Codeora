import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styled from "styled-components";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import Button from "../Components/Button";
import CodeEditor from "../Components/CodeEditor";
import StringInput from "../Components/StringInput";
import Tag from "../Components/Tag";
import Textarea from "../Components/Textarea";
import Title from "../Components/Title";
import { autoCloseMap } from "../Constants/autoCloseMap";
import { CodeData } from "../Constants/types";
import { titleMaxLength } from "../Constants/variables";

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
    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 12px;
    }
`;

const CodeInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0.8 0 0;
    overflow: hidden;
    @media screen and (max-width: 800px) {
        flex: 1;
        justify-content: flex-start;
        gap: 10px;
    }
`;

const TagList = styled.ul`
    width: 100%;
    height: 36px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: scroll;
    margin-top: -10px;
`;

const WriteCode = () => {
    const userData = useRecoilValue(currentUserState);
    const [posting, setPosting] = useState<CodeData>({
        title: "",
        code: "",
        description: "",
        language: "",
        tag: [],
    });
    const [titleError, setTitleError] = useState("");
    const navigate = useNavigate();
    const tagRef = useRef<HTMLInputElement>(null);

    const postingHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.target.id === "title") {
            setTitleError(
                event.target.value.length > titleMaxLength
                    ? `최대 ${titleMaxLength}자까지 가능합니다.`
                    : ""
            );
        }
        setPosting({ ...posting, [event.target.id]: event.target.value });
    };

    const autoCompleteHandler = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        const currentTextArea = event.target as HTMLTextAreaElement;
        const start = currentTextArea.selectionStart;
        const end = currentTextArea.selectionEnd;
        switch (event.key) {
            case "Tab":
                event.preventDefault();
                currentTextArea.setRangeText("\t", start, end, "end");
                break;
            case "Enter":
                if (
                    autoCloseMap.has(currentTextArea.value[start - 1]) &&
                    autoCloseMap.get(currentTextArea.value[start - 1]) ===
                        currentTextArea.value[start]
                ) {
                    event.preventDefault();
                    currentTextArea.setRangeText("\n\t\n", start, end, "end");
                    currentTextArea.selectionStart -= 1;
                    currentTextArea.selectionEnd -= 1;
                }
                break;
            case "Backspace":
                if (
                    autoCloseMap.has(currentTextArea.value[start - 1]) &&
                    autoCloseMap.get(currentTextArea.value[start - 1]) ===
                        currentTextArea.value[start]
                ) {
                    event.preventDefault();
                    currentTextArea.setRangeText(
                        "",
                        start - 1,
                        end + 1,
                        "start"
                    );
                }
                break;
            default:
                if (autoCloseMap.has(event.key)) {
                    currentTextArea.setRangeText(
                        autoCloseMap.get(event.key)!,
                        start,
                        end,
                        "start"
                    );
                    setPosting({ ...posting, code: currentTextArea.value });
                }
                break;
        }
        setPosting({ ...posting, code: currentTextArea.value });
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
                    onKeyDownFunction={autoCompleteHandler}
                    onSelectFunction={selectHandler}
                />
                <CodeInfoWrapper>
                    <StringInput
                        type="text"
                        id="title"
                        labelName="제목"
                        placeholder="최대 16자"
                        onChangeFunction={postingHandler}
                        message={titleError}
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
                        placeholder="스페이스 바 또는 엔터로 입력"
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
                                />
                            );
                        })}
                    </TagList>
                    <Button
                        disabled={
                            !(
                                posting.code &&
                                posting.language &&
                                posting.title &&
                                posting.description &&
                                !titleError
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
