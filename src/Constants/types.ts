import React, { MutableRefObject } from "react";

// 로그인 시 정보 확인 및 에러 메시지 띄울 때 사용
export interface LoginData {
    email: string;
    password: string;
}

// 회원 가입 시 정보 확인에 사용
export interface UserData extends LoginData {
    confirmPassword: string;
    userName: string;
}

// 코드 하이라이터에 사용
export interface HighlighterData {
    code: string;
    language: string;
}

// 코드 작성 시 코드 에디터에 사용
export interface EditorData extends HighlighterData {
    onChangeFunction: React.ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDownFunction: React.KeyboardEventHandler<HTMLTextAreaElement>;
    onSelectFunction: React.ChangeEventHandler<HTMLSelectElement>;
}

// 코드 작성 시 사용
export interface CodeData {
    title: string;
    code: string;
    description: string;
    language: string;
    tag: string[];
}

// input 기본 속성
export interface InputData {
    id: string;
    labelName: string;
}

// type="text"인 input에 사용
export interface StringInputData extends InputData {
    type: string;
    innerRef?: MutableRefObject<HTMLInputElement | null>;
    onChangeFunction?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDownFunction?: React.KeyboardEventHandler<HTMLInputElement>;
    message?: string;
    value?: string;
    maxLength?: number;
    placeholder?: string;
}

// textarea에 사용
export interface TextareaData extends InputData {
    innerRef?: MutableRefObject<HTMLTextAreaElement | null>;
    onChangeFunction?: React.ChangeEventHandler<HTMLTextAreaElement>;
    rows: number;
}