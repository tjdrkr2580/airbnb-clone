import { motion } from "framer-motion";
import { modalVariants } from "utils/animation/variants";
import React, { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isTotalTagsModal, totalTagsHouseId } from "store/atoms";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import {
  boxBorderRadius,
  flexColumnCenter,
  flexRowCenter,
} from "utils/style/mixins";
import { useQuery } from "react-query";
import { getTotalTags } from "utils/api/api";

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
  height: 81rem;
  ${boxBorderRadius}
  ${flexColumnCenter}
    background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  padding-top: 3rem;
  gap: 1.2rem;
  h2 {
    font-size: 2.2rem;
    margin-bottom: 0.8rem;
    width: fit-content;
    align-self: flex-start;
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

const TagsContainer = styled.ul`
  margin-top: 7rem;
  margin-bottom: 3rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  div {
    ${flexRowCenter}
    justify-content: left;

    li {
      font-size: 1.3rem;
      margin-left: 10px;
    }
  }
`;
const LineComponent = styled.section`
  padding: 2rem 0;
  border-bottom: 0.25rem solid ${(props) => props.theme.borderColor};
`;

const TagBox = styled.section`
  margin-bottom: 5rem;
`;

function TotalTags() {
  const setIsTotalTagsModal = useSetRecoilState(isTotalTagsModal);
  const houseId = useRecoilValue(totalTagsHouseId);
  const modalRef = useRef(null);
  const [totalTags, setTotalTags] = useState([]);

  const { isLoading } = useQuery("TotalTags", () => getTotalTags(houseId), {
    onSuccess: ({ data }) => {
      setTotalTags(data.data);
    },
  });
  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setIsTotalTagsModal(false);
        }
      }}
    >
      <ModalLayout variants={modalVariants} initial="start" animate="animate">
        <TitleBox>
          <IoMdClose size={20} onClick={() => setIsTotalTagsModal(false)} />
          <h1 className="title">숙소 편의시설</h1>
          <section />
        </TitleBox>
        {isLoading === true ? (
          <div>로딩중 입니다.</div>
        ) : (
          <TagsContainer>
            {totalTags?.map((item, i) => (
              <TagBox key={i}>
                <h1>{item.name}</h1>
                {item.tags.map((detail) => (
                  <LineComponent key={detail.id}>
                    <div>
                      <img src={detail.imageURL} />
                      <li>{detail.name}</li>
                    </div>
                  </LineComponent>
                ))}
              </TagBox>
            ))}
          </TagsContainer>
        )}
      </ModalLayout>
    </ModalWrapper>
  );
}

export default TotalTags;
