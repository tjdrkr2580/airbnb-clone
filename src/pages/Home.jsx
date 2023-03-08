import HotelElement from 'element/HotelElement';
import SkeletonHotelElement from 'element/SkeletonHotelElement';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getHouses } from 'utils/api/api';
import { HotelGridLayoutStyle, PageMargin } from 'utils/style/mixins';
import { useRecoilState } from 'recoil';
import { userNamePersistState } from 'store/atoms';

const HomeWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    ${PageMargin}
`;

const HotelGridWrapper = styled.ul`
    ${HotelGridLayoutStyle}
`;

const Home = () => {
    const [houses, setHouses] = useState([]);
    const localUserName = useRecoilState(userNamePersistState);

    const { isLoading } = useQuery('houses', () => getHouses(localUserName[0].id !== undefined && { id: localUserName[0].id }), {
        onSuccess: (response) => {
            setHouses(response.data.data);
        },
    });

    return (
        <HomeWrapper>
            <HotelGridWrapper>
                {isLoading === true ? (
                    <>
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                        <SkeletonHotelElement />
                    </>
                ) : (
                    houses.map((house) => <HotelElement key={house.id} house={house} />)
                )}
            </HotelGridWrapper>
        </HomeWrapper>
    );
};

export default Home;
