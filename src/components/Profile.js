import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import axios from "../api/axios";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AccountModal from "./AccountModal";
import PictureModal from "./PictureModal";
const Profile = () => {
  const auth = useAuthUser();
  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [profile, setProfile] = useState({});
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth()) {
      // User is not authenticated and cookies are expired
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get("api/profile", {
        withCredentials: true,
        params: {
          username: username,
        },
      })
      .then((response) => {
        setProfile(response.data);
        console.log(profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isProfileUpdated, location]);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleProfileRefresh = () => {
    setIsProfileUpdated(!isProfileUpdated);
  };
  const handleShowAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };
  const handleShowPictureModal = () => {
    setShowPictureModal(!showPictureModal);
  };

  return (
    <div>
      <div class="p-16">
        <div class="p-8 bg-white shadow mt-24">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="hidden lg:grid md:grid text-center order-last md:order-first mt-20  md:mt-0"></div>
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {profile.profileImage ? (
                  <img
                    src={`data:image/jpeg;base64,${profile.profileImage}`}
                    alt="pfp"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : profile.pictureUrl ? (
                  <img
                    src={profile.pictureUrl}
                    alt="pfp"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <div
                  className="rounded-full p-2 -right-1 top-3 absolute cursor-pointer"
                  style={{ backgroundColor: "#e0e7ff" }}
                  onClick={() => handleShowPictureModal()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="35"
                    height="35"
                    viewBox="0,0,256,256"
                    style={{ fill: "#000000" }}
                  >
                    <g
                      fill="#6366f1"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M14,4c-5.514,0 -10,4.486 -10,10v22c0,5.514 4.486,10 10,10h22c5.514,0 10,-4.486 10,-10v-22c0,-5.514 -4.486,-10 -10,-10zM21.13281,13h7.73438c0.873,0 1.69353,0.46489 2.14453,1.21289l1.83398,3.06055c0.269,0.448 0.76311,0.72656 1.28711,0.72656h5.36719c0.827,0 1.5,0.673 1.5,1.5v16c0,0.827 -0.673,1.5 -1.5,1.5h-29c-0.827,0 -1.5,-0.673 -1.5,-1.5v-16c0,-0.827 0.673,-1.5 1.5,-1.5h5.36719c0.523,0 1.01811,-0.27852 1.28711,-0.72852l1.83398,-3.05859c0.45,-0.748 1.27153,-1.21289 2.14453,-1.21289zM12,14h2c0.552,0 1,0.448 1,1v1h-4v-1c0,-0.552 0.448,-1 1,-1zM34,19.5c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM25,20c-4.136,0 -7.5,3.364 -7.5,7.5c0,4.136 3.364,7.5 7.5,7.5c4.136,0 7.5,-3.364 7.5,-7.5c0,-4.136 -3.364,-7.5 -7.5,-7.5zM25,22c3.032,0 5.5,2.468 5.5,5.5c0,3.032 -2.468,5.5 -5.5,5.5c-3.032,0 -5.5,-2.468 -5.5,-5.5c0,-3.032 2.468,-5.5 5.5,-5.5z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex gap-2  mt-32 md:mt-0 justify-center lg:justify-start">
              {profile.userName === auth()?.username ? (
                <AccountModal
                  onClick={handleShowAccountModal}
                  showModal={showAccountModal}
                  buttonText={"Edit Account"}
                  closeModal={handleShowAccountModal}
                  profile={profile}
                />
              ) : null}

              <EditProfileModal
                onClick={handleShowModal}
                showModal={showModal}
                closeModal={handleShowModal}
                profile={profile}
                handleRefresh={handleProfileRefresh}
                buttonText={"edit profile"}
              />
              <PictureModal
                profile={profile}
                showModal={showPictureModal}
                closeModal={handleShowPictureModal}
                refresh={handleProfileRefresh}
              />
            </div>
          </div>

          <div class="mt-10 sm:mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">
              {profile.userName}
            </h1>
            <p class="font-light text-gray-600 mt-3">
              {profile.firstName} {profile.lastName}
            </p>

            <p class="mt-8 text-gray-500">
              {profile?.city && profile?.country
                ? profile.city + " - " + profile.country
                : "No location available"}
            </p>
            <p class="mt-2 text-gray-500">{profile.email}</p>
          </div>

          <div class="mt-12 flex flex-col justify-center">
            <p class="text-gray-600 text-center font-light lg:px-16">
              {profile.bio ? profile.bio : "No bio available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
