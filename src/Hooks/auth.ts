import { auth } from "../Configs/firebase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    UserCredential,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signInGoogle = async (): Promise<UserCredential> => {
    return await signInWithPopup(auth, googleProvider);
};

export const signInGithub = async (): Promise<UserCredential> => {
    return await signInWithPopup(auth, githubProvider);
};

export const createAccount = async (
    email: string,
    password: string,
    userName: string
): Promise<void> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const updatedResult = await updateProfile(result.user, {
        displayName: userName,
    });
    return updatedResult;
};

export const signOutUser = async (): Promise<void> => {
    const result = await signOut(auth);
    return result;
};
