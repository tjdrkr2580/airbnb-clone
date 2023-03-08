import HotelElement from 'element/HotelElement';
import SkeletonHotelElement from 'element/SkeletonHotelElement';
import React, { useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import styled from 'styled-components';
import { getHouses, getSearchHouses } from 'utils/api/api';
import { HotelGridLayoutStyle, PageMargin } from 'utils/style/mixins';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { isSearchState, searchValueState, userNamePersistState } from 'store/atoms';

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
    const isSearch = useRecoilState(isSearchState);
    const searchValue = useRecoilState(searchValueState);
    const resetIsSearch = useResetRecoilState(isSearchState);
    const resetSearchValue = useResetRecoilState(searchValueState);

    console.log(searchValue);
    const homeQueries = useQueries(
        isSearch[0] === true
            ? [
                  {
                      queryKey: 'searchHouses',
                      queryFn: () => getSearchHouses(localUserName[0].id !== undefined ? { id: localUserName[0].id, filter: searchValue[0] } : { filter: searchValue[0] }),
                      onSuccess: ({ data }) => {
                          setHouses(data.data);
                      },
                  },
              ]
            : [
                  {
                      queryKey: 'houses',
                      queryFn: () => getHouses(localUserName[0].id !== undefined && { id: localUserName[0].id }),
                      onSuccess: ({ data }) => {
                          setHouses(data.data);
                      },
                  },
              ]
    );

    return (
        <HomeWrapper>
            <HotelGridWrapper>
                {homeQueries[0].isLoading === true ? (
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
