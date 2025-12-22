import React from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "../components/Commun/Navbar";
import Footer from "../components/Commun/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
