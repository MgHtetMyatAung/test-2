import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useNoti } from "../Hooks/useNoti";

const SignUp = () => {
  const navigate = useNavigate();
  const [isActive,setIsActive]= useState(true);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.name.trim() !== "" && values.password.trim() !== "") {
        Cookies.set("s_name", values.name, { expires: 7 });
        Cookies.set("s_email", values.email, { expires: 7 });
        Cookies.set("s_password", values.password, { expires: 7 });
        useNoti("Sign up is successful !");
        navigate("/login");
      }
    },
  });
  useEffect(()=>{
    if(formik.values.password.trim().length>=6 && formik.values.name.trim().length>=5){
      setIsActive(false);
    }else{
      setIsActive(true);
    }
  },[formik.values.password,formik.values.name]);
  return (
    <>
      <Helmet>
        <title>EasyShop | SignUp</title>
      </Helmet>
      <div
        className="d-flex justify-content-center pt-5"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-md-8 col-lg-3 px-3 px-md-0">
          <form action="" className="mt-5 pt-5" onSubmit={formik.handleSubmit}>
            <h4 className=" text-center mb-2">Create Your Account</h4>
            <p className=" text-center text-muted">
              Lorem ipsum dolor sit amet.
            </p>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control form-control-sm"
                id="floatingInput"
                placeholder="Mike"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                minLength="5"
                required
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control form-control-sm"
                id="floatingInput1"
                placeholder="name@example.com"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
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
                minLength="6"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              type="submit"
              className={`btn btn-lg d-block mx-auto w-100 ${isActive?'btn-secondary disabled':'btn-primary'} px-5 mt-3`}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-3">
            <span className=" text-muted user-select-none">You have already an account ?</span>
            <Link
              className="text-primary text-decoration-none ms-3 user-select-none"
              to={"/login"}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
