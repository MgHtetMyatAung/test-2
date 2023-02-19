import React, { useEffect, useState } from "react";
import "./header.module.css";
import shopImg from "../../assets/online-shopping.png";
import { json, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Header = () => {
  const [show, setShow] = useState(false);
  const [existUser, setExistUser] = useState(false);
  const getUser = JSON.parse(localStorage.getItem("user"));
  const products = useSelector((state) => state.card.cards);
  const handleLogout = () => {
    localStorage.clear();
    setExistUser(false);
  };
  useEffect(() => {
    if (getUser) {
      setExistUser(true);
    } else {
      setExistUser(false);
    }
  }, [existUser]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-white shadow-sm d-print-none">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to={"/"}
          >
            <img
              src={shopImg}
              className="pe-none"
              alt=""
              style={{ width: "35px" }}
            />
            <span className="pe-none">EasyShop</span>
          </Link>
          <button
            className="btn d-lg-none"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <i className="bi bi-x pe-none"></i>
            ) : (
              <i className="bi bi-list pe-none"></i>
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className={`nav-item ${existUser ?'dropdown':null}`}>
                {existUser ? (
                  <>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Settings
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Profile
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link className="nav-link" to={"/login"}>
                    <button className="btn btn-sm bg-secondary text-white">
                      Login
                    </button>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={"/addtocard"}
                >
                  <button className="btn btn-sm d-flex justify-content-center align-items-center gap-2 bg-secondary text-white">
                    <i className="bi bi-bag"></i>
                    <span className="">{products.length}</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
