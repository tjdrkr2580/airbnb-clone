import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { isFilterState } from "store/atoms";
import styled from "styled-components";
import { modalVariants } from "utils/animation/variants";
import {
  boxBorderRadius,
  flexColumnCenter,
  flexRowCenter,
} from "utils/style/mixins";

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

const FilterSearch = () => {
  const setFilterModal = useSetRecoilState(isFilterState);
  const modalRef = useRef(null);

  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setFilterModal(false);
        }
      }}
    >
      <ModalLayout
        variants={modalVariants}
        initial="start"
        animate="animate"
      ></ModalLayout>
    </ModalWrapper>
  );
};

export default FilterSearch;
