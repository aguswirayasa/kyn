import React from "react";
import bg from "../assets/images/form-bg.jpg";
const Registration = () => {
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
          <form class="px-8 pt-6 pb-8 mb-4  rounded">
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
                />
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
                />
              </div>
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
              />
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
                />
              </div>
              <div class="md:ml-2">
                <label
                  class="block mb-2 text-sm font-bold text-primary"
                  for="c_password"
                >
                  Confirm Password
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-primary bg-black  focus:outline-none focus:shadow-outline"
                  id="c_password"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
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
