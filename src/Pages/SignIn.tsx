import React from "react";
import { useRef, useState } from "react";
// import { useQuery } from "react-query";
import { auth } from "../firebase.js";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

const SignIn = () => {
    // const [user, setUser] = useState(null);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const signInEmail = async (email: string, password: string) => {
        console.log(email);
        console.log(password);
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result.user);
        return result;
    };

    const signInGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result.user);
        return result;
    };

    const signInGithub = async () => {
        const result = await signInWithPopup(auth, githubProvider);
        console.log(result.user);
        return result;
    };

    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <h2>로그인하세요.</h2>
            <label htmlFor="email">이메일</label>
            <input type="text" name="email" id="email" ref={email} />
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                name="password"
                id="password"
                ref={password}
            />
            <button
                onClick={() => {
                    if (email.current && password.current) {
                        signInEmail(
                            email.current.value,
                            password.current.value
                        );
                    }
                }}
            >
                로그인
            </button>
            <p>또는</p>
            <button onClick={signInGoogle}>구글 계정으로 로그인</button>
            <button onClick={signInGithub}>깃허브 계정으로 로그인</button>
        </>
    );
};

export default SignIn;
