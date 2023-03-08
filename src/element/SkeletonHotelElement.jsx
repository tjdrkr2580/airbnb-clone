import styled from "styled-components";
import {
  HotelElementTextWrapperStyle,
  HotelElementWrapperStyle,
} from "utils/style/mixins";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotelElementWrapper = styled.li`
  ${HotelElementWrapperStyle}
`;

const HotelElementTextWrapper = styled.ul`
  ${HotelElementTextWrapperStyle}
`;

const HotelElement = () => {
  return (
    <HotelElementWrapper>
      <Skeleton height={270} />
      <HotelElementTextWrapper>
        <header className="hotel-header">
          <Skeleton />
        </header>
        <p>
          <Skeleton height={15} />
          <Skeleton width={60} height={15} />
        </p>
        <Skeleton className="price" width={50} />
      </HotelElementTextWrapper>
    </HotelElementWrapper>
  );
};

export default HotelElement;
