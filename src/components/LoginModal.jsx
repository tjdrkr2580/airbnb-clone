import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { globalUserInfoState, isLoginModalState, isUserState, userNamePersistState } from 'store/atoms';
import styled from 'styled-components';
import { modalVariants } from 'utils/animation/variants';
import { boxBorderRadius, flexColumnCenter, flexRowCenter } from 'utils/style/mixins';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import Button from 'element/Button';
import { UnderLine } from 'utils/style/mixins';
import { useMutation, useQuery } from 'react-query';
import { postSignin, postSignup } from 'utils/api/api';
import { getCookie, setCookie } from 'utils/cookie/cookie';
import { getNicknameCheck } from 'utils/api/api';
import axios from 'axios';

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
    padding-top: 50px;
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

const SignForm = styled.section`
    width: 100%;
    ${flexColumnCenter}
    input {
        width: 100%;
        height: 6rem;
        font-size: 1.55rem;
        letter-spacing: 0.1rem;
        padding: 0 1.2rem;
        border: 0.15rem solid ${(props) => props.theme.borderColor};
        &:focus {
            outline: none;
        }
    }
    span {
        line-height: 3rem;
        font-size: 1.55rem;
        color: ${(props) => props.theme.mainColor};
        margin-top: 1rem;
    }
`;

const CheckContainer = styled.div`
    ${flexRowCenter}
    width: 100%;
    button {
        width: 60px;
        height: 6rem;
        padding: 10px;
    }
`;

const LoginModal = () => {
    const setIsLoginModal = useSetRecoilState(isLoginModalState);
    const [isSignUp, setIsSignUp] = useState(true);
    const setGlobalUserInfo = useSetRecoilState(globalUserInfoState);
    const setIsUser = useSetRecoilState(isUserState);
    const setLocalUserName = useSetRecoilState(userNamePersistState);
    const { register, reset, formState: errors, handleSubmit, watch } = useForm();
    const modalRef = useRef(null);
    const onLoginToggle = () => {
        setIsSignUp(!isSignUp);
        reset();
    };

    const [nickState, setNickState] = useState(false);
    const [emailState, setEmailState] = useState(false);

    const nicknameValue = watch('nickname');
    const emailValue = watch('email');
    const passwordValue = watch('password');
    const passwordConfirmValue = watch('passwordConfirm');

    const [errorMessage, setErrorMessage] = useState('');

    const nicknameCheck = async () => {
        try {
            const response = await axios.get(`api/users/nickName/duplicate?nickName=${nicknameValue}`);
            alert(response.data.message);
            setNickState(true);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const emailCheck = async () => {
        try {
            const response = await axios.get(`api/users/email/duplicate?email=${emailValue}`);
            alert(response.data.message);
            setEmailState(true);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const signUpMutate = useMutation((data) => postSignup(data), {
        onSuccess: (res) => {
            onLoginToggle();
        },
    }); //회원가입 mutation
    const signInMutate = useMutation((data) => postSignin(data), {
        onSuccess: (response) => {
            setCookie('token', response.headers.authorization);
            setIsUser(true);
            setGlobalUserInfo({
                email: response.data.data.email,
                id: response.data.data.id,
                nickname: response.data.data.nickname,
            });
            setIsLoginModal(false);
            setLocalUserName({
                id: response.data.data.id,
                nickname: response.data.data.nickname,
                token: getCookie('token'),
            });
        },
        onError: (error) => {
            alert(error.response.data.message);
        },
    }); //로그인 mutation

    const onSubmit = async (data) => {
        if (isSignUp === false) {
            //로그인 폼
            if (nickState === false) {
                setErrorMessage('닉네임 중복체크 해주세요');
            } else if (emailState === false) {
                setErrorMessage('이메일 중복체크 해주세요');
            } else if (passwordValue !== passwordConfirmValue) {
                setErrorMessage('비밀번호가 같지 않습니다. 다시 작성해주세요.');
            } else {
                const request = {
                    nickname: data.nickname,
                    email: data.email,
                    password: data.password,
                    isAdmin: false,
                };
                return await signUpMutate.mutateAsync(request);
            }
        } else {
            const request = {
                email: data.email,
                password: data.password,
            };
            return await signInMutate.mutateAsync(request);
        }
    };
    return (
        <ModalWrapper
            ref={modalRef}
            onClick={(e) => {
                if (modalRef.current === e.target) {
                    setIsLoginModal(false);
                }
            }}
        >
            <ModalLayout variants={modalVariants} initial="start" animate="animate" onSubmit={handleSubmit(onSubmit)}>
                <TitleBox>
                    <IoMdClose size={20} onClick={() => setIsLoginModal(false)} />
                    <h1 className="title">로그인 또는 회원 가입</h1>
                    <section />
                </TitleBox>
                {isSignUp === false && (
                    <>
                        <h2>에어비앤비에 오신 것을 환영합니다.</h2>
                        <SignForm>
                            <CheckContainer>
                                <input
                                    type="text"
                                    {...register('nickname', {
                                        required: true,
                                    })}
                                    placeholder="닉네임"
                                />
                                <Button onClick={nicknameCheck}>중복</Button>
                            </CheckContainer>
                            <CheckContainer>
                                <input
                                    type="text"
                                    {...register('email', {
                                        required: true,
                                    })}
                                    placeholder="이메일"
                                />
                                <Button onClick={emailCheck}>중복</Button>
                            </CheckContainer>

                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                })}
                                placeholder="비밀번호"
                            />
                            <input
                                type="password"
                                {...register('passwordConfirm', {
                                    required: true,
                                })}
                                placeholder="비밀번호 확인"
                            />
                            <span>{errorMessage}</span>
                        </SignForm>
                        <Button type={true} onClick={handleSubmit(onSubmit)}>
                            회원가입
                        </Button>
                        <UnderLine />
                        <h1 className="title">혹시 사용하고 계신 계정이 존재한가요?</h1>
                        <Button type={false} onClick={onLoginToggle}>
                            로그인
                        </Button>
                    </>
                )}
                {isSignUp === true && (
                    <>
                        <h2>에어비앤비에 오신 것을 환영합니다.</h2>
                        <SignForm onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register('email')} placeholder="이메일" />
                            <input type="password" {...register('password')} placeholder="비밀번호" />
                        </SignForm>
                        <Button type={true}>로그인</Button>
                        <UnderLine />
                        <h1 className="title">혹시 계정이 존재하지 않나요?</h1>
                        <Button type={false} onClick={onLoginToggle}>
                            회원가입
                        </Button>
                    </>
                )}
            </ModalLayout>
        </ModalWrapper>
    );
};

export default LoginModal;
