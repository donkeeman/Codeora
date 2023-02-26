import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { colorVariants } from "../Constants/colorVariants";
import { currentUserState, persistLoginState } from "../Configs/atoms";
import { signOutUser } from "../Services/auth";
import { headerMaxHeight } from "../Constants/variables";
import { logoPaths } from "../Constants/assetPath";
import {
    faKeyboard,
    faRightFromBracket,
    faRightToBracket,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import IconLink from "./IconLink";

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${headerMaxHeight}px;
    background-color: ${colorVariants.darkBlack};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    @media screen and (max-width: 830px) {
        padding: 0 20px;
    }
    @media screen and (max-width: 540px) {
        justify-content: center;
        padding: 0;
    }
`;

const Logo = styled.h1`
    width: 200px;
    max-height: 100%;
    & * {
        max-width: 100%;
    }
    .narrow {
        display: none;
    }
    @media screen and (max-width: 540px) {
        width: 120px;
        .wide {
            display: none;
        }
        .narrow {
            display: inline;
        }
    }
`;

const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    gap: 16px;
    @media screen and (max-width: 540px) {
        display: none;
        /* 메뉴가 많아진다면 햄버거 메뉴 형식으로 */
    }
`;

const User = styled.strong`
    font-size: 18px;
    &:after {
        content: "님, 어서 오세요!";
    }
    @media screen and (max-width: 830px) {
        &:after {
            content: "";
        }
    }
    @media screen and (max-width: 540px) {
        display: none;
    }
`;

const NavList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    &.narrow {
        display: none;
    }
    @media screen and (max-width: 830px) {
        gap: 6px;
        &.wide {
            display: none;
        }
        &.narrow {
            display: flex;
        }
    }
`;

const NavLink = styled(Link)`
    background-color: ${colorVariants.darkBlack};
    color: ${colorVariants.white};
    font-size: 18px;
    padding: 4px 16px;
    border-radius: 20px;
    border: 3px solid ${colorVariants.mainColor};
    transition: all linear 0.2s;
    &:hover,
    &:focus-visible {
        outline: none;
        background-color: ${colorVariants.mainColor};
        color: ${colorVariants.black};
    }
`;

const NavButton = styled.button`
    background-color: ${colorVariants.darkBlack};
    color: ${colorVariants.white};
    font-size: 18px;
    padding: 4px 16px;
    border-radius: 20px;
    border: 3px solid ${colorVariants.mainColor};
    transition: all linear 0.2s;
    &:hover,
    &:focus-visible {
        outline: none;
        background-color: ${colorVariants.mainColor};
        color: ${colorVariants.black};
    }
`;

const Header = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    const setPersistLoginData = useSetRecoilState(persistLoginState);
    const navigate = useNavigate();

    const signOutHandler = async () => {
        setUserData(undefined);
        setPersistLoginData(undefined);
        await signOutUser();
        navigate("/");
    };

    return (
        <HeaderWrapper>
            <Logo>
                <Link to="/">
                    <img
                        className="wide"
                        src={process.env.PUBLIC_URL + logoPaths.web}
                        alt="코더라"
                    />
                    <img
                        className="narrow"
                        src={process.env.PUBLIC_URL + logoPaths.mobile}
                        alt="코더라"
                    />
                </Link>
            </Logo>
            <NavWrapper>
                {userData ? (
                    <>
                        <User>{userData.displayName}</User>
                        <NavList className="wide">
                            <li>
                                <NavLink to="/write">
                                    <span>코드 작성</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavButton onClick={signOutHandler}>
                                    <span>로그아웃</span>
                                </NavButton>
                            </li>
                        </NavList>
                        <NavList className="narrow">
                            <li>
                                <IconLink
                                    to="/write"
                                    icon={faKeyboard}
                                    message="코드 작성"
                                    size="xl"
                                />
                            </li>
                            <li>
                                <IconButton
                                    onClickFunction={signOutHandler}
                                    icon={faRightFromBracket}
                                    message="로그아웃"
                                />
                            </li>
                        </NavList>
                    </>
                ) : (
                    <>
                        <NavList className="wide">
                            <li>
                                <NavLink to="/signup">
                                    <span>회원 가입</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/signin">
                                    <span>로그인</span>
                                </NavLink>
                            </li>
                        </NavList>
                        <NavList className="narrow">
                            <li>
                                <IconLink
                                    to="/signup"
                                    icon={faUserPlus}
                                    message="회원 가입"
                                />
                            </li>
                            <li>
                                <IconLink
                                    to="/signin"
                                    icon={faRightToBracket}
                                    message="로그인"
                                />
                            </li>
                        </NavList>
                    </>
                )}
            </NavWrapper>
        </HeaderWrapper>
    );
};

export default Header;
