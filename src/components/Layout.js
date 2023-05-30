import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="bg-primary">
      <Navbar />
      <main className="container mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
