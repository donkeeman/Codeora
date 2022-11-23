import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Hooks/auth";
import StringInput from "../Components/StringInput";
import Button from "../Components/Button";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        profileImg: "",
    });

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const userNameRef = useRef<HTMLInputElement | null>(null);
    const profileImgRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    const signUpHandler = async () => {
        if (emailRef.current && passwordRef.current && userNameRef.current) {
            await createAccount(
                emailRef.current.value,
                passwordRef.current.value,
                userNameRef.current.value,
                profileImgRef.current?.value
            );
            navigate("/login");
        }
    };

    return (
        <>
            <h2>코더라에 가입하여 나의 코드를 저장해 보세요.</h2>
            <input
                type="file"
                name="profileImg"
                id="profileImg"
                ref={profileImgRef}
            />
            <StringInput
                type="text"
                id="userName"
                labelName="닉네임 (2~10자 사이의 한글, 영어 및 숫자)"
                innerRef={userNameRef}
                minLength={2}
                maxLength={10}
                message={
                    "2~10자 사이의 한글, 영어 및 숫자의 조합만 가능합니다."
                }
            />
            <StringInput
                type="text"
                id="email"
                labelName="이메일"
                innerRef={emailRef}
                minLength={6}
                maxLength={20}
                message={""}
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
                labelName="비밀번호 (6~20자 사이의 영어 대소문자, 숫자 및 특수 기호)"
                innerRef={passwordRef}
                minLength={6}
                maxLength={20}
                message={
                    "6~20자 사이의 영어 대소문자, 숫자 및 특수 기호의 조합만 가능합니다."
                }
            />
            <StringInput
                type="confirmPassword"
                id="confirmPassword"
                labelName="비밀번호 확인"
                innerRef={confirmPasswordRef}
                minLength={6}
                maxLength={20}
                message={"비밀번호가 일치하지 않습니다."}
            />
            <Button
                disabled={
                    !(
                        signUpData.email &&
                        signUpData.password &&
                        signUpData.userName
                    )
                }
                content="가입하기"
                onClickFunction={signUpHandler}
            />
            <p>이미 계정이 있으신가요? </p>
            <Link to={"/signin"}>로그인</Link>
        </>
    );
};

export default SignUp;
