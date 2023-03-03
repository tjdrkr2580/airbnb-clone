import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiSearchAlt, BiUser } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <LogoImg src={process.env.PUBLIC_URL + 'logo.png'} />
            <button style={{ backgroundColor: 'white' }}>
                <SearchContainer>
                    <SearchText>숙소 검색</SearchText>
                    <SearchIconBox>
                        <BiSearchAlt size={16} />
                    </SearchIconBox>
                </SearchContainer>
            </button>
            {/* <button
                style={{ backgroundColor: 'white' }}
                onClick={() => {
                    navigate('/login');
                }}
            >
                <LoginButtonBox>로그인</LoginButtonBox>
            </button> */}
            {/* 로그인 했을때 마이페이지 버튼 */}
            <button
                style={{ backgroundColor: 'white' }}
                onClick={() => {
                    navigate('/login');
                }}
            >
                <LoginButtonBox>
                    <AiOutlineMenu size={16} />
                    <BiUser size={16} />
                    <img></img>
                </LoginButtonBox>
            </button>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0px 40px;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.2);
`;

const LogoImg = styled.img`
    width: 110px;
`;

const SearchContainer = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    height: 48px;
    border: 1.5px solid ${(props) => props.theme.borderColor};
    border-radius: 100px;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    }
`;

const SearchText = styled.div`
    padding: 0px 16px;
    //font-size: 1rem;
    font-size: 16px;
`;

const SearchIconBox = styled.div`
    background-color: ${(props) => props.theme.mainColor};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;
const LoginButtonBox = styled(SearchContainer)`
    min-width: 77px;
    height: 42px;
    font-size: 12px;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.05);
`;
