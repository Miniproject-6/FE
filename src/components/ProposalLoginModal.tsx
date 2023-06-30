import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { SERVER_URL } from '@src/constants/constants';
import { ReactComponent as Icon } from '@src/assets/portfolioDetail/port-delete-icon.svg';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@src/states';

interface LoginModalProps {
  email: string;
  password: string;
  onCloseModal: () => void;
  onSiginupClose: () => void;
}

function ProposalLoginModal(props: LoginModalProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassWord] = useState<string>('');
  const setIsLogin = useSetRecoilState<boolean>(loginState);

  useEffect(() => {
    setEmail(props.email);
    setPassWord(props.password);
  }, [props.email, props.password]);

  const handleLogin = async () => {
    try {
      const response = await axios.post<string>(`${SERVER_URL}/api/users/login`, {
        email,
        password,
      });

      const accessToken = response.headers['accesstoken'];
      const refreshToken = response.headers['refreshtoken'];

      localStorage.setItem('accesstoken', accessToken);
      localStorage.setItem('refreshtoken', refreshToken);

      props.onCloseModal();
      props.onSiginupClose();
      setIsLogin(true);
      alert('로그인');
    } catch (error) {
      alert('로그인 실패');
    }
  };

  return (
    <StModalContainer>
      <StModalContent>
        <StIcon />
        <StTitle>로그인 바로하기</StTitle>
        <StSubtitle>회원가입 하신 아이디로 바로 로그인 하시겠습니까?</StSubtitle>
        <StButtonContainer>
          <StButton color="gray" onClick={props.onCloseModal}>
            취소
          </StButton>
          <StButton onClick={handleLogin}>로그인</StButton>
        </StButtonContainer>
      </StModalContent>
    </StModalContainer>
  );
}

export default ProposalLoginModal;

const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 450px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;

  @media (max-width: 1023px) {
    width: 280px;
    height: 380px;
  }

  @media (max-width: 767px) {
    width: 240px;
    height: 350px;
  }

  @media (max-width: 479px) {
    width: 220px;
    height: 300px;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 20px;
`;

const StButton = styled.button`
  background-color: ${({ color }) => color || '#6bf65f'};
  color: black;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 20px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  font-weight: bold;

  &:not([notallowed='true']):hover {
    transition: 0.5s;
    background-color: ${({ theme, color }) => (color ? color : theme.color.lightGreen)};
    color: white;
  }
  @media (max-width: 1023px) {
    margin-top: 10px;
    font-size: 10px;
    width: 70px;
    height: 30px;
  }

  @media (max-width: 767px) {
    margin-top: 10px;
    font-size: 10px;
    width: 70px;
    height: 30px;
  }

  @media (max-width: 479px) {
    margin-top: 10px;
    font-size: 10px;
    width: 70px;
    height: 30px;
  }
`;

const StIcon = styled(Icon)`
  margin-top: 40px;
  margin-bottom: 25px;
  margin-left: 40px;

  @media (max-width: 479px) {
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 30px;
  }
`;

const StTitle = styled.h2`
  margin-bottom: 10px;

  @media (max-width: 479px) {
    margin-top: 10px;
    font-size: 13px;
  }
`;

const StSubtitle = styled.p`
  margin-top: 15px;
  font-weight: bold;

  @media (max-width: 479px) {
    font-size: 10px;
  }
`;
