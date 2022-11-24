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
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
};

export const signInGoogle = async (): Promise<UserCredential | undefined> => {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
};

export const signInGithub = async (): Promise<UserCredential | undefined> => {
    const result = await signInWithPopup(auth, githubProvider);
    return result;
};

export const createAccount = async (
    email: string,
    password: string,
    userName: string,
    profileImg = ""
): Promise<void> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const updatedResult = await updateProfile(result.user, {
        displayName: userName,
        photoURL: profileImg,
    });
    return updatedResult;
};
