import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../atoms";
import { signInEmail, signInGoogle, signInGithub } from "../Hooks/auth";
import StringInput from "../Components/StringInput";
import Button from "../Components/Button";
import { regExps } from "../Constants/regExps";
import { FirebaseError } from "firebase/app";

const SignIn = () => {
    const [signInData, setsignInData] = useState({ email: "", password: "" });
    const [signInError, setSignInError] = useState({ email: "", password: "" });

    // focus, blur 할 때 필요 없다면 ref는 지워도 됨
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const setUserData = useSetRecoilState(currentUserState);
    const navigate = useNavigate();

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsignInData({
            ...signInData,
            [event.target.id]: event.target.value,
        });
        setSignInError({ email: "", password: "" });
    };

    const signInHandler = async (signInType: string) => {
        if (!regExps.email.test(signInData.email)) {
            setSignInError({
                ...signInError,
                email: "이메일 형식이 올바르지 않습니다.",
            });
            return;
        }
        let userData;
        try {
            switch (signInType) {
                case "email":
                    if (signInData.email && signInData.password) {
                        userData = await signInEmail(
                            signInData.email,
                            signInData.password
                        );
                    }
                    break;
                case "google":
                    userData = await signInGoogle();
                    break;
                case "github":
                    userData = await signInGithub();
                    break;
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                let errorMessage = "";
                switch (error.code) {
                    case "auth/internal-error":
                        errorMessage =
                            "서버가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "존재하지 않는 이메일입니다.";
                        break;
                    case "auth/wrong-password":
                        errorMessage = "비밀번호가 일치하지 않습니다.";
                        break;
                }
                setSignInError({
                    ...signInError,
                    password: errorMessage,
                });
                return;
            }
        }
        if (userData) {
            setUserData(userData.user);
        }
        navigate("/");
    };
    return (
        <>
            <h2>코더라에 오신 것을 환영합니다.</h2>
            <h2>로그인하여 나의 코드를 저장해 보세요.</h2>
            <StringInput
                type="email"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                message={signInError.email}
                onChangeFunction={inputHandler}
            />
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호"
                innerRef={passwordRef}
                message={signInError.password}
                onChangeFunction={inputHandler}
            />
            <Button
                disabled={!(signInData.email && signInData.password)}
                content={"로그인"}
                onClickFunction={() => signInHandler("email")}
            />
            <p>또는</p>
            <Button
                disabled={false}
                content={"구글 계정으로 로그인"}
                onClickFunction={() => signInHandler("google")}
            />
            <Button
                disabled={false}
                content={"깃허브 계정으로 로그인"}
                onClickFunction={() => signInHandler("github")}
            />
            <p>계정이 없으신가요? </p>
            <Link to={"/signup"}>회원 가입</Link>
        </>
    );
};

export default SignIn;
