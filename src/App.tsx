import React, { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Loading from "./Components/Loading";
import Header from "./Components/Header";
import { currentUserState, persistLoginState } from "./Configs/atoms";
import GlobalStyle from "./Configs/GlobalStyle";
import { Outlet } from "react-router";

const App = () => {
    const setUserData = useSetRecoilState(currentUserState);
    const persistUserData = useRecoilValue(persistLoginState);
    useEffect(() => {
        setUserData(persistUserData);
    }, [setUserData, persistUserData]);

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
