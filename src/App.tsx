import React, { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useSetRecoilState } from "recoil";
import Loading from "./Components/Loading";
import Header from "./Components/Header";
import { currentUserState } from "./Configs/atoms";
import GlobalStyle from "./Configs/GlobalStyle";
import Router from "./Configs/Router";

const App = () => {
    const setUserData = useSetRecoilState(currentUserState);
    useEffect(() => {
        const localUser = window.localStorage.getItem("user");
        if (localUser) {
            setUserData(JSON.parse(localUser));
        }
    }, [setUserData]);

    return (
        <div className="App">
            <GlobalStyle />
            <Loading />
            <Header />
            <Router />
            <ReactQueryDevtools />
        </div>
    );
};

export default App;
