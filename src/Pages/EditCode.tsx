import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { currentCodeState, currentUserState } from "../Configs/atoms";
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

const EditCodeWrapper = styled.section`
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
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
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
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
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

const EditCode = () => {
    const userData = useRecoilValue(currentUserState);
    const [postingData, setPostingData] = useRecoilState(currentCodeState);
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
                if (posting.tag.length < variables.TAG_MAX_COUNT) {
                    setPosting({
                        ...posting,
                        tag: [...posting.tag, tagRef.current.value.trim()],
                    });
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
        const tagList = posting.tag.slice();
        tagList.splice(index, 1);
        setPosting({ ...posting, tag: [...tagList] });
    };

    const editCodeHandler = async () => {
        if (userData) {
            try {
                await updateDoc(
                    doc(db, `user/${userData.uid}/codes/${posting.id}`),
                    {
                        ...posting,
                        timestamp: serverTimestamp(),
                    }
                );
                alert("정상적으로 수정되었습니다.");
                setPostingData(undefined);
            } catch (error) {
                alert("잘못된 접근이거나 존재하지 않는 문서입니다.");
            }
            navigate("/");
            return;
        }
    };

    useEffect(() => {
        if (postingData) {
            setPosting({ ...postingData });
        }
        const pageLeaveHandler = (event: BeforeUnloadEvent) => {
            setPostingData(undefined);
            event.returnValue = false;
        };
        window.addEventListener("beforeunload", pageLeaveHandler);
        return () => {
            window.removeEventListener("beforeunload", pageLeaveHandler);
        };
    }, [postingData, setPostingData]);

    return (
        <EditCodeWrapper>
            <Title title="코드 수정하기" />
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
                        placeholder={`최대 ${variables.TAG_MAX_COUNT}자`}
                        onChangeFunction={postingHandler}
                        defaultValue={posting.title}
                        key={posting.id}
                        message={titleError}
                    />
                    <Textarea
                        id="description"
                        labelName="코드 설명"
                        onChangeFunction={postingHandler}
                        rows={5}
                        defaultValue={posting.description}
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
                        message="코드 수정"
                        onClickFunction={editCodeHandler}
                    />
                    <Button
                        type="secondary"
                        disabled={false}
                        message="수정 취소"
                        onClickFunction={() => navigate(-1)}
                    />
                </CodeInfoWrapper>
            </CodeWrapper>
        </EditCodeWrapper>
    );
};

export default EditCode;
