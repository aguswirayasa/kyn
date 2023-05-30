import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import EditProfileModal from "./EditProfileModal";
import axios from "../api/axios";
const Profile = () => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [profile, setProfile] = useState({});
  const username = auth.username;
  useEffect(() => {
    axios
      .get("api/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
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
  }, [isProfileUpdated]);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleProfileRefresh = () => {
    setIsProfileUpdated(!isProfileUpdated);
  };
  return (
    <div>
      <div class="p-16">
        <div class="p-8 bg-white shadow mt-24">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {auth?.picture ? (
                  <img
                    src={auth.picture}
                    alt="pfp"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div class="flex  mt-32 md:mt-0 md:justify-center">
              <EditProfileModal
                onClick={handleShowModal}
                showModal={showModal}
                profile={profile}
                auth={auth}
                handleRefresh={handleProfileRefresh}
              />
            </div>
          </div>

          <div class="mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">{auth.username}</h1>
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
