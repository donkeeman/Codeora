import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { currentUserState, persistLoginState } from "../Configs/atoms";
import { signOutUser } from "../Services/auth";
import { headerMaxHeight } from "../Constants/variables";
import { logoPaths } from "../Constants/assetPath";

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${headerMaxHeight}px;
    background-color: ${colorVariants.darkBlack};
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
    padding: 0 50px;
`;

const Logo = styled.h1`
    margin-right: auto;
    width: 200px;
    max-height: 100%;
    & * {
        max-width: 100%;
    }
`;

const User = styled.p`
    font-size: 18px;
`;

const NavLink = styled(Link)`
    background-color: ${colorVariants.darkBlack};
    color: ${colorVariants.white};
    font-size: 18px;
    padding: 8px 16px;
    border-radius: 20px;
    border: 3px solid ${colorVariants.mainColor};
    &:hover,
    &:focus-visible {
        background-color: ${colorVariants.mainColor};
        color: ${colorVariants.black};
    }
`;

const NavButton = styled.button`
    background-color: ${colorVariants.darkBlack};
    color: ${colorVariants.white};
    font-size: 18px;
    padding: 8px 16px;
    border-radius: 20px;
    line-height: 1;
    border: 3px solid ${colorVariants.mainColor};
    &:hover,
    &:focus-visible {
        background-color: ${colorVariants.mainColor};
        color: ${colorVariants.black};
    }
`;

const Header = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    const setPersistLoginData = useSetRecoilState(persistLoginState);

    return (
        <HeaderWrapper>
            <Logo>
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + logoPaths.web}
                        alt="코더라"
                    />
                </Link>
            </Logo>
            {userData ? (
                <>
                    <User>{userData.displayName}님, 어서 오세요!</User>
                    <NavLink to="/write">코드 작성</NavLink>
                    <NavButton
                        onClick={async () => {
                            setUserData(undefined);
                            setPersistLoginData(undefined);
                            await signOutUser();
                        }}
                    >
                        로그아웃
                    </NavButton>
                </>
            ) : (
                <>
                    <NavLink to="/signup">회원 가입</NavLink>
                    <NavLink to="/signin">로그인</NavLink>
                </>
            )}
        </HeaderWrapper>
    );
};

export default Header;
