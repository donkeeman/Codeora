import { atom } from "recoil";
import { User } from "firebase/auth";

const currentUserState = atom<User | undefined>({
    key: "currentUserState",
    default: undefined,
});

const persistLoginState = atom<boolean>({
    key: "persistLoginState",
    default: false,
});
export { currentUserState, persistLoginState };
