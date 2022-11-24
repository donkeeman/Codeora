export const regExps = {
    email: new RegExp(
        "^[\\w\\d.!#$%&'*+-/=?^_`{|}~]+@[\\w-\\d]+\\.[\\w-\\d]+$"
    ),
    password: new RegExp("^[\\w\\d.!#$%&'*+-/=?^_`{|}~]{6,20}$"),
    userName: new RegExp("^[가-힣\\w\\d.!#$%&'*+-/=?^_`{|}~]{2,10}$"),
};
