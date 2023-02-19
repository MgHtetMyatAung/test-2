import React from "react";

const EmptyData = ({img,text}) => {
  return (
    <div className=" text-center text-muted pt-5">
      <img src={img} alt="empty-image" style={{ width: "150px" }} />
      <p>{text}</p>
    </div>
  );
};

export default EmptyData;
