import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../api/axios";
import { Link } from "react-router-dom";
const Registration = () => {
  const [errorMsg, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required("This field is required"),
      lastName: Yup.string().required("This field is required"),
      userName: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
    }),
    onSubmit: (user) => {
      const { firstName, lastName, userName, email, password } = user;
      axios
        .post(
          "api/register",
          { firstName, lastName, userName, email, password },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setSuccess("Registration success!");
            formik.resetForm({
              firstName: "",
              lastName: "",
              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setError(
              "Username already exists. Please choose a different username."
            );
          } else {
            setError("Registration failed, please try again!");
          }
          console.log(error);
        });
    },
  });
  return (
    <div class="container mx-auto ">
      <div class="w-full flex min-h-screen">
        <div
          class="w-full h-auto bg-gray-400 text-primary hidden lg:flex lg:w-1/2 bg-cover bg-no-repeat rounded-l-lg relative items-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1499310392581-322cec0355a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)`,
          }}
        >
          <div className="absolute bg-secondary opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Join Our Community
            </h1>
            <p className="text-3xl my-4">
              Discover and Connect with Local Stores in Your Neighborhood
            </p>
          </div>
        </div>
        <div class="w-full grid place-content-center place-items-center lg:w-1/2  bg-secondary p-5 rounded-lg lg:rounded-l-none text-primary">
          <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errorMsg}
            </div>
          )}
          {success && (
            <Link to="/login">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success} Click here to Login
              </div>
            </Link>
          )}
          <form
            class="px-8 pt-6 pb-8 mb-4  rounded"
            onSubmit={formik.handleSubmit}
          >
            <div class="mb-4 md:flex md:justify-between">
              <div class="mb-4 md:mr-2 md:mb-0">
                <label
                  class="block mb-2 text-sm font-bold text-primary"
                  for="firstName"
                >
                  First Name
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-primary bg-black   focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                ) : formik.touched.firstName ? (
                  <div className="text-green-500">Looks Good!</div>
                ) : null}
              </div>
              <div class="md:ml-2">
                <label
                  class="block mb-2 text-sm font-bold text-primary"
                  for="lastName"
                >
                  Last Name
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-primary bg-black    focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500">{formik.errors.lastName}</div>
                ) : formik.touched.lastName ? (
                  <div className="text-green-500">Looks Good!</div>
                ) : null}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block mb-2 text-sm font-bold text-primary"
                for="userName"
              >
                Username
              </label>
              <input
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-primary bg-black  focus:outline-none focus:shadow-outline"
                id="userName"
                type="userName"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="text-red-500">{formik.errors.userName}</div>
              ) : formik.touched.userName ? (
                <div className="text-green-500">Looks Good!</div>
              ) : null}
            </div>
            <div class="mb-4">
              <label
                class="block mb-2 text-sm font-bold text-primary"
                for="email"
              >
                Email
              </label>
              <input
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-primary bg-black  focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : formik.touched.email ? (
                <div className="text-green-500">Looks Good!</div>
              ) : null}
            </div>
            <div class="mb-4 md:flex md:justify-between">
              <div class="mb-4 md:mr-2 md:mb-0">
                <label
                  class="block mb-2 text-sm font-bold text-primary"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-primary bg-black   focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : formik.touched.password ? (
                  <div className="text-green-500">Looks Good!</div>
                ) : null}
              </div>
              <div class="md:ml-2">
                <label
                  class="block mb-2 text-sm font-bold text-primary"
                  for="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-primary bg-black  focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                ) : formik.touched.confirmPassword ? (
                  <div className="text-green-500">Looks Good!</div>
                ) : null}
              </div>
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register Account
              </button>
            </div>
            <hr class="mb-6 border-t" />
            <div class="text-center">
              <a
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="/"
              >
                Forgot Password?
              </a>
            </div>
            <div class="text-center">
              <a
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="./index.html"
              >
                Already have an account? Login!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
