import React from "react";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <div className="bg-white shadow-lg">
      <footer className=" text-secondary max-w-7xl  mx-auto">
        <div className="container flex flex-wrap justify-between items-center p-2 border-b-2 border-gray-300">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-16" />
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4">
            <a href="/" className="hover:text-accent">
              Home
            </a>
            <a href="/about" className="hover:text-accent">
              About Us
            </a>
            <a href="/contact" className="hover:text-accent">
              Contact Us
            </a>
            <a href="/terms" className="hover:text-accent">
              Terms and Conditions
            </a>
          </nav>
        </div>
        <div className="grid place-items-center p-2">
          {/* Social Links */}
          <div className="flex space-x-4 text-accent">
            <a href="/" className="hover:text-accent-dark">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="/" className="hover:text-accent-dark">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="hover:text-accent-dark">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} Know Your Neighborhood. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
