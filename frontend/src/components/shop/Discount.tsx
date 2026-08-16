import React from 'react';
import discountImg from '../../assets/images/veg.jpg';
import { FaLeaf } from 'react-icons/fa';

type Props = {
  discount: string;
};

const Discount: React.FC<Props> = ({ discount }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm w-full h-52 group">
      <img
        src={discountImg}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        alt="GrainPulse Harvest Discount"
      />

      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent flex flex-col items-center justify-end p-5 text-white text-center">
        <div className="inline-flex items-center gap-1 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
          <FaLeaf className="text-xs" />
          <span>Harvest Special</span>
        </div>
        <h3 className="text-xl font-bold">
          <span className="text-amber-400 font-extrabold">{discount} OFF</span>
        </h3>
        <p className="text-xs text-emerald-100/90 mt-0.5">Use Code: <strong className="text-amber-300">GRAINPULSE</strong></p>
      </div>
    </div>
  );
};

export default Discount;
