import { ReactComponent as GoogleIcon } from '@src/assets/socailLogin/googlelogin.svg';
import { styled } from 'styled-components';

function GoogleLogin() {
  const Google_Client_ID = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;
  const Google_Redirect_Url = `${import.meta.env.VITE_GOOGLE_REDIRECT_URL}`;
  const Google_Auth_Url = `https://accounts.google.com/o/oauth2/auth?client_id=${Google_Client_ID}&redirect_uri=${Google_Redirect_Url}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline&prompt=consent`;

  // Naver_Auth_Url 연결
  const Google = () => {
    window.location.href = Google_Auth_Url;
  };

  return (
    <div>
      <StGoogleIcon onClick={Google} />
    </div>
  );
}

const StGoogleIcon = styled(GoogleIcon)`
  cursor: pointer;
`;

export default GoogleLogin;
