import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { isFilterState } from 'store/atoms';
import styled from 'styled-components';
import { modalVariants } from 'utils/animation/variants';
import { boxBorderRadius, flexColumnCenter, flexRowCenter } from 'utils/style/mixins';
import { IoMdClose, IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useState } from 'react';
import Button from 'element/Button';

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

const ModalLayout = styled(motion.form)`
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
        line-height: 3rem;
        font-size: 1.5rem;
        margin-top: 1rem;
    }
`;

const PeopleCountContainer = styled.div`
    ${flexRowCenter};
    width: 100%;
    justify-content: space-between;
    padding: 0 10rem;
    span {
        margin-top: 0;
        line-height: 3rem;
    }
    div {
        ${flexRowCenter};
        label {
            ${flexRowCenter};
            opacity: 0.3;
        }
    }
`;

const CountText = styled.span`
    padding: 0 3rem;
`;

const FilterSearch = () => {
    const setFilterModal = useSetRecoilState(isFilterState);
    const modalRef = useRef(null);
    const [count, setCount] = useState(0);

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

                <SearchForm>
                    <span>가격 범위</span>
                    <div>
                        <input></input>
                        <input></input>
                    </div>
                    <span>지역 선택</span>
                    <div></div>
                    <span>날짜 선택</span>
                    <div>
                        <input></input>
                        <input></input>
                    </div>
                    <span>인원 선택</span>
                    <PeopleCountContainer>
                        <span>인원수</span>
                        <div>
                            <label onClick={() => setCount(count - 1)}>
                                <IoIosArrowDropleftCircle size={20} />
                            </label>
                            <CountText>{count}</CountText>
                            <label onClick={() => setCount(count + 1)}>
                                <IoIosArrowDroprightCircle size={20} />
                            </label>
                        </div>
                    </PeopleCountContainer>
                    <Button type={true} isBackground={true}>
                        검색
                    </Button>
                </SearchForm>
            </ModalLayout>
        </ModalWrapper>
    );
};

export default FilterSearch;
