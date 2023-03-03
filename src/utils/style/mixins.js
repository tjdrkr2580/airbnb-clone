import { css } from "styled-components";

export const flexRowCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexColumnCenter = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const boxBorderRadius = css`
  border-radius: 0.6rem;
`;

export const boxShadow = css`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const HotelElementWrapperStyle = css`
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  min-width: 33rem;
  height: 41rem;
  img {
    object-fit: cover;
    object-position: center;
    ${boxBorderRadius}
    width: 100%;
    height: 70%;
  }
`;

export const HotelElementTextWrapperStyle = css`
  padding: 0.2rem;
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: Pretendard;
  .hotel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .star {
      display: flex;
      gap: 0.2rem;
      align-items: center;
      span {
        font-size: 1.3rem;
        font-weight: 500;
      }
    }
  }
  h1 {
    font-size: 1.5rem;
    color: black;
  }
  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.selectColor1};
  }
  .price {
    font-weight: 500;
    font-size: 1.4rem;
    margin-top: 0.8rem;
  }
`;
