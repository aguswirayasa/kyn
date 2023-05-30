import { GoogleLogin } from "@react-oauth/google";
const GoogleSignIn = ({ handleGoogleLogin }) => {
  return (
    <>
      <GoogleLogin
        shape="circle"
        size="large"
        type="standard"
        logo_alignment="center"
        text="continue_with"
        locale="english"
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default GoogleSignIn;
