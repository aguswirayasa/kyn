import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../api/axios";

export default function EditProfileModal({
  onClick,
  showModal,
  profile,
  handleRefresh,
  closeModal,
  buttonText,
}) {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      username: profile.userName || "",
      email: profile.email || "",
      bio: profile.bio || "",
      city: profile.city || "",
      country: profile.country || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required("This field is required"),
      lastName: Yup.string().required("This field is required"),
      username: Yup.string().required("This field is required"),
      bio: Yup.string()
        .max(500, "Bio cannot exceed 500 character")
        .required("This field is required"),
      city: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
    }),
    onSubmit: (UpdateRequest) => {
      const { firstName, lastName, username, email, bio, city, country } =
        UpdateRequest;
      axios
        .post(
          "api/edit-profile",
          { firstName, lastName, username, email, bio, city, country },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          handleRefresh();
          closeModal();
          console.log(response.data);
        })
        .catch((error) => {
          setError("Update failed");
          console.log(error);
        });
    },
  });
  return (
    <>
      <button
        className="bg-accent text-white hover:bg-accent-dark font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
        type="button"
        onClick={() => onClick()}
      >
        {buttonText}
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex  fixed inset-0 z-50 ">
            <div className="relative  my-6 mx-auto h-4/5 w-2/5 overflow-y-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between text-black p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Profile</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className=" text-secondary  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={formik.handleSubmit}>
                    {error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                      </div>
                    )}

                    <input
                      className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                      id="username"
                      name="username"
                      type="hidden"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />

                    <div className="mb-2">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-secondary"
                      >
                        First Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="text-red-500">
                          {formik.errors.firstName}
                        </div>
                      ) : formik.touched.firstName ? (
                        <div className="text-green-500">Looks Good!</div>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-secondary"
                      >
                        Last Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="text-red-500">
                          {formik.errors.lastName}
                        </div>
                      ) : formik.touched.lastName ? (
                        <div className="text-green-500">Looks Good!</div>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-secondary"
                      >
                        Email Address
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">
                          {formik.errors.email}
                        </div>
                      ) : formik.touched.email ? (
                        <div className="text-green-500">Looks Good!</div>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-secondary"
                      >
                        City
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                        id="city"
                        name="city"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city ? (
                        <div className="text-red-500">{formik.errors.city}</div>
                      ) : formik.touched.city ? (
                        <div className="text-green-500">Looks Good!</div>
                      ) : null}
                    </div>
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-secondary"
                    >
                      Country
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                      id="country"
                      name="country"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className="text-red-500">
                        {formik.errors.country}
                      </div>
                    ) : formik.touched.country ? (
                      <div className="text-green-500">Looks Good!</div>
                    ) : null}
                    <div className="mb-2">
                      <label
                        htmlFor="bio"
                        className="block mb-2 text-sm font-medium text-secondary"
                      >
                        Bio
                      </label>
                      <textarea
                        className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                        id="bio"
                        placeholder="Describe yourself..."
                        name="bio"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bio}
                      />
                      {formik.touched.bio && formik.errors.bio ? (
                        <div className="text-red-500">{formik.errors.bio}</div>
                      ) : formik.touched.bio ? (
                        <div className="text-green-500">Looks Good!</div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-accent text-white active:bg-accent-dark font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
