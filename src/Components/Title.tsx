import React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
    font-size: 30px;
    font-weight: bold;
    margin: 30px auto;
`;

type titleData = {
    title: string;
};

const Title = ({ title }: titleData) => {
    return <StyledH2>{title}</StyledH2>;
};

export default Title;
