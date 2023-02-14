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
    height: 500px;
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
    gap: 6px;
    flex: 0.8 0 0;
    overflow: hidden;
    @media screen and (max-width: 800px) {
        flex: 1;
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
                            <h3>{data?.title}</h3>
                            <p>{data?.description}</p>
                            <TagList>
                                {data?.tag.map((tag: string, index: number) => (
                                    <Tag key={index} keyword={tag} />
                                ))}
                            </TagList>
                            <span>{data?.language}</span>
                            <time
                                dateTime={data?.timestamp
                                    .toDate()
                                    .toLocaleDateString()}
                            >
                                {data?.timestamp.toDate().toLocaleDateString()}
                            </time>
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
                                    navigate(-1);
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
