import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "firebase/auth";

// const { persistAtom } = recoilPersist();
const { persistAtom } = recoilPersist({
    storage: sessionStorage,
});

const currentUserState = atom<User | undefined>({
    key: "currentUserState",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});

const currentCodeState = atom<Object | undefined>({
    key: "currnetCodeState",
    default: undefined,
});

export { currentUserState, currentCodeState };
