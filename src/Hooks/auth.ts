import { auth } from "../firebase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
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

export const createAccount = async (
    email: string,
    password: string,
    userName: string,
    profileImg = ""
): Promise<void> => {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const updatedResult = await updateProfile(result.user, {
            displayName: userName,
            photoURL: profileImg,
        });
        return updatedResult;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
