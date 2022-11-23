import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../atoms";
import { signInEmail, signInGoogle, signInGithub } from "../Hooks/auth";
import StringInput from "../Components/StringInput";
import Button from "../Components/Button";

const SignIn = () => {
    const [signInData, setsignInData] = useState({ email: "", password: "" });
    
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
    };

    const signInHandler = async (signInType: string) => {
        let userData;
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
                type="text"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                minLength={6}
                maxLength={20}
                message={""}
                onChangeFunction={inputHandler}
            />
            <span>@</span>
            <select>
                <option disabled selected>
                    메일 선택
                </option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
            </select>
            <StringInput
                type="password"
                id="password"
                labelName="비밀번호"
                innerRef={passwordRef}
                minLength={6}
                maxLength={20}
                message={"이메일 또는 비밀번호가 일치하지 않습니다."}
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
