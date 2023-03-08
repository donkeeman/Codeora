import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import Button from "../Components/Button";
import ButtonLink from "../Components/ButtonLink";
import CodeBlock from "../Components/CodeBlock";
import Tag from "../Components/Tag";
import { currentCodeState, currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryKeys } from "../Constants/queryKeys";
import { variables } from "../Constants/variables";
import { faDizzy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../Components/Title";

const CodeDetailWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    &.noData {
        max-width: 400px;
        margin: 0 auto;
    }
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

    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
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
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
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
    &::before {
        content: "최종 수정";
        margin-right: 4px;
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

const ErrorWrapper = styled.div`
    max-width: 400px;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    gap: 40px;
`;

const NoCodeMessage = styled.p`
    font-size: 20px;
`;

const CodeDetail = () => {
    const userData = useRecoilValue(currentUserState);
    const setCodeData = useSetRecoilState(currentCodeState);
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

    const { data: CodeData = null, isLoading } = useQuery(
        `${queryKeys.code}_${postingId}`,
        getCodeDetail
    );

    const deleteCodeHandler = async () => {
        if (userData) {
            try {
                await deleteDoc(
                    doc(db, `user/${userData.uid}/codes/${postingId}`)
                );
                alert("정상적으로 삭제되었습니다.");
            } catch (error) {
                alert("존재하지 않는 문서입니다.");
            }
            navigate("/");
            return;
        }
    };

    return (
        <CodeDetailWrapper className={CodeData ? "" : "noData"}>
            {CodeData ? (
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
                            title={CodeData.title}
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
                                message="코드 수정"
                                onClickFunction={() => {
                                    setCodeData({
                                        id: postingId,
                                        title: CodeData.title,
                                        description: CodeData.description,
                                        code: CodeData.code,
                                        tag: CodeData.tag,
                                        language: CodeData.language,
                                    });
                                    navigate(`/edit/${postingId}`);
                                }}
                            />
                            <Button
                                disabled={false}
                                message="코드 삭제"
                                onClickFunction={deleteCodeHandler}
                            />
                            <ButtonLink
                                disabled={false}
                                type="secondary"
                                message="목록으로 돌아가기"
                                to="/"
                            />
                        </CodeInfoWrapper>
                    </CodeWrapper>
                </>
            ) : (
                !isLoading && (
                    <>
                        <Title title="존재하지 않는 코드" />
                        <ErrorWrapper>
                            <FontAwesomeIcon icon={faDizzy} size={"10x"} />
                            <NoCodeMessage>
                                해당 ID를 가진 코드가 없습니다.
                            </NoCodeMessage>
                            <ButtonLink
                                disabled={false}
                                message="목록으로 돌아가기"
                                to="/"
                            />
                        </ErrorWrapper>
                    </>
                )
            )}
        </CodeDetailWrapper>
    );
};

export default CodeDetail;
