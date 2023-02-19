import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_CARD } from "../../services/cardSlice";

const ProductCard = ({item}) => {
  const dispatch = useDispatch();
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <div className="card-body overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="d-block mx-auto"
            style={{ height: "100px", width: "auto", objectPosition: "center" }}
          />
          <p className=" text-truncate mb-0 mt-2">{item.title}</p>
          <p className="small text-black-50 my-1">
            {item.description.substring(0, 25)} ...
          </p>
        </div>
        <div className=" card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">$ {item.price}</p>
            <button className="btn btn-sm btn-primary" onClick={()=>dispatch(ADD_TO_CARD(item))}>Add to Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
