import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "firebase/auth";
import { codeDataType } from "./types";

// const { persistAtom } = recoilPersist();
const { persistAtom } = recoilPersist({
    storage: sessionStorage,
});

const currentUserState = atom<User | undefined>({
    key: "currentUserState",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});



const currentCodeState = atom<codeDataType | undefined>({
    key: "currentCodeState",
    default: undefined,
});

export { currentUserState, currentCodeState };
