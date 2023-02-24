import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import CodeCard from "../Components/CodeCard";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryKeys } from "../Constants/queryKeys";

const MainWrapper = styled.section`
    width: 100%;
`;

const CodeList = styled.ol`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    justify-items: center;
    row-gap: 8px;
    & > li {
        width: 230px;
        height: 250px;
    }
    @media screen and (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 830px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 540px) {
        grid-template-columns: 1fr;
        & > li {
            width: 350px;
        }
    }
    @media screen and (max-width: 400px) {
        & > li {
            width: 230px;
        }
    }
`;

const Main = () => {
    const userData = useRecoilValue(currentUserState);
    const navigate = useNavigate();

    const getCodeList = async () => {
        if (userData) {
            const codeQuery = query(
                collection(db, `user/${userData.uid}/codes`),
                orderBy("timestamp", "desc"),
                limit(12) // 추후에 무한 스크롤 추가
            );
            const codeSnapshot = await getDocs(codeQuery);
            return codeSnapshot.docs;
        }
    };

    const { data: codeList = null } = useQuery(queryKeys.code, getCodeList);

    return userData ? (
        <MainWrapper>
            {codeList &&
                (codeList.length > 0 ? (
                    <CodeList>
                        {codeList.map((doc) => {
                            const codeData = doc.data();
                            return (
                                <li key={doc.id}>
                                    <CodeCard
                                        id={doc.id}
                                        title={codeData.title}
                                        description={codeData.description}
                                        tags={codeData.tag}
                                        language={codeData.language}
                                        date={codeData.timestamp.toDate()}
                                    />
                                </li>
                            );
                        })}
                    </CodeList>
                ) : (
                    <>
                        <p>저장된 코드가 없습니다.</p>
                        <button onClick={() => navigate("/write")}>
                            코드 작성하기
                        </button>
                    </>
                ))}
        </MainWrapper>
    ) : (
        <>
            <Navigate to="/signin" />
        </>
    );
};

export default Main;
