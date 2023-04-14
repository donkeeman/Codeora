import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilState, useRecoilValue } from "recoil";
import Header from "./Components/Header";
import Loading from "./Components/Loading";
import { currentUserState, persistLoginState } from "./Configs/atoms";
import GlobalStyle from "./Configs/GlobalStyle";

const App = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    const persistUserData = useRecoilValue(persistLoginState);
    useEffect(() => {
        setUserData(persistUserData || userData);
    }, [userData, setUserData, persistUserData]);

    return (
        <div className="App">
            <GlobalStyle />
            <Header />
            <main className="main">
                <Loading />
                <Outlet />
            </main>
            <ReactQueryDevtools />
        </div>
    );
};

export default App;
