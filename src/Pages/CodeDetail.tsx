import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import CodeBlock from "../Components/CodeBlock";
import Tag from "../Components/Tag";
import Loading from "../Components/Loading";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryKeys } from "../Constants/queryKeys";
import Title from "../Components/Title";
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

    const { data, isLoading } = useQuery(
        `${queryKeys.codes}_${postingId}`,
        getCodeDetail
    );

    return (
        <CodeDetailWrapper>
            {isLoading ? (
                <Loading message="코드 정보를 불러오는 중..." />
            ) : (
                <>
                    <Title title="코드 상세" />
                    <CodeWrapper>
                        <CodeBlock
                            code={data?.code}
                            language={data?.language}
                        />
                        <CodeInfoWrapper>
                            <CodeTitle>{data?.title}</CodeTitle>
                            <CodeTime
                                dateTime={data?.timestamp
                                    .toDate()
                                    .toLocaleDateString()}
                            >
                                {data?.timestamp.toDate().toLocaleDateString()}
                            </CodeTime>
                            <CodeDescription>
                                {data?.description}
                            </CodeDescription>
                            <TagList>
                                {data?.tag.map((tag: string, index: number) => (
                                    <Tag key={index} keyword={tag} />
                                ))}
                            </TagList>
                            <Button
                                disabled={false}
                                content="코드 수정"
                                onClickFunction={() => {}}
                            />
                            <Button
                                disabled={false}
                                content="코드 삭제"
                                onClickFunction={() => {}}
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
