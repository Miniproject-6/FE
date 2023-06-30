import { styled } from 'styled-components';
import { ReactComponent as ProfileIcon } from '@src/assets/default-user-profile-icon.svg';
import { useState } from 'react';
import useImgLoadError from '@src/Hook/useImgLoadError';

interface UserProfileImageProps {
  isExistToken?: boolean;
  imgSrc: null | string;
  isLoading?: boolean;
  size: string;
}

const UserProfileImage = ({ isExistToken, imgSrc, isLoading, size }: UserProfileImageProps) => {
  const { imageLoadError, onImageError } = useImgLoadError();

  return (
    <>
      {/* TO DO: Nav에 적용할 경우 isExistToken && 조건 적용해야 함 */}
      {imgSrc !== null && !imageLoadError ? (
        <StProfileImg src={imgSrc} size={size} alt="user profile image" onError={onImageError} />
      ) : (
        !isLoading && <StProfileIcon size={size} />
      )}
    </>
  );
};

const StProfileImg = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  object-fit: cover;
`;

const StProfileIcon = styled(ProfileIcon)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  flex-shrink: 0;
`;

export default UserProfileImage;
