import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthUser } from "react-auth-kit";
import EditProfileModal from "./EditProfileModal";
import DeleteModal from "./DeleteModal";
import { useNavigate, Link } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [isStateChange, setIsStateChange] = useState(false);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(null);

  // ROLE CHECK
  const auth = useAuthUser();
  const isAdmin = auth()?.role === "ADMIN" || auth()?.role === "ROLE_ADMIN";

  const handleViewProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  const handleShowProfileModal = (userId) => {
    setShowProfileModal(userId);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(null);
  };

  const handleShowModal = (userId) => {
    setShowModal(userId);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleStateChange = () => {
    setIsStateChange(!isStateChange);
  };
  useEffect(() => {
    axios
      .get("/api/manage-user", {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isStateChange]);

  const handleDeleteUser = (id) => {
    axios
      .get("api/delete-user", {
        params: {
          id: id,
        },
        withCredentials: true,
      })
      .then((response) => {
        setIsStateChange(!isStateChange);
        setShowModal(null);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!isAdmin) {
    return (
      <div className="h-screen grid place-items-center">
        <div className="bg-white rounded-lg w-2/4 h-1/3 grid place-content-center gap-3">
          <h1 className="font-bold text-2xl">Access denied!</h1>
          <p text-lg>You must be an admin to view this page.</p>

          <button
            className="px-6 py-3 text-white bg-accent rounded-md hover:bg-accent-dark transition-colors"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex lg:my-20 justify-center h-screen">
      <div className="relative w-full lg:max-w-7xl overflow-x-auto ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-primary uppercase bg-accent">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-secondary">
            {users && users.length > 0 ? (
              <>
                {users.map((user, index) => (
                  <tr key={user.id} className="bg-white border-b">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 ">{user.email}</td>
                    <td className="px-6 py-4">{user.userName}</td>
                    <td className="px-6 py-4">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.city}</td>
                    <td className="px-6 py-4">{user.country}</td>
                    <td className="px-6 py-4 text-primary flex gap-2">
                      <EditProfileModal
                        onClick={() => handleShowProfileModal(user.id)}
                        profile={user}
                        closeModal={handleCloseProfileModal}
                        showModal={showProfileModal === user.id}
                        handleRefresh={handleStateChange}
                        buttonText="update"
                      />
                      <DeleteModal
                        onClick={() => handleShowModal(user.id)}
                        id={user.id}
                        apiCall={handleDeleteUser}
                        closeModal={handleCloseModal}
                        showModal={showModal === user.id}
                        username={user.userName}
                      />
                      <button
                        onClick={() => handleViewProfile(user.userName)}
                        className="bg-teal-500 px-6 py-3 rounded font-bold uppercase drop-shadow-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="bg-white border-b ">
                <td
                  className="px-6 py-4 text-center  font-semibold"
                  colSpan={7}
                >
                  No User Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
