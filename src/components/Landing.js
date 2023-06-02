import React from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
export const Landing = () => {
  const auth = useIsAuthenticated();
  return (
    <div className="bg-gray-100">
      <div className="relative">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <img
          src="https://images.unsplash.com/photo-1603298108410-e6f28ad2708d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80"
          alt="Neighborhood"
          className="w-full h-screen object-cover"
          style={{ filter: "brightness(80%)" }}
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-200 mb-4">
              Welcome to KnowYourNeighborhood
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Easily keep track of all the stores in your neighborhood.
            </p>
            {!auth() && (
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
