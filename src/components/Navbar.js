import React from "react";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";

const Navbar = () => {
  const signOut = useSignOut();

  const navigate = useNavigate();
  const auth = useAuthUser();
  const [isHovered, setIsHovered] = useState(false);
  const isAdmin = auth()?.role === "ADMIN" || auth()?.role === "ROLE_ADMIN";
  const handleHover = () => {
    setIsHovered(true);
  };
  const handleHoverOut = () => {
    setIsHovered(false);
  };
  const handleLogout = () => {
    signOut();
    handleHoverOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <Link to="/" className="flex items-center py-4">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/contact-us" className="text-secondary hover:text-accent">
              Contact Us
            </Link>
            <Link to="/about-us" className="text-secondary hover:text-accent">
              About Us
            </Link>

            {isAdmin && (
              <Link
                to="/manage-user"
                className="text-secondary hover:text-accent"
              >
                Manage User
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {auth()?.username ? (
              <div className="flex gap-4 items-center">
                <Link to={`/profile/${auth()?.username}`}>
                  <div className="sm:flex hidden border-2 border-accent p-3 items-center gap-2 cursor-pointer ">
                    <h1 className="text-base text-secondary font-semibold ">
                      Logged in as {auth()?.username}
                    </h1>
                  </div>
                  <div className=" block sm:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      viewBox="0 0 20 20"
                      fill="rgb(60, 128, 254)"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>

                <button
                  className="flex items-center justify-start w-12 h-12 rounded-full border-none cursor-pointer relative overflow-hidden transition-all duration-300 shadow-md bg-accent hover:w-40 hover:rounded-xl"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHoverOut}
                  onClick={handleLogout}
                >
                  <div
                    className={`flex items-center justify-center  ${
                      isHovered ? "w-1/3" : "w-full"
                    }`}
                  >
                    <i className="fa-solid fa-right-from-bracket text-primary"></i>
                  </div>
                  <div
                    className={`absolute top-0 right-0 w-auto px-2 py-2 align-middle text-primary text-lg font-semibold transition-all duration-300 z-50 bg-accent ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Log out
                  </div>
                </button>
              </div>
            ) : (
              <>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
