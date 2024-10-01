import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = ({ setActiveIcon }) => {
  useEffect(() => {
    setActiveIcon("home");
  }, [setActiveIcon]);

  return (
    <div>
      <h1>Hello World</h1>
      <ToastContainer />
    </div>
  );
};

export default Homepage;
