import { auth } from "../firebase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    UserCredential,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInEmail = async (
    email: string,
    password: string
): Promise<UserCredential | undefined> => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

export const signInGoogle = async (): Promise<UserCredential | undefined> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

export const signInGithub = async (): Promise<UserCredential | undefined> => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};