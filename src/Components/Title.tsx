import React from "react";
import styled from "styled-components";

const MainTitle = styled.h2`
    font-size: 30px;
    font-weight: bold;
`;

const SubTitle = styled.p`
    font-size: 20px;
    margin-top: -5px;
`;

type titleData = {
    title: string;
    subTitle?: string;
};

const Title = ({ title, subTitle }: titleData) => {
    return (
        <>
            <MainTitle>{title}</MainTitle>
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </>
    );
};

export default Title;
