import React, { useState } from "react";
import logo from "../assets/images/logo1.png";
import bg from "../assets/images/form-bg.jpg";
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn from "./GoogleSignIn";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import * as Yup from "yup";
const GOOGLE_LOGIN_URL = "auth/google-login-callback";
const FACEBOOK_LOGIN_URL = "auth/facebook-login-callback";
const Login = () => {
  const signIn = useSignIn();
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const handleGoogleLogin = (credentialResponse) => {
    // Store the access token in a variable or state if needed
    const credential = credentialResponse.credential;
    console.log(credential);
    // Make an HTTP POST request to your backend endpoint
    axios
      .post(GOOGLE_LOGIN_URL, { credential })
      .then((response) => {
        if (response.data) {
          signIn({
            token: response?.data?.token,
            tokenType: "Bearer",
            expiresIn: 3600,
            authState: {
              username: response?.data?.username,
              picture: response?.data?.picture,
              role: response?.data?.role.name,
            },
          });
          navigate(
            location.state?.from?.pathname ||
              (response?.data?.username
                ? "/profile/" + response.data.username
                : "/"),
            { replace: true }
          );
          console.log(response.data);
        }
        setErrorMsg("No Server Response");
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log(error);
        if (!error?.response) {
          setErrorMsg("No Server Response");
        } else if (error.response?.status === 401) {
          setErrorMsg("Unauthorized");
        } else {
          setErrorMsg("Login Failed");
        }
      });
  };
  const handleFacebookLogin = (response) => {
    const email = response.email;
    const id = response.id;
    const username = response.name;
    const picture = response.picture.data.url;

    axios
      .post(FACEBOOK_LOGIN_URL, { username, email, id, picture })
      .then((res) => {
        if (res.data) {
          signIn({
            token: res?.data?.token,
            tokenType: "Bearer",
            expiresIn: 3600,
            authState: {
              username: res?.data?.username,
              picture: res?.data?.picture,
              role: res?.data?.role.name,
            },
          });
          navigate(
            location.state?.from?.pathname ||
              (res?.data?.username ? "/profile/" + res.data.username : "/"),
            { replace: true }
          );
          console.log(res.data);
        }
        setErrorMsg("No Server Response");
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log(error);
        if (!error?.response) {
          setErrorMsg("No Server Response");
        } else if (error.response?.status === 401) {
          setErrorMsg("Unauthorized");
        } else {
          setErrorMsg("Login Failed");
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),
    onSubmit: (user) => {
      const { username, password } = user;
      axios
        .post(
          "/auth/login",
          { username, password },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            signIn({
              token: response?.data?.token,
              tokenType: "Bearer",
              expiresIn: 3600,
              authState: {
                username: response?.data?.username,
                picture: response?.data?.picture,
                role: response?.data?.roles[0],
              },
            });
            navigate(
              location.state?.from?.pathname ||
                (response?.data?.username
                  ? "/profile/" + response.data.username
                  : "/"),
              { replace: true }
            );
          }
        })
        .catch((error) => {
          if (!error?.response) {
            setErrorMsg("No Server Response");
          } else if (error.response?.status === 401) {
            setErrorMsg("Invalid username or password.");
          } else {
            setErrorMsg("Login Failed");
          }
          console.log(error);
        });
    },
  });
  return (
    <section className="min-h-screen flex items-stretch text-white ">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute bg-secondary opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide">
            Discover Local Gems
          </h1>
          <p className="text-3xl my-4">
            Sign in to Your Account and Explore Stores in Your Neighborhood
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-secondary">
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20">
          <h1 className="my-6 text-primary font-bold text-4xl uppercase">
            <img src={logo} alt="logo" className="h-16" />
            Know Your Neighborhood
          </h1>
          {errorMsg && (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{errorMsg}</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => {
                    setErrorMsg("");
                  }}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          <div className="py-6 space-x-2 flex justify-center">
            <div className="flex flex-col justify-center items-center gap-2 w-fit">
              <FacebookSignIn handleFacebookLogin={handleFacebookLogin} />
              <GoogleSignIn handleGoogleLogin={handleGoogleLogin} />
            </div>
          </div>
          <p className="text-gray-100">or use your account username</p>
          <form
            action=""
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="pb-2 pt-4">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="block w-full p-4 text-lg rounded-sm bg-black"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-left">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="pb-2 pt-4">
              <input
                className="block w-full p-4 text-lg rounded-sm bg-black"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-left">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="px-4 pb-2 pt-4">
              <button
                className="uppercase block w-full p-4 text-lg rounded-full bg-accent hover:bg-accent-dark focus:outline-none"
                type="submit"
              >
                sign in
              </button>
            </div>

            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
              <a href="/">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="/">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="/">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
