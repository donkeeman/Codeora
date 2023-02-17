import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import CodeBlock from "../Components/CodeBlock";
import Tag from "../Components/Tag";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryKeys } from "../Constants/queryKeys";
import Button from "../Components/Button";

const CodeDetailWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CodeWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    margin: 16px auto;
    gap: 20px;
    .narrow {
        display: none;
    }
    .wide {
        display: block;
    }

    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 12px;
        .narrow {
            display: block;
        }
        .wide {
            display: none;
        }
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
        gap: 12px;
    }
`;

const CodeTitle = styled.h3`
    font-size: 28px;
    font-weight: bold;
`;

const CodeTime = styled.time`
    text-align: right;
    margin: 12px 2px 6px;
    &::after {
        content: "작성";
        margin-left: 4px;
    }
`;

const CodeDescription = styled.p`
    text-align: left;
    white-space: pre-wrap;
    font-size: 18px;
    border: 3px solid gray;
    border-radius: 6px;
    padding: 6px;
    height: 180px;
    line-height: 1.4;
    overflow: scroll;
    margin-bottom: 8px;
`;

const TagList = styled.ul`
    width: 100%;
    height: 36px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: scroll;
    overflow-y: hidden;
    &::before {
        content: "태그";
        margin-right: 4px;
        font-size: 20px;
    }
`;

const CodeDetail = () => {
    const userData = useRecoilValue(currentUserState);
    const navigate = useNavigate();
    const { postingId } = useParams();

    const getCodeDetail = async () => {
        if (userData) {
            const codeSnapShot = await getDoc(
                doc(db, `user/${userData.uid}/codes/${postingId}`)
            );
            return codeSnapShot.data();
        }
    };

    const { data: CodeData = null } = useQuery(
        `${queryKeys.code}_${postingId}`,
        getCodeDetail
    );

    const updateCodeHandler = async () => {};

    const deleteCodeHandler = async () => {
        if (userData) {
            await deleteDoc(doc(db, `user/${userData.uid}/codes/${postingId}`));
            navigate("/");
            return;
        }
    };

    return (
        <CodeDetailWrapper>
            {CodeData && (
                <>
                    <h2 className="a11y-hidden">코드 상세 정보</h2>
                    <CodeWrapper>
                        <CodeTitle className="narrow">
                            {CodeData.title}
                        </CodeTitle>
                        <CodeTime
                            className="narrow"
                            dateTime={CodeData.timestamp
                                .toDate()
                                .toLocaleDateString()}
                        >
                            {CodeData.timestamp.toDate().toLocaleDateString()}
                        </CodeTime>
                        <CodeBlock
                            code={CodeData.code}
                            language={CodeData.language}
                        />
                        <CodeInfoWrapper>
                            <CodeTitle className="wide">
                                {CodeData.title}
                            </CodeTitle>
                            <CodeTime
                                className="wide"
                                dateTime={CodeData.timestamp
                                    .toDate()
                                    .toLocaleDateString()}
                            >
                                {CodeData.timestamp
                                    .toDate()
                                    .toLocaleDateString()}
                            </CodeTime>
                            <CodeDescription>
                                {CodeData.description}
                            </CodeDescription>
                            <TagList>
                                {CodeData.tag.map(
                                    (tag: string, index: number) => (
                                        <Tag key={index} keyword={tag} />
                                    )
                                )}
                            </TagList>
                            <Button
                                disabled={false}
                                content="코드 수정"
                                onClickFunction={updateCodeHandler}
                            />
                            <Button
                                disabled={false}
                                content="코드 삭제"
                                onClickFunction={deleteCodeHandler}
                            />
                            <Button
                                disabled={false}
                                type="secondary"
                                content="목록으로 돌아가기"
                                onClickFunction={() => {
                                    navigate("/");
                                }}
                            />
                        </CodeInfoWrapper>
                    </CodeWrapper>
                </>
            )}
        </CodeDetailWrapper>
    );
};

export default CodeDetail;
