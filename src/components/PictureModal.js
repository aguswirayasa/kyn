import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../api/axios";

const PictureModal = ({ profile, closeModal, showModal, refresh }) => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      profileImage: null,
      id: profile.id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      profileImage: Yup.mixed().required("Please select an image file"),
    }),
    onSubmit: (updateRequest) => {
      const { profileImage, id } = updateRequest;

      axios
        .post(
          "/api/edit-picture",
          {
            id: id,
            file: profileImage,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          refresh();
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
      {showModal && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50">
            <div className="relative my-6 mx-auto h-4/5 w-2/5 overflow-y-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between text-black p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Account</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="text-secondary h-6 w-6 text-2xl block outline-none focus:outline-none">
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

                    <div className="mb-2">
                      <label
                        htmlFor="profileImage"
                        className="block mb-2 text-sm font-medium text-secondary"
                      >
                        Profile Image
                      </label>
                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "profileImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                      />
                      {formik.touched.profileImage &&
                      formik.errors.profileImage ? (
                        <div className="text-red-500">
                          {formik.errors.profileImage}
                        </div>
                      ) : formik.touched.profileImage ? (
                        <div className="text-green-500">Looks Good!</div>
                      ) : null}
                    </div>

                    <input
                      id="id"
                      name="id"
                      type="hidden"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.id}
                      className="bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5"
                    />

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
};

export default PictureModal;
