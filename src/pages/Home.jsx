import HotelElement from "element/HotelElement";
import SkeletonHotelElement from "element/SkeletonHotelElement";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { getInfinityHouse, getInfinityHouseFilterSearch } from "utils/api/api";
import { HotelGridLayoutStyle, PageMargin } from "utils/style/mixins";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isSearchState,
  searchValueState,
  userNamePersistState,
} from "store/atoms";
import Button from "element/Button";

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
  const [isSearch, setIsSearch] = useRecoilState(isSearchState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const [isEnd, setIsEnd] = useState(false);
  const [throttle, setThrottle] = useState(false);

  const handleScroll = () => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 30) {
          setIsEnd(true);
          await fetchNextPage();
          setIsEnd(false);
        }
      }, 300);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setIsSearch(false);
      setSearchValue(null);
    };
  }, []);

  const { isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery(
      "infinityTest",
      ({ pageParam = 0 }) => {
        if (isSearch === false) {
          if (localUserName[0].id !== undefined) {
            return getInfinityHouse(pageParam, localUserName[0].id);
          } else {
            return getInfinityHouse(pageParam);
          }
        } else {
          if (localUserName[0].id !== undefined) {
            return getInfinityHouseFilterSearch(
              pageParam,
              searchValue,
              localUserName[0].id
            );
          } else {
            return getInfinityHouseFilterSearch(pageParam, searchValue);
          }
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

  refetch();

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
      </HotelGridWrapper>
    </HomeWrapper>
  );
};

export default Home;
