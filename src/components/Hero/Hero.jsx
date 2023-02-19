import React from 'react';
import shirtImg from "../../assets/shirt.png";

const Hero = () => {
  return (
    <div className='container py-5' style={{minHeight:'50vh'}}>
      <div className="row flex-column-reverse flex-lg-row">
        <div className="col-12 col-lg-6">
            <div className="w-100 h-100 d-flex flex-column justify-content-center">
                <p className=' fs-3'>Enjoy Your Life With Shopping</p>
                <p className='m-0 text-black-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sint? Eveniet explicabo asperiores maiores architecto nam!</p>
                <button className='btn btn-sm btn-primary mt-3' style={{width:'110px'}}>
                    Buy Now <i className="bi bi-cart-fill"></i>
                </button>
            </div>
        </div>
        <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-center">
                <img src={shirtImg} alt="" className='' style={{height:'50vh'}}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
