import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "firebase/auth";
import { CodeData } from "../Constants/types";

const { persistAtom: sessionPersistAtom } = recoilPersist({
    storage: sessionStorage,
});

const { persistAtom: localPersistAtom } = recoilPersist({
    storage: localStorage,
});

// 현재 로그인된 사용자의 정보
export const currentUserState = atom<User | undefined>({
    key: "currentUserState",
    default: undefined,
    effects_UNSTABLE: [sessionPersistAtom],
});

// 자동 로그인 사용자 정보
export const persistLoginState = atom<User | undefined>({
    key: "persistLoginUserState",
    default: undefined,
    effects_UNSTABLE: [localPersistAtom],
});

// 이메일 저장 체크 시 저장되는 이메일 주소
export const savedEmailState = atom<string | undefined>({
    key: "savedEmail",
    default: undefined,
    effects_UNSTABLE: [localPersistAtom],
});

// 수정할 코드 정보
export const currentCodeState = atom<CodeData | undefined>({
    key: "currentCodeState",
    default: undefined,
    effects_UNSTABLE: [sessionPersistAtom],
});
