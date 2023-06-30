import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/default-user-profile-icon.svg';
import { useEffect, useState } from 'react';
import { getUser } from '@src/apis/user';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import { useRecoilValue } from 'recoil';
import { loginState } from '@src/states';
import { myPageEditState } from '@src/states/myPageEditState';
import { DesktopAndTablet } from '@src/style/mediaQuery';

const UserProfile: React.FC<{
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsLoginModalOpen }) => {
  const isLogin = useRecoilValue<boolean>(loginState);
  const [isExistToken, setIsExistToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const myPageEdit = useRecoilValue(myPageEditState);

  const initialUserProfile = {
    nickname: '로그인해 주세요.',
    email: '',
    profileImage: null,
  };
  const [userData, setUserData] = useState(initialUserProfile);

  let userId: null | number = null;

  const onLoginModalOpen = () => {
    const isNotLogin = !isExistToken;
    isNotLogin && setIsLoginModalOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('accesstoken');

    if (token !== null) {
      userId = useDecodeJWT().userId;
      setIsExistToken(true);
    } else {
      setIsExistToken(false);
      setUserData(initialUserProfile);
    }

    const fetchUserData = async () => {
      if (userId !== null) {
        const serverUserData = await getUser({ id: userId });
        setUserData(serverUserData);
      }
    };
    fetchUserData();
    setIsLoading(false);
  }, [isLogin, myPageEdit]);

  return (
    <StProfileContainer>
      {isExistToken && userData.profileImage !== null ? (
        <StProfileImg src={userData.profileImage} alt="user profile image" />
      ) : (
        !isLoading && <StProfileIcon onClick={onLoginModalOpen} />
      )}
      <DesktopAndTablet>
        <StProfileTextContainer onClick={onLoginModalOpen}>
          {!isLoading && <StUserName>{userData.nickname}</StUserName>}
          <StUserEmail>{userData.email}</StUserEmail>
        </StProfileTextContainer>
      </DesktopAndTablet>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;

  @media ${({ theme }) => theme.size.mobileRow} {
    justify-content: center;
  }
`;

const StProfileImg = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
`;

const StProfileIcon = styled(ProfileIcon)`
  flex-shrink: 0;
  cursor: pointer;
`;

const StProfileTextContainer = styled.div`
  padding-left: 13px;

  overflow: hidden;
  white-space: nowrap;
`;

const StUserName = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 130%;
`;

const StUserEmail = styled.p`
  font-size: 12px;
  margin-top: 5px;

  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 120%;
`;

export default UserProfile;
