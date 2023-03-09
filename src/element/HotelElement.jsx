import React, { useState } from 'react';
import styled from 'styled-components';
import { HotelElementTextWrapperStyle, HotelElementWrapperStyle } from 'utils/style/mixins';
import hotel from '../assets/hotel.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userNamePersistState, isLoginModalState } from 'store/atoms';
import { useMutation, useQueryClient } from 'react-query';
import { postWish } from 'utils/api/api';
import { getCookie } from 'utils/cookie/cookie';
import LikeState from 'components/LikeState';
import Button from './Button';
import { postHouseDelete } from '../utils/api/api';

const HotelElementWrapper = styled.li`
    ${HotelElementWrapperStyle}
    position: relative;
`;

const HotelElementTextWrapper = styled.ul`
    ${HotelElementTextWrapperStyle}
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 0.75rem;
    gap: 1rem;
    justify-content: flex-end;
    button {
        width: 40%;
        align-self: flex-end;
    }
`;

const HotelElement = ({ house, isWish, made }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const localUserName = useRecoilState(userNamePersistState);
    const setIsLoginModal = useSetRecoilState(isLoginModalState);
    const [islikeState, setIsLikeState] = useState(house.isLike);
    const token = getCookie('token');

    // 로그인 x -> 하트 눌렀을 때
    const moveLogin = (e) => {
        e.stopPropagation();
        alert('로그인 후 가능합니다. 로그인 해주세요.');
        setIsLoginModal(true);
    };
    // 로그인 o -> 하트 눌렀을 때
    const likeClick = (e, id) => {
        e.stopPropagation();
        setIsLikeState(!islikeState);
        likeMutation.mutate(id);
    };

    const queryClient = useQueryClient();
    const likeMutation = useMutation((id) => postWish(id, getCookie('token')), {
        onSuccess: (res) => {
            alert(res.data.message);
            if (isWish) {
                queryClient.invalidateQueries('wish');
            } else {
                queryClient.invalidateQueries('infinityTest');
            }
        },
    });

    const removeMutation = useMutation((id) => postHouseDelete(id, token), {
        onSuccess: () => {
            queryClient.invalidateQueries('registration');
            alert('삭제가 완료되었습니다!');
        },
    });

    const onRemove = async (e, id) => {
        e.stopPropagation();
        const res = await removeMutation.mutateAsync(id);
    };

    //별점은 나중에
    return (
        <HotelElementWrapper onClick={() => navigate(`/${house.id}`)}>
            <img src={house?.thumbnailUrl !== null ? house?.thumbnailUrl : hotel} alt="view" />
            {localUserName[0] === '' ? <LikeState size={28} position={true} isTrue={false} onClick={moveLogin} /> : <LikeState size={28} position={true} isTrue={house?.isLike} onClick={(e) => likeClick(e, house.id)} />}
            <HotelElementTextWrapper>
                <header className="hotel-header">
                    <h1>{house?.adminDistrict}, 한국</h1>
                </header>
                <p>{house?.detailAddress}</p>
                <span className="price">₩ {house?.pricePerDay.toLocaleString('en')} / 박</span>
                {pathname === '/profile' && made === true && (
                    <ButtonWrapper>
                        <Button type={true} onClick={(e) => onRemove(e, house.id)}>
                            삭제
                        </Button>
                    </ButtonWrapper>
                )}
            </HotelElementTextWrapper>
        </HotelElementWrapper>
    );
};

export default HotelElement;
