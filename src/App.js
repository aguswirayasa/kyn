import "./App.css";
import Navbar from "./components/Navbar";
import { Landing } from "./components/Landing";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Profile from "./components/Profile";
import ErrorBoundary from "./components/ErrorBoundary";
import Registration from "./components/Registration";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { RequireAuth } from "react-auth-kit";
import TermsAndConditions from "./components/TermsAndConditions";
import ManageUser from "./components/ManageUser";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/manage-user" element={<ManageUser />} />

            <Route
              path="/profile/:username"
              element={
                <RequireAuth loginPath="/login">
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
