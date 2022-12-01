export const regExps = {
    email: new RegExp("^[\\w.!#$%&'*+-/=?^_`{|}~]+@[\\w-]+\\.[\\w-]+$"),
    password: new RegExp(
        "^(?=.*[A-Za-z])^(?=.*[\\d])^(?=.*[.!#$%&'*+-/=?^_`{|}~])[\\w.!#$%&'*+-/=?^_`{|}~]{6,20}$"
    ),
    userName: new RegExp("^[가-힣\\w_]{2,10}$"),
};
