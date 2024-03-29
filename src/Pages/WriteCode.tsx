import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styled from "styled-components";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import Button from "../Components/Button";
import CodeEditor from "../Components/CodeEditor";
import StringInput from "../Components/TextInput";
import Tag from "../Components/Tag";
import Textarea from "../Components/Textarea";
import Title from "../Components/Title";
import { autoCloseMap } from "../Constants/autoCloseMap";
import { CodeData } from "../Constants/types";
import { variables } from "../Constants/variables";

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
                event.target.value.length > variables.TITLE_MAX_COUNT
                    ? `최대 ${variables.TITLE_MAX_COUNT}자까지 가능합니다.`
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
                const prevLine = currentTextArea.value
                    .substring(0, start)
                    .split("\n")
                    .pop();
                const indent = prevLine?.match(/\t/g) || [];
                event.preventDefault();
                if (
                    autoCloseMap.has(currentTextArea.value[start - 1]) &&
                    autoCloseMap.get(currentTextArea.value[start - 1]) ===
                        currentTextArea.value[start]
                ) {
                    currentTextArea.setRangeText(
                        `\n${indent.join("")}\t\n${indent.join("")}`,
                        start,
                        end,
                        "end"
                    );
                    currentTextArea.selectionStart -= indent.length + 1;
                    currentTextArea.selectionEnd -= indent.length + 1;
                } else {
                    currentTextArea.setRangeText(
                        `\n${indent.join("")}`,
                        start,
                        end,
                        "end"
                    );
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
            case autoCloseMap.get(currentTextArea.value[start - 1]):
                event.preventDefault();
                currentTextArea.selectionStart += 1;
                currentTextArea.selectionEnd += 1;
                break;
            default:
                if (autoCloseMap.has(event.key)) {
                    currentTextArea.setRangeText(
                        currentTextArea.value.substring(start, end) +
                            autoCloseMap.get(event.key)!,
                        start,
                        end,
                        "start"
                    );
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
                event.preventDefault();
                if (posting.tag.length < variables.TAG_MAX_COUNT) {
                    tagRef.current.value.trim().length > 0 &&
                        posting.tag.push(tagRef.current.value.trim());
                    setPosting({ ...posting });
                } else {
                    alert(
                        `태그는 최대 ${variables.TAG_MAX_COUNT}개까지 입력 가능합니다.`
                    );
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

    useEffect(() => {
        const pageLeaveHandler = (event: BeforeUnloadEvent) => {
            event.returnValue = false;
        };
        window.addEventListener("beforeunload", pageLeaveHandler);
        return () => {
            window.removeEventListener("beforeunload", pageLeaveHandler);
        };
    }, []);

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
                        placeholder={`최대 ${variables.TITLE_MAX_COUNT}자`}
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
                        labelName="태그"
                        placeholder={`최대 ${variables.TAG_MAX_COUNT}개, 스페이스 바 또는 엔터로 입력`}
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
                        message="코드 작성"
                        onClickFunction={uploadCodeHandler}
                    />
                    <Button
                        type="secondary"
                        disabled={false}
                        message="작성 취소"
                        onClickFunction={() => navigate(-1)}
                    />
                </CodeInfoWrapper>
            </CodeWrapper>
        </WriteCodeWrapper>
    );
};

export default WriteCode;
