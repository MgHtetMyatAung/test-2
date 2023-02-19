import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Hero from "../components/Hero/Hero";
import { useFetch } from "../Hooks/useFetch";
import BeatLoader from "react-spinners/BeatLoader";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectData, setSelectData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAllProducts = async (url) => {
    const data = await useFetch(url);
    setData(data);
  };
  const getAllCategory = async (url) => {
    setLoading(true);
    const data = await useFetch(url);
    setCategories(data);
    setLoading(false);
  };

  const handleChange = (value) => {
    getAllProducts(value);
  };

  useEffect(() => {
    getAllProducts("products");
    getAllCategory("products/categories");
  }, []);
  return (
    <>
      <Helmet>
        <title>EasyShop | Home</title>
      </Helmet>
      <Header />
      <Hero />
      <div className="container" style={{ width: "100vw", minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="fs-5 mb-0">Products List</p>
          <select
            name=""
            id=""
            className=" form-select form-select-sm"
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: "170px" }}
          >
            <option value="products">All</option>
            {categories?.map((item) => (
              <option value={`products/category/${item}`} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="d-flex flex-column align-items-center mt-5 pt-5">
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="row g-3 py-3">
            {data?.map((item) => (
              <ProductCard item={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
