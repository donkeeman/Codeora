import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import CodeCard from "../Components/CodeCard";
import { currentUserState } from "../Configs/atoms";
import { db } from "../Configs/firebase";
import { queryKeys } from "../Constants/queryKeys";
import { signOutUser } from "../Services/auth";

const Main = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    const navigate = useNavigate();

    const getData = async () => {
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

    const { data, isLoading } = useQuery(queryKeys.codes, getData);

    return userData ? (
        <>
            <p>{userData.displayName}님, 어서 오세요!</p>
            <button
                onClick={async () => {
                    await signOutUser();
                    window.localStorage.removeItem("user");
                    setUserData(undefined);
                }}
            >
                로그아웃
            </button>
            <button onClick={() => navigate("/write")}>글쓰기</button>
            <ol>
                {!isLoading &&
                    data?.map((doc) => {
                        const codeData = doc.data();
                        return (
                            <li key={doc.id}>
                                <CodeCard
                                    title={codeData.title}
                                    description={codeData.description}
                                    tags={codeData.tag}
                                    language={codeData.language}
                                    date={codeData.timestamp.toDate()}
                                />
                            </li>
                        );
                    })}
            </ol>
        </>
    ) : (
        <>
            <Navigate to="/signin" />
        </>
    );
};

export default Main;
