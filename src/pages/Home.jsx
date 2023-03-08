import HotelElement from "element/HotelElement";
import SkeletonHotelElement from "element/SkeletonHotelElement";
import React, { useState } from "react";
import { useInfiniteQuery, useQueries } from "react-query";
import styled from "styled-components";
import { getHouses, getInfinityHouse, getSearchHouses } from "utils/api/api";
import { HotelGridLayoutStyle, PageMargin } from "utils/style/mixins";
import { useRecoilState } from "recoil";
import {
  isSearchState,
  searchValueState,
  userNamePersistState,
} from "store/atoms";
import Button from "element/Button";
import { useInView } from "react-intersection-observer";

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
  const [houses, setHouses] = useState(null);
  const localUserName = useRecoilState(userNamePersistState);
  const isSearch = useRecoilState(isSearchState);
  const searchValue = useRecoilState(searchValueState);

  const homeQueries = useQueries(
    isSearch[0] === true
      ? [
          {
            queryKey: "searchHouses",
            queryFn: () =>
              getSearchHouses(
                localUserName[0].id !== undefined
                  ? { id: localUserName[0].id, filter: searchValue[0] }
                  : { filter: searchValue[0] }
              ),
            onSuccess: ({ data }) => {
              setHouses(data.data);
            },
          },
        ]
      : [
          {
            queryKey: "houses",
            queryFn: () =>
              getHouses(
                localUserName[0].id !== undefined && { id: localUserName[0].id }
              ),
            onSuccess: ({ data }) => {
              setHouses(data.data);
            },
          },
        ]
  );

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "infinityTest",
      ({ pageParam = 0 }) => {
        if (localUserName[0].id !== undefined) {
          return getInfinityHouse(pageParam, localUserName[0].id);
        } else {
          return getInfinityHouse(pageParam);
        }
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage?.data?.data?.length === 0 ? undefined : nextPage;
        },
        onSuccess: ({ pages }) => {
          setHouses(pages);
        },
      }
    );

  return (
    <HomeWrapper>
      <HotelGridWrapper>
        {isLoading === true && isFetchingNextPage === false && (
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
          </>
        )}
        {isLoading === false &&
          houses !== null &&
          houses.map((data) =>
            data?.data?.data?.map((house) => (
              <HotelElement house={house} key={house.id} />
            ))
          )}
        {isFetchingNextPage === true && hasNextPage === true && (
          <>
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
            <SkeletonHotelElement />
          </>
        )}
        <Button
          onClick={() => {
            fetchNextPage();
          }}
        >
          버튼
        </Button>
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
