import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalVariants } from "utils/animation/variants";
import {
  boxBorderRadius,
  flexColumnCenter,
  flexRowCenter,
} from "utils/style/mixins";
import { IoMdClose } from "react-icons/io";
import { isHotelAddState } from "store/atoms";
import { useState } from "react";
import Button from "element/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { postHouses, getTags } from "utils/api/api";
import { getCookie } from "utils/cookie/cookie";
import SelectArea from "./SelectArea";
import {
  AreaCheckContainer,
  AreaCheckBoxContainer,
  AreaCheckBox,
} from "./SelectArea";
import CountPeople from "./CountPeople";

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

const HotelAddForm = styled.form`
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

const InputContainer = styled.div`
  width: 100%;
  input {
    width: 100%;
    height: 4rem;
    font-size: 1.55rem;
    letter-spacing: 0.1rem;
    padding: 0 1.2rem;
    border: 0.075rem solid ${(props) => props.theme.selectColor2};
    ${boxBorderRadius}
    &:focus {
      outline: none;
    }
  }
`;

const HouseImgContainer = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 4rem;
`;

const ThumbnailInput = styled.input`
  width: 100%;
  padding-left: 1rem;
  font-size: 1.2rem;
`;

const HouseFacilityContainer = styled(AreaCheckContainer)``;
const HouseFacilityBoxContainer = styled(AreaCheckBoxContainer)``;
const FacilityCheckBox = styled(AreaCheckBox)``;

const FacilityBox = styled.div`
  ${flexRowCenter}
  padding: 1rem;
  height: 3.5rem;
  p {
    font-size: 1.1rem;
    margin: 0;
    margin-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: $line-height;
  }
  background-color: ${(props) => props.isTagClick && props.theme.selectColor2};
  color: ${(props) => props.isTagClick && "white"}; ;
`;

const HoustIntroTextarea = styled.textarea`
  width: 100%;
  height: 7rem;
  resize: none;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  padding: 1.2rem;
  ${boxBorderRadius}
  &:focus {
    outline: none;
  }
  margin-bottom: 2rem;
`;

const HotelAddModal = () => {
  const setIsHotelAdd = useSetRecoilState(isHotelAddState);
  const modalRef = useRef(null);
  const [count, setCount] = useState(0);
  const [area, setArea] = useState("");
  const [tag, setTag] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { register, reset, formState: errors, handleSubmit } = useForm();

  const facilitySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
  };

  const { isLoading } = useQuery("tags", getTags, {
    onSuccess: (response) => {
      setTagList(response.data.data);
    },
  });

  // 이미지
  const result = new FormData();
  const [thumbnail, setThumbnail] = useState("");
  const [otherImg, setOtherImg] = useState([]);

  const uploadImg = (e) => {
    setThumbnail(e.target.files[0]);

    const others = Array.from(e.target.files).slice(1);
    setOtherImg([...others]);
  };
  //console.log('otherImg', otherImg);

  // 태그 클릭시
  const faciltyClick = (i) => {
    // db 보낼 태그
    setTag([...tag, i]);

    tag.forEach((item) => {
      if (item === i) {
        const newTag = tag.filter((item) => item !== i);
        setTag(newTag);
      }
    });
  };

  const submitMutation = useMutation(
    (data) => postHouses(data, getCookie("token")),
    {
      onSuccess: () => {
        console.log("등록 완료!");
        setIsHotelAdd(false);
      },
    }
  );

  const onSubmit = async (data) => {
    result.append("adminDistrict", String(area));
    result.append("detailAddress ", String(data.address));
    result.append("content ", String(data.content));
    result.append("maxPeople ", parseInt(count));
    result.append("pricePerDay ", parseInt(data.price));
    result.append("tagIds ", tag);
    result.append("thumbnailImage ", thumbnail);
    // eslint-disable-next-line array-callback-return
    otherImg.map((img) => {
      result.append("houseImages ", img);
    });

    await submitMutation.mutateAsync(result);
  };

  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setIsHotelAdd(false);
        }
      }}
    >
      <ModalLayout variants={modalVariants} initial="start" animate="animate">
        <TitleBox>
          <IoMdClose size={20} onClick={() => setIsHotelAdd(false)} />
          <h1 className="title">숙소 등록</h1>
          <section />
        </TitleBox>

        <HotelAddForm onSubmit={handleSubmit(onSubmit)}>
          <span>지역선택</span>
          <SelectArea area={area} setArea={setArea} />

          <span>상세 주소</span>
          <InputContainer>
            <input type="text" {...register("address", { required: true })} />
          </InputContainer>

          <span>1박 당 가격</span>
          <InputContainer>
            <input type="text" {...register("price", { required: true })} />
          </InputContainer>

          <span>최대 인원 선택</span>
          <CountPeople count={count} setCount={setCount} />

          <span>이미지 업로드</span>
          <HouseImgContainer>
            <ThumbnailInput
              type="file"
              accept="image/*"
              multiple
              onChange={uploadImg}
            ></ThumbnailInput>
          </HouseImgContainer>

          <span>숙소 편의시설</span>
          <HouseFacilityContainer>
            <HouseFacilityBoxContainer {...facilitySettings}>
              {isLoading === true ? (
                <div>로딩중</div>
              ) : (
                tagList.map((list) => (
                  <FacilityCheckBox
                    key={list.id}
                    onClick={() => faciltyClick(list.id)}
                  >
                    <FacilityBox isTagClick={false}>
                      <img src={list.imageURL} alt="list"></img>
                      <p>{list.name}</p>
                    </FacilityBox>
                  </FacilityCheckBox>
                ))
              )}
            </HouseFacilityBoxContainer>
          </HouseFacilityContainer>

          <span>숙소 설명</span>
          <HoustIntroTextarea
            {...register("content", { required: true })}
          ></HoustIntroTextarea>
          <Button type={true} isBackground={true}>
            숙소 등록
          </Button>
        </HotelAddForm>
      </ModalLayout>
    </ModalWrapper>
  );
};

export default HotelAddModal;
