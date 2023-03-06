import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { boxBorderRadius, UnderLine } from "utils/style/mixins";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import Button from "element/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getCookie } from "utils/cookie/cookie";
import { postDetailRequest } from "utils/api/api";
import { useNavigate } from "react-router-dom";

const SubmitComponent = styled.form`
  position: sticky;
  padding: 2rem;
  top: 30vh;
  width: 25%;
  min-width: 35rem;
  height: 40rem;
  ${boxBorderRadius}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  h1 {
    font-size: 2.2rem;
  }
  .people {
    ${boxBorderRadius}
    border: 0.15rem solid ${(props) => props.theme.borderColor};
    height: 3.5rem;
    padding: 0 0.8rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
  .price-info {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    align-self: center;
  }
`;

const DateWrapper = styled.section`
  display: flex;
  width: 100%;
  input {
    ${boxBorderRadius}
    border: 0.15rem solid ${(props) => props.theme.borderColor};
    height: 3.5rem;
    padding: 0 0.8rem;
    width: 15.5rem;
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

const PriceComponent = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  color: ${(props) => props.theme.selectColor1};
  .price {
    font-size: 1.4rem;
  }
  .price-total {
    font-size: 1.5rem;
  }
`;

const TotalComponent = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .total {
    font-size: 1.8rem;
  }
  .total-price {
    font-size: 1.6rem;
  }
`;

const CustomDatePicker = styled(DatePicker)``;

const DetailSubmit = ({ houseDetail }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [price, setPrice] = useState(houseDetail?.pricePerDay);
  const submitMutation = useMutation(
    (data) => postDetailRequest(data, getCookie("token")),
    {
      onSuccess: () => {
        console.log("예약 완료!");
        navigate("/");
      },
    }
  );

  const onSubmit = async (data) => {
    const postData = {
      checkin: `${startDate.getFullYear()}-${String(
        startDate.getMonth()
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`,
      checkout: `${endDate.getFullYear()}-${String(
        startDate.getMonth()
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`,
      peopleCount: data.peopleCount,
      houseId: houseDetail.id,
    };
    const res = await submitMutation.mutateAsync(postData);
    console.log(res);
  };
  useEffect(() => {
    setValue("peopleCount", "1");
  }, []);

  return (
    <SubmitComponent onSubmit={handleSubmit(onSubmit)}>
      <h1>₩ {Number(houseDetail?.pricePerDay).toLocaleString("en")} / 박</h1>
      <DateWrapper>
        <CustomDatePicker
          minDate={new Date()}
          dateFormat="yyyy. MM. dd"
          selected={startDate}
          locale={ko}
          placeholderText="체크인"
          onChange={(date) => {
            setStartDate(date);
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
          }}
        />
      </DateWrapper>
      <input
        type="number"
        {...register("peopleCount")}
        className="people"
        placeholder="인원"
      />
      <Button type={true}>예약하기</Button>
      <p className="price-info">예약 확정 전에는 요금이 청구되지 않습니다.</p>
      <PriceComponent>
        <p className="price">
          ₩ {houseDetail?.pricePerDay?.toLocaleString("en")} x{" "}
          {endDate.getDate() - startDate.getDate()}박
        </p>
        <span className="price-total">
          {" "}
          ₩{" "}
          {(
            price * parseInt(endDate.getDate() - startDate.getDate())
          ).toLocaleString("en")}
        </span>
      </PriceComponent>
      <UnderLine />
      <TotalComponent>
        <span className="total">총 합계 :</span>
        <span className="total-price">
          ₩{" "}
          {(
            price * parseInt(endDate.getDate() - startDate.getDate())
          ).toLocaleString("en")}
        </span>
      </TotalComponent>
    </SubmitComponent>
  );
};

export default DetailSubmit;
