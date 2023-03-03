import { css } from 'styled-components';

export const flexRowCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const flexColumnCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const boxBorderRadius = css`
    border-radius: 0.6rem;
`;

export const boxShadow = css`
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const HotelGridLayoutStyle = css`
    padding: 3rem 0;
    width: auto;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    place-items: center;
    @media (min-width: 1180px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: 1rem;
        place-items: center;
        @media (min-width: 1180px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        @media (max-width: 1630px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media (max-width: 1180px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 905px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 550px) {
            grid-template-columns: 1fr;
        }
        transition: 0.2s filter;
    }
`;

export const HotelElementWrapperStyle = css`
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    max-width: 40rem;
    height: 42rem;
    cursor: pointer;
    ${boxBorderRadius}

    @media (min-width: 1630px) {
        width: 18.5vw;
    }

    @media (max-width: 1629px) {
        width: 22vw;
    }

    @media (max-width: 1180px) {
        width: 30vw;
    }

    @media (max-width: 905px) {
        width: 45vw;
        max-width: 45rem;
    }

    @media (max-width: 550px) {
        width: 88vw;
        max-width: 500px;
    }

    img {
        object-fit: cover;
        object-position: center;
        ${boxBorderRadius}
        width: 100%;
        height: 70%;
    }
    background-color: white;
    transition: 0.3s filter;
    &:hover {
        filter: brightness(85%);
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

export const HeaderFooterStyle = css`
    ${flexRowCenter};
    justify-content: space-between;
    width: 100%;
    height: 8rem;
    padding: 0px 40px;
`;
