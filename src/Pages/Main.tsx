import React, { lazy } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../Configs/atoms";

const CodeList = lazy(() => import("./CodeList"));
const Landing = lazy(() => import("./Landing"));

const Main = () => {
    const userData = useRecoilValue(currentUserState);

    return userData ? <CodeList /> : <Landing />;
};

export default Main;
