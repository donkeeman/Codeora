import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CodeCard from "./CodeCard";

export default {
    title: "Components/CodeCard",
    component: CodeCard,
} as ComponentMeta<typeof CodeCard>;

const Template: ComponentStory<typeof CodeCard> = (args) => (
    <CodeCard {...args} />
);

export const Short = Template.bind({});
Short.args = {
    title: "헬로 월드",
    description: "Lorem ipsum d",
    language: "JavaScript",
    tags: ["테스트", "test"],
    date: new Date(),
};

export const Long = Template.bind({});
Long.args = {
    title: "헬로 월드!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum quo voluptas maiores? Temporibus deleniti alias aliquam voluptate fuga delectus ut corporis eligendi itaque. Quos illo debitis dolore excepturi esse pariatur?",
    language: "JavaScript",
    tags: ["테스트", "test"],
    date: new Date(),
};
