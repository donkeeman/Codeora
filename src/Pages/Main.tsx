import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../Configs/atoms";
import CodeList from "./CodeList";
import Landing from "./Landing";

const Main = () => {
    const userData = useRecoilValue(currentUserState);

    return userData ? <CodeList /> : <Landing />;
};

export default Main;
