import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/not-found.gif";
import EmptyData from "../components/EmptyData/EmptyData";

const NotFound = () => {
  const text= "Page Not Found !";
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <EmptyData img={notFoundImg} text={text}/>
      <Link to={'/'}>
        <button className="btn btn-sm bg-secondary text-white">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
