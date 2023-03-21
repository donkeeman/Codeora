import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
    faKeyboard,
    faRightFromBracket,
    faRightToBracket,
    faUserPen,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import IconLink from "./IconLink";
import { queryClient } from "../Configs/queryClient";
import { colors } from "../Constants/colors";
import { currentUserState, persistLoginState } from "../Configs/atoms";
import { signOutUser } from "../Services/auth";
import { logoPath } from "../Constants/assetPath";
import { variables } from "../Constants/variables";

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${variables.HEADER_HEIGHT}px;
    background-color: ${colors.darkBlack};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    z-index: 200;
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        padding: 0 2%;
    }
`;

const Logo = styled.h1`
    width: 200px;
    max-height: 100%;
    margin-left: 8px;
    & * {
        max-width: 100%;
    }
    @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
        width: 160px;
    }
    @media screen and (max-width: ${variables.MEDIA_THIRD_WIDTH}px) {
        width: 140px;
        margin-left: 2px;
    }
`;

const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const User = styled.strong`
    font-size: 18px;
    &:after {
        content: "님, 어서 오세요!";
    }
    @media screen and (max-width: ${variables.MEDIA_FIRST_WIDTH}px) {
        &:after {
            content: "";
        }
    }
    @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
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
    @media screen and (max-width: ${variables.MAX_WIDTH}px) {
        &.wide {
            display: none;
        }
        &.narrow {
            display: flex;
            & li {
                width: 48px;
                height: 48px;
            }
        }
    }
    @media screen and (max-width: ${variables.MEDIA_SECOND_WIDTH}px) {
        &.narrow {
            & li {
                width: 36px;
                height: 36px;
            }
        }
    }
    @media screen and (max-width: ${variables.MEDIA_THIRD_WIDTH}px) {
        &.narrow {
            & li {
                width: 24px;
                height: 24px;
            }
        }
    }
`;

const NavLink = styled(Link)`
    background-color: ${colors.darkBlack};
    color: ${colors.white};
    font-size: 18px;
    padding: 4px 16px;
    border-radius: 20px;
    border: 3px solid ${colors.mainColor};
    transition: all linear 0.2s;
    &:hover,
    &:focus-visible {
        outline: none;
        background-color: ${colors.mainColor};
        color: ${colors.black};
    }
`;

const NavButton = styled.button`
    background-color: ${colors.darkBlack};
    color: ${colors.white};
    font-size: 18px;
    padding: 4px 16px;
    border-radius: 20px;
    border: 3px solid ${colors.mainColor};
    transition: all linear 0.2s;
    &:hover,
    &:focus-visible {
        outline: none;
        background-color: ${colors.mainColor};
        color: ${colors.black};
    }
`;

const Header = () => {
    const [userData, setUserData] = useRecoilState(currentUserState);
    const setPersistLoginData = useSetRecoilState(persistLoginState);
    const navigate = useNavigate();

    const signOutHandler = async () => {
        await signOutUser();
        setUserData(undefined);
        setPersistLoginData(undefined);
        queryClient.removeQueries();
        navigate("/");
    };

    return (
        <HeaderWrapper>
            <Logo>
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + logoPath} alt="코더라" />
                </Link>
            </Logo>
            <NavWrapper>
                {userData ? (
                    <>
                        <User>{userData.displayName}</User>
                        <NavList className="wide">
                            <li>
                                <NavLink to="/write">코드 작성</NavLink>
                            </li>
                            <li>
                                {/* <NavLink to="/">프로필 수정</NavLink> */}
                                <NavButton
                                    onClick={() => alert("준비 중입니다.")}
                                >
                                    프로필 수정
                                </NavButton>
                            </li>
                            <li>
                                <NavButton onClick={signOutHandler}>
                                    로그아웃
                                </NavButton>
                            </li>
                        </NavList>
                        <NavList className="narrow">
                            <li>
                                <IconLink
                                    to="/write"
                                    icon={faKeyboard}
                                    message="코드 작성"
                                />
                            </li>
                            <li>
                                {/* <IconLink
                                    to="/"
                                /> */}
                                <IconButton
                                    onClickFunction={() =>
                                        alert("준비 중입니다.")
                                    }
                                    icon={faUserPen}
                                    message="프로필 수정"
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
                                <NavLink to="/signin" replace>
                                    로그인
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup">회원 가입</NavLink>
                            </li>
                        </NavList>
                        <NavList className="narrow">
                            <li>
                                <IconLink
                                    to="/signin"
                                    icon={faRightToBracket}
                                    message="로그인"
                                    replace={true}
                                />
                            </li>
                            <li>
                                <IconLink
                                    to="/signup"
                                    icon={faUserPlus}
                                    message="회원 가입"
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
