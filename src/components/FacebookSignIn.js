import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import FacebookSignInButton from "./FacebookSignInButton";
const FacebookSignIn = ({ handleFacebookLogin }) => {
  return (
    <FacebookLogin
      appId="639609798031137"
      fields="name,email,picture,id"
      onSuccess={(response) => {
        console.log("Login Success!", response);
      }}
      onFail={(error) => {
        console.log("Login Failed!", error);
      }}
      onProfileSuccess={(response) => {
        handleFacebookLogin(response);
      }}
      render={({ onClick, logout }) => (
        <FacebookSignInButton handleOnClick={onClick} />
      )}
    />
  );
};

export default FacebookSignIn;
