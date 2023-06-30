import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { ProjectDataType } from '@src/types/portfolioType';
import { getUser } from '@src/apis/user';
import { ReactComponent as DeleteModalIcon } from '@src/assets/delete-post-modal-icon.svg';
import useDecodeJWT from '@src/Hook/useDecodeJWT';
import UserProfileImage from '../common/UserProfileImage';
import NoImage from '../common/NoImage';
import Modal from '../common/Modal';
import { useRecoilValue } from 'recoil';
import { isDarkModeState } from '@src/states/darkModeState';

interface ProjectItemProps {
  project: ProjectDataType;
  isEditMode: boolean;
  deleteProject?: (id: number) => void;
}

const ProjectItem = ({ project, isEditMode, deleteProject }: ProjectItemProps) => {
  const [userData, setUserData] = useState({ nickname: '', profileImage: null });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeState);

  const onImageError = () => {
    setImageLoadError(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    let userId = useDecodeJWT().userId;

    const fetchUserData = async () => {
      const serverUserData = await getUser({ id: userId });
      setUserData(serverUserData);
    };
    fetchUserData();
  }, []);

  return (
    <StProjectItem>
      <StImgContainer>
        {isEditMode && (
          <StIconContainer onClick={openDeleteModal}>
            <StDeleteIcon />
          </StIconContainer>
        )}
        {project.projectImageList !== null &&
        project.projectImageList.length !== 0 &&
        !imageLoadError ? (
          <StProjectImg
            src={project.projectImageList[0].imageUrl}
            onError={onImageError}
            alt="project representative image"
          />
        ) : (
          <NoImage height="100%" borderTopRadius="20px" />
        )}
      </StImgContainer>
      <StDescriptionContainer>
        <StTopDescription>
          <StProjectTitle isdarkmode={`${isDarkMode}`}>{project.title}</StProjectTitle>
          <StProjectPosition>{project.position}</StProjectPosition>
        </StTopDescription>
        <StBottomDescription>
          <UserProfileImage imgSrc={userData.profileImage} size="25px" />
          <StUserName isdarkmode={`${isDarkMode}`}>{userData.nickname}</StUserName>
        </StBottomDescription>
      </StDescriptionContainer>
      {isDeleteModalOpen && (
        <Modal
          Icon={DeleteModalIcon}
          onClose={onCloseDeleteModal}
          deletePost={deleteProject}
          mainText="프로젝트를 정말 삭제할까요?"
          subText="삭제하고 나면 복구할 수 없어요."
          mainButtonText="취소"
          subButtonText="삭제하기"
          selectedId={project.id}
          type="multiline"
        />
      )}
    </StProjectItem>
  );
};

const StProjectItem = styled.div`
  width: 275px;
  height: 250px;

  border: 1px solid lightgray;
  border-radius: 20px;
`;

const StImgContainer = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
`;

const StIconContainer = styled.div`
  cursor: pointer;
  :hover {
    transition: 0.5s;
    color: ${({ theme }) => theme.color.errorRed};
  }
`;

const StDeleteIcon = styled(IoMdCloseCircle)`
  position: absolute;
  top: 5%;
  right: 5%;
  color: white;
  font-size: 28px;
`;

const StProjectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const StDescriptionContainer = styled.div`
  height: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StTopDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StProjectTitle = styled.div<{ isdarkmode: string }>`
  font-weight: bold;
  font-size: 19px;
  color: ${({ theme, isdarkmode }) => (isdarkmode === 'true' ? 'white' : theme.color.fontColor)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StProjectPosition = styled.div`
  color: #adadad;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StBottomDescription = styled.div`
  display: flex;
  align-items: center;
`;

const StUserName = styled.div<{ isdarkmode: string }>`
  margin-left: 10px;
  font-weight: bold;
  color: ${({ theme, isdarkmode }) => (isdarkmode === 'true' ? 'white' : theme.color.fontColor)};
`;

export default ProjectItem;
