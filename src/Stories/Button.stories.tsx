import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Button from "./Button";

export default {
    title: "Components/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    disabled: false,
    buttonType: "primary",
    content: "로그인",
};

export const Secondary = Template.bind({});
Secondary.args = {
    buttonType: "secondary",
    content: "취소",
};

export const Social = Template.bind({});
Social.args = {
    buttonType: "social",
    social: "google",
    content: "계정으로 로그인",
};
