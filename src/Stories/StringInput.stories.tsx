import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StringInput } from "./StringInput";

export default {
    title: "Components/Input",
    components: StringInput,
} as ComponentMeta<typeof StringInput>;

const Template: ComponentStory<typeof StringInput> = (args) => (
    <StringInput {...args} />
);

export const Email = Template.bind({});
Email.args = {
    type: "email",
    labelName: "이메일",
};

export const Password = Template.bind({});
Password.args = {
    type: "password",
    labelName: "비밀번호",
};

export const Error = Template.bind({});
Error.args = {
    type: "text",
    labelName: "닉네임",
    errorMessage: "에러 메시지",
};
