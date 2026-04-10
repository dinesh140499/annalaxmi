import React from 'react';
import discountImg from '../../assets/images/veg.jpg';

type Props = {
  discount: string;
};

const Discount: React.FC<Props> = ({ discount }) => {
  return (
    <div className="relative rounded overflow-hidden shadow-md w-full h-48">
      <img
        src={discountImg}
        className="w-full h-full object-cover"
        alt="discount"
      />

      {/* Centered overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-400">{discount}</span> Discount
        </h1>
        <p className="text-sm">on your first order</p>
      </div>
    </div>
  );
};

export default Discount;
