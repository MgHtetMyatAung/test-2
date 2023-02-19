import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import {
  DECREASE_CARD,
  INCREASE_CARD,
  REMOVE_CARD,
} from "../services/cardSlice";
import cardEmptyImg from "../assets/card-empty.gif";
import EmptyData from "../components/EmptyData/EmptyData";

const AddToCard = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.card.cards);
  const reducePrice = products?.reduce((pv, cv) => pv + (cv.price*cv.qty), 0);
  const text = "Your card is empty !";
  const increaseHandle = (item) => {
    const currentPrice = subTotal + item.price;
    setSubTotal(currentPrice);
    setTax(currentPrice * 0.05);
    setTotal(currentPrice + currentPrice * 0.05);
    dispatch(INCREASE_CARD(item));
  };
  const decreaseHandle = (item) => {
    if (item.qty > 1) {
      const currentPrice = subTotal - item.price;
      setSubTotal(currentPrice);
      setTax(currentPrice * 0.05);
      setTotal(currentPrice + currentPrice * 0.05);
      dispatch(DECREASE_CARD(item));
    }
  };
  const removeHandle = (item) => {
    const currentPrice = subTotal - item.price * item.qty;
    setSubTotal(currentPrice);
    setTax(currentPrice * 0.05);
    setTotal(currentPrice + currentPrice * 0.05);
    dispatch(REMOVE_CARD(item));
  };
  const checkoutHandle = () => {
    if (localStorage.getItem("user")) {
      navigate("/checkout");
    } else {
      Swal.fire({
        title: "Please Login!",
        text: "You won't be able to checkout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };
  useEffect(() => {
    setSubTotal(reducePrice);
    setTax(reducePrice * 0.05);
    setTotal(reducePrice + reducePrice * 0.05);
  }, []);
  return (
    <>
      <Helmet>
        <title>EasyShop | AddToCard</title>
      </Helmet>
      <Header />
      <div
        className="container py-5"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        {
          products.length>0 ?(
            <div className="row gap-3 gap-lg-0">
          <div className="col-lg-9">
            <div className="">
              {products.map((item) => (
                <div
                  className="py-2"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  }}
                  key={item.id}
                >
                  <div className="row">
                    <div className="col-3 col-md-2 py-3">
                      <img
                        src={item.image}
                        alt=""
                        className="d-block mx-auto"
                        style={{ height: "60px" }}
                      />
                    </div>
                    <div className="col-9 col-md-4 py-3">
                      <h5 className=" text-truncate">{item.title}</h5>
                      <p className="mb-0">{item.category}</p>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className=" btn-group py-3 ms-3">
                        <button
                          className="btn btn-secondary"
                          onClick={() => decreaseHandle(item)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.qty}
                          className="text-center"
                          style={{ width: "50px" }}
                          disabled
                        />
                        <button
                          className="btn btn-secondary"
                          onClick={() => increaseHandle(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-4 col-md-2 py-3">
                      <h6 className="ps-3">{(item.price * item.qty).toFixed(2)} $</h6>
                    </div>
                    <div className="col-4 col-md-2 py-3">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeHandle(item)}
                      >
                        <i className="bi bi-trash-fill pe-none"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>SubTotal</td>
                    <td style={{ width: "130px", textAlign: "end" }}>
                      {subTotal.toFixed(2)}$
                    </td>
                  </tr>
                  <tr>
                    <td>Tax (5%)</td>
                    <td style={{ width: "130px", textAlign: "end" }}>
                      {tax.toFixed(2)}$
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td style={{ width: "130px", textAlign: "end" }}>
                      {total.toFixed(2)}$
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-primary"
                onClick={() => checkoutHandle()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
          ):(<EmptyData img={cardEmptyImg} text={text}/>)
        }
      </div>
      <Footer />
    </>
  );
};

export default AddToCard;
