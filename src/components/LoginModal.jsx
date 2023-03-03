import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isLoginModal } from "store/atoms";
import styled from "styled-components";
import { modalVariants } from "utils/animation/variants";
import {
  boxBorderRadius,
  flexColumnCenter,
  flexRowCenter,
} from "utils/style/mixins";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";

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

const SignForm = styled.form`
  width: 100%;
  ${flexColumnCenter}
  input {
    width: 100%;
    height: 6rem;
    font-size: 1.4rem;
    padding: 0 1.2rem;
    border: 0.075rem solid ${(props) => props.theme.selectColor2};
    border-radius: 0.6rem 0.6rem 0 0;
    &:focus {
      outline: none;
    }
  }
`;

const LoginModal = () => {
  const setIsLoginModal = useSetRecoilState(isLoginModal);
  const [isSignIn, setIsSignIn] = useState(false);
  const { register, reset, formState: errors, handleSubmit } = useForm();
  const modalRef = useRef(null);
  const onSubmit = (data) => {};
  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setIsLoginModal(false);
        }
      }}
    >
      <ModalLayout
        variants={modalVariants}
        initial="start"
        animate="animate"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TitleBox>
          <IoMdClose size={20} />
          <h1 className="title">로그인 또는 회원 가입</h1>
          <section />
        </TitleBox>
        <h2>에어비앤비에 오신 것을 환영합니다.</h2>
        <SignForm>
          <input type="text" {...register("email")} placeholder="이메일" />
          <input
            type="password"
            {...register("password")}
            placeholder="비밀번호"
          />
          <input type="password" placeholder="비밀번호 확인" />
        </SignForm>
      </ModalLayout>
    </ModalWrapper>
  );
};

export default LoginModal;
