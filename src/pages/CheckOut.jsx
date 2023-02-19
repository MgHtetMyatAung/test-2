import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import emptyImg from "../assets/empty.gif";
import EmptyData from "../components/EmptyData/EmptyData";

const CheckOut = () => {
  const products = useSelector((state) => state.card.cards);
  const headers = [
    { label: "No", key: "no" },
    { label: "Item", key: "item" },
    { label: "Quantity", key: "quantity" },
    { label: "Price", key: "price" },
    { label: "Total", key: "total" },
  ];
  const text= "Your data is empty!";
  let data = products.map((product, index) => {
    return {
      no: `${index + 1}`,
      item: `${product.title}`,
      quantity: `${product.qty}`,
      price: `${product.price}`,
      total: `${(product.price * product.qty).toFixed(2)}`,
    };
  });
  const totalPrices = products.reduce((pv, cv) => pv + cv.price * cv.qty, 0);
  const printHandle = () => {
    print();
  };
  useEffect(() => {
    return () => {
      data = [];
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>EasyShop | Checkout</title>
      </Helmet>
      <Header />
      <div className="container py-5" style={{minHeight:'100vh'}}>
        {products.length > 0 ? (
          <div className="col-lg-8 mx-auto">
            <h5 className=" d-none d-print-block">EasyShop</h5>
            <p className="text-muted d-none d-print-block">Thanks for shopping with us</p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th className=" text-end">Price</th>
                  <th className=" text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.qty}</td>
                    <td className=" text-end">{item.price.toFixed(2)}</td>
                    <td className=" text-end totalPrice">
                      {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={4} className=" text-end">
                    SubTotal
                  </th>
                  <th className=" text-end">{totalPrices.toFixed(2)}</th>
                </tr>
                <tr>
                  <th colSpan={4} className=" text-end">
                    Tax (5%)
                  </th>
                  <th className=" text-end">
                    {(totalPrices * 0.05).toFixed(2)}
                  </th>
                </tr>
                <tr>
                  <th colSpan={4} className=" text-end">
                    Final Total
                  </th>
                  <th className=" text-end">
                    {(totalPrices + totalPrices * 0.05).toFixed(2)} $
                  </th>
                </tr>
              </tfoot>
            </table>
            <div className=" d-print-none d-flex gap-2">
              <CSVLink
                data={data}
                headers={headers}
                filename={"shopping-data.csv"}
                className="btn btn-sm btn-secondary"
              >
                Export CSV
              </CSVLink>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => printHandle()}
              >
                Print
              </button>
            </div>
          </div>
        ) : (
          <EmptyData img={emptyImg} text={text}/>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
