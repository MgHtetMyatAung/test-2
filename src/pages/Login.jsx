import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useNoti } from "../Hooks/useNoti";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [dataFalse, setDataFalse] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (
        Cookies.get("s_email") == values.email &&
        Cookies.get("s_password") == values.password
      ) {
        setError(true);
        useNoti("Login is successful !");
        localStorage.setItem("user", JSON.stringify(values));
        navigate("/");
      } else if (
        Cookies.get("s_email") !== values.email &&
        Cookies.get("s_password") !== values.password
      ) {
        setError(false);
        setDataFalse("Your data is not correct !");
      } else if (Cookies.get("s_email") !== values.email) {
        setError(false);
        setDataFalse("Your email is not correct !");
      } else {
        setError(false);
        setDataFalse("Your password is not correct !");
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>EasyShop | Login</title>
      </Helmet>
      <div
      className="d-flex justify-content-center pt-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-12 col-md-8 col-lg-3 px-3 px-md-0">
        <form action="" className="mt-5 pt-5" onSubmit={formik.handleSubmit}>
          <h4 className=" text-center mb-2">Login to Your Account</h4>
          {error ? (
            <p className=" text-center text-muted">
              Please fill your correct data
            </p>
          ) : (
            <p className=" text-center text-danger">
              {dataFalse}
            </p>
          )}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control form-control-sm"
              id="floatingInput1"
              placeholder="name@example.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="floatingInput1">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control form-control-sm"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-lg d-block mx-auto w-100 btn-secondary px-5 mt-3"
          >
            Login
          </button>
        </form>
        <div className="mt-3">
          <span className="text-muted">Don't have an account ?</span>
          <Link
            className="text-primary text-decoration-none ms-3"
            to={"/signup"}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
