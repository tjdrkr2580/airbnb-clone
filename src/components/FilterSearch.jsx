import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { changeState, isFilterState } from "store/atoms";
import styled from "styled-components";
import { modalVariants } from "utils/animation/variants";
import {
  boxBorderRadius,
  flexColumnCenter,
  flexRowCenter,
} from "utils/style/mixins";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Button from "element/Button";
import SelectArea from "./SelectArea";
import CountPeople from "./CountPeople";
import { useForm } from "react-hook-form";
import { isSearchState, searchValueState } from "store/atoms";
import { DateWrapper, CustomDatePicker } from "./DetailSubmit";
import { ko } from "date-fns/esm/locale";

const ModalWrapper = styled.div`
  z-index: 999;
  position: fixed;
  ${flexRowCenter};
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 10, 10, 0.35);
  h1 {
    font-size: 1.6rem;
  }
  padding: 0 3rem;
`;

const ModalLayout = styled(motion.section)`
  position: relative;
  width: 56rem;
  height: 66rem;
  ${boxBorderRadius}
  ${flexColumnCenter}
    background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  gap: 1.2rem;
  h2 {
    font-size: 2.2rem;
    margin-bottom: 0.8rem;
    width: fit-content;
    align-self: flex-start;
  }
  .title {
    margin: 1.5rem;
  }
`;

const TitleBox = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  height: 6.4rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;

  h1 {
    font-size: 1.6rem;
    padding-right: 1rem;
  }
`;

const SearchForm = styled.form`
  width: 100%;
  ${flexColumnCenter}
  span {
    width: 100%;
    text-align: left;
    line-height: 4rem;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
`;

const PriceContainer = styled.div`
  ${flexRowCenter}
  width: 100%;
  input {
    padding: 0 1rem;
    width: 150rem;
    height: 4rem;
    border: 0.075rem solid ${(props) => props.theme.selectColor2};
    ${boxBorderRadius}
    font-size: 1.4rem;
  }
  span {
    text-align: center;
    font-size: 2rem;
  }
`;

const FilterSearch = () => {
  const setFilterModal = useSetRecoilState(isFilterState);
  const modalRef = useRef(null);
  const [count, setCount] = useState(0);
  const [area, setArea] = useState("");
  const { register, reset, formState: errors, handleSubmit } = useForm();
  const setIsSearch = useSetRecoilState(isSearchState);
  const setSearchValue = useSetRecoilState(searchValueState);
  const isSearch = useRecoilState(isSearchState);

  const date = new Date();
  let oneDay = 24 * 60 * 60 * 1000;
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date(date.getTime() + oneDay));
  const [change, setChange] = useRecoilState(changeState);

  useEffect(() => {
    setIsSearch(false);
  }, [isSearch]);
  const onSubmit = (data) => {
    const value = {
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      peopleCount: count,
      adminDistrict: area,
      startDate: `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`,
      endDate: `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`,
    };
    setIsSearch(true);
    setSearchValue(value);
    setFilterModal(false);
  };

  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setFilterModal(false);
        }
      }}
    >
      <ModalLayout variants={modalVariants} initial="start" animate="animate">
        <TitleBox>
          <IoMdClose size={20} onClick={() => setFilterModal(false)} />
          <h1 className="title">검색</h1>
          <section />
        </TitleBox>

        <SearchForm onSubmit={handleSubmit(onSubmit)}>
          <span>가격 범위</span>
          <PriceContainer>
            <input type="text" {...register("minPrice", { required: true })} />
            <span>~</span>
            <input type="text" {...register("maxPrice", { required: true })} />
          </PriceContainer>
          <span>지역 선택</span>
          <SelectArea area={area} setArea={setArea} />
          <span>날짜 선택</span>
          <DateWrapper>
            <CustomDatePicker
              minDate={new Date()}
              dateFormat="yyyy. MM. dd"
              selected={startDate}
              locale={ko}
              placeholderText="체크인"
              onChange={(date) => {
                setStartDate(date);
                setChange(true);
              }}
            />
            <CustomDatePicker
              minDate={startDate}
              dateFormat="yyyy. MM. dd"
              selected={endDate}
              locale={ko}
              placeholderText="체크아웃"
              onChange={(date) => {
                setEndDate(date);
                setChange(true);
              }}
            />
          </DateWrapper>
          <div></div>
          <span>인원 선택</span>
          <CountPeople count={count} setCount={setCount} margin={3} />
          <Button type={true} isBackground={true}>
            검색
          </Button>
        </SearchForm>
      </ModalLayout>
    </ModalWrapper>
  );
};

export default FilterSearch;
