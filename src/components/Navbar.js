import React from "react";
import useAuth from "../hooks/useAuth";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };
  const handleHoverOut = () => {
    setIsHovered(false);
  };
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("auth");
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <a href="/" className="flex items-center py-4">
            <img src={logo} alt="Logo" className="h-16" />
          </a>
          <div className="flex items-center space-x-4">
            <Link to="/contact-us" className="text-secondary hover:text-accent">
              Contact Us
            </Link>
            <Link to="/about-us" className="text-secondary hover:text-accent">
              About Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {auth?.username ? (
              <div className="flex gap-4 items-center">
                <Link to="/profile">
                  <div className="flex border-2 border-accent p-3 items-center gap-2 cursor-pointer">
                    <img src={auth.picture} alt="pfp" className="h-10 w-auto" />
                    <h1 className="text-md text-secondary font-semibold">
                      {auth.username}
                    </h1>
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
                    <i className="fa-solid fa-right-from-bracket text-secondary"></i>
                  </div>
                  <div
                    className={`absolute top-0 right-0 w-auto px-2 py-2 align-middle text-indigo-950 text-lg font-semibold transition-all duration-300 z-50 bg-accent ${
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
