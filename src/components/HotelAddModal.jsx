import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { modalVariants } from 'utils/animation/variants';
import { boxBorderRadius, flexColumnCenter, flexRowCenter } from 'utils/style/mixins';
import { IoMdClose, IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import { isHotelAddState } from 'store/atoms';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import Button from 'element/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { postHouses } from 'utils/api/api';
import { getCookie } from 'utils/cookie/cookie';

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
    padding-top: 2rem;
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

const AreaCheckContainer = styled.div`
    ${flexColumnCenter}
    width: 95%;
`;

const AreaCheckBoxContainer = styled(Slider)`
    width: 95%;
    position: relative;
    .slick-prev::before,
    .slick-next::before {
        color: #747474;
    }
`;

const AreaCheckBox = styled.div`
    line-height: 4rem;
    text-align: center;
    cursor: pointer;
    div {
        margin: 0.5rem;
        border: 0.075rem solid ${(props) => props.theme.selectColor2};
        ${boxBorderRadius}
        font-size: 1.2rem;
    }
`;

const AreaBox = styled.div`
    background-color: ${(props) => props.isAreaClick && props.theme.selectColor2};
    color: ${(props) => props.isAreaClick && 'white'}; ;
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

const HouseImgContainer = styled.div`
    ${flexRowCenter};
    width: 100%;
    justify-content: space-between;
    div {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;
const ThumbnailInput = styled.input`
    width: 70%;
    padding-left: 1rem;
    font-size: 1.2rem;
`;

const HouseFacilityBoxContainer = styled(AreaCheckBoxContainer)``;
const FacilityCheckBox = styled(AreaCheckBox)`
    div {
        line-height: 3rem;
    }
`;

const FacilityBox = styled.div`
    background-color: ${(props) => props.isTagClick && props.theme.selectColor2};
    color: ${(props) => props.isTagClick && 'white'}; ;
`;

const HoustIntroTextarea = styled.textarea`
    width: 100%;
    height: 8rem;
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
    const [area, setArea] = useState('');
    const [tag, setTag] = useState([]);
    const [currentTag, setCurrentTag] = useState([]);
    const { register, reset, formState: errors, handleSubmit } = useForm();

    // 추후 관리자페이지에서 원하는 태그 등록
    const houseFacility = ['편의1', '편의2', '편의3', '편의4', '편의5', '편의6', '편의7', '편의8', '편의9', '편의10', '편의11', '편의12'];
    const houseArea = ['서울특별시', '부산광역시', '대구광역시', '광주광역시', '인천광역시', '대전광역시', '울산광역시', '제주특별시', '경기도', '강원도', '충청남도', '충정북도', '전라남도', '전라북도', '경상남도', '경상북도'];

    const areaSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    const facilitySettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 2,
    };

    // 이미지
    const result = new FormData();
    const [thumbnail, setThumbnail] = useState('');
    const [otherImg, setOtherImg] = useState([]);

    const uploadImg = (e) => {
        setThumbnail(e.target.files[0]);

        for (let i = 1; i < e.target.files.length; i++) {
            setOtherImg(e.target.files[i]);
        }
    };

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

    const submitMutation = useMutation((data) => postHouses(data, getCookie('token')), {
        onSuccess: () => {
            console.log('등록 완료!');
            setIsHotelAdd(false);
        },
    });

    const onSubmit = async (data) => {
        result.append('adminDistrict', String(area));
        result.append('detailAddress ', String(data.address));
        result.append('content ', String(data.content));
        result.append('maxPeople ', parseInt(count));
        result.append('pricePerDay ', parseInt(data.price));
        result.append('tagIds ', tag);
        result.append('thumbnailImage ', thumbnail);
        result.append('houseImages ', otherImg);

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
                    <AreaCheckContainer>
                        <AreaCheckBoxContainer {...areaSettings}>
                            {houseArea.map((item, i) => (
                                <AreaCheckBox key={i} onClick={() => setArea(item)}>
                                    <AreaBox isAreaClick={area === item}>{item}</AreaBox>
                                </AreaCheckBox>
                            ))}
                        </AreaCheckBoxContainer>
                    </AreaCheckContainer>

                    <span>상세 주소</span>
                    <InputContainer>
                        <input type="text" {...register('address', { required: true })} />
                    </InputContainer>

                    <span>1박 당 가격</span>
                    <InputContainer>
                        <input type="text" {...register('price', { required: true })} />
                    </InputContainer>

                    <span>최대 인원 선택</span>
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

                    <span>이미지 업로드</span>
                    <HouseImgContainer>
                        <ThumbnailInput type="file" accept="image/*" multiple onChange={uploadImg}></ThumbnailInput>
                    </HouseImgContainer>

                    <span>숙소 편의시설</span>
                    <AreaCheckContainer>
                        <HouseFacilityBoxContainer {...facilitySettings}>
                            {houseFacility.map((item, i) => (
                                <FacilityCheckBox key={i} onClick={() => faciltyClick(i)}>
                                    <FacilityBox isTagClick={false}>{item}</FacilityBox>
                                </FacilityCheckBox>
                            ))}
                        </HouseFacilityBoxContainer>
                    </AreaCheckContainer>

                    <span>숙소 설명</span>
                    <HoustIntroTextarea {...register('content', { required: true })}></HoustIntroTextarea>
                    <Button type={true} isBackground={true}>
                        숙소 등록
                    </Button>
                </HotelAddForm>
            </ModalLayout>
        </ModalWrapper>
    );
};

export default HotelAddModal;
