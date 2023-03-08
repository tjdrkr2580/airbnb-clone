import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiSearch, BiUser } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlinePlusCircle } from 'react-icons/ai';
import { HeaderFooterStyle, flexRowCenter, flexColumnCenter, boxBorderRadius } from 'utils/style/mixins';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { globalUserInfoState, isFilterState, isHotelAddState, isLoginModalState, isUserState, userNamePersistState } from 'store/atoms';
import { removeCookie } from 'utils/cookie/cookie';

const Header = () => {
    const navigate = useNavigate();
    const setVisibleLoginModal = useSetRecoilState(isLoginModalState);
    const [showModal, setShowModal] = useState(false);
    const setHotelAdd = useSetRecoilState(isHotelAddState);
    const [isUser, setIsUser] = useRecoilState(isUserState);
    const reset = useResetRecoilState(globalUserInfoState);
    const resetUserName = useResetRecoilState(userNamePersistState);
    const setFilterModal = useSetRecoilState(isFilterState);
    const userName = useRecoilValue(userNamePersistState);

    const localUserName = useRecoilState(userNamePersistState);
    const setIsLoginModal = useSetRecoilState(isLoginModalState);

    const hotelAdd = () => {
        if (localUserName[0].id !== undefined) {
            setHotelAdd(true);
        } else {
            alert('로그인 후 가능합니다. 로그인 해주세요.');
            setIsLoginModal(true);
        }
    };

    const showMyInfo = () => {
        setShowModal(!showModal);
    };

    const onLogout = () => {
        removeCookie('token');
        setIsUser(false);
        reset();
        setShowModal(false);
        resetUserName();
    };

    return (
        <HeaderContainer>
            <LogoImg onClick={() => navigate('/')} src={process.env.PUBLIC_URL + 'logo.png'} />
            <TransparentBtn onClick={() => setFilterModal(true)}>
                <SearchContainer>
                    <SearchText>숙소 검색</SearchText>
                    <SearchIconBox>
                        <BiSearch size={18} color={'white'} />
                    </SearchIconBox>
                </SearchContainer>
            </TransparentBtn>
            <LoginUserButtonContainer>
                <TransparentBtn onClick={hotelAdd}>
                    <AiOutlinePlusCircle size={20} />
                </TransparentBtn>
                {userName !== '' ? (
                    <TransparentBtn>
                        <LoginButtonBox onClick={showMyInfo}>
                            <AiOutlineMenu size={16} />
                            <BiUser size={16} />
                        </LoginButtonBox>
                    </TransparentBtn>
                ) : (
                    <TransparentBtn
                        onClick={() => {
                            setVisibleLoginModal(true);
                        }}
                    >
                        <LoginButtonBox>로그인</LoginButtonBox>
                    </TransparentBtn>
                )}
                {showModal === true && (
                    <MyInfoModalContainer>
                        <UserEmail>
                            <span>{userName.nickname}</span>
                        </UserEmail>
                        <UserPage
                            onClick={() => {
                                navigate('/profile');
                                setShowModal(false);
                            }}
                        >
                            <span>마이페이지</span>
                        </UserPage>
                        <LogoutButton>
                            <TransparentBtn
                                onClick={() => {
                                    navigate('/');
                                    onLogout();
                                }}
                            >
                                로그아웃
                            </TransparentBtn>
                        </LogoutButton>
                    </MyInfoModalContainer>
                )}
            </LoginUserButtonContainer>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    z-index: 998;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    ${HeaderFooterStyle}
    border-bottom: 2px solid ${(props) => props.theme.borderColor};
`;

const LogoImg = styled.img`
    cursor: pointer;
    width: 10rem;
`;

const SearchContainer = styled.div`
    ${flexRowCenter};
    min-width: 20rem;
    height: 4.8rem;
    border-radius: 6.25rem;
    border: 1.5px solid ${(props) => props.theme.borderColor};
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    }
`;

const SearchText = styled.div`
    padding: 0px 16px;
    font-size: 1.6rem;
`;

const SearchIconBox = styled.div`
    ${flexRowCenter};
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.mainColor};
`;

const LoginUserButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    position: relative;
`;
const LoginButtonBox = styled(SearchContainer)`
    min-width: 7.7rem;
    height: 4.2rem;
    font-size: 1.35rem;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.05);
`;

const MyInfoModalContainer = styled.div`
    ${flexColumnCenter};
    justify-content: center;
    background-color: white;
    width: 15rem;
    height: 20rem;
    ${boxBorderRadius}
    position: absolute;
    top: 50px;
    right: 0px;
    z-index: 10;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    div {
        display: flex;
        align-items: center;
        padding: 0px 5px;
        border-bottom: 1px solid ${(props) => props.theme.borderColor};
        span,
        button {
            font-size: 1.3rem;
        }
    }
`;

const UserEmail = styled.div`
    height: 33%;
`;
const UserPage = styled.div`
    height: 33%;
    &:hover {
        background-color: ${(props) => props.theme.borderColor};
    }
`;
const LogoutButton = styled.div`
    height: 33%;
    &:hover {
        background-color: ${(props) => props.theme.borderColor};
    }
`;

const TransparentBtn = styled.button`
    background-color: transparent;
`;
