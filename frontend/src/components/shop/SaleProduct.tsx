import { FaStar } from 'react-icons/fa';

const SaleProduct = () => {
  const starLength = 4; // Example rating value, can be dynamic

  return (
    <div className="mb-2 ">
      <div className="flex border-white rounded-sm mt-3 py-3 px-2 hover:border-[#20B52652] hover:shadow hover:rounded-sm">
        {/* <img src="" alt="Red Capsicum" className="w-24 h-24 object-cover mr-4" /> */}
        <div>
          <h1 className="text-[#4D4D4D] text-sm">Red Capsicum</h1>
          <p className="text-sm text-[#999999]">
            <span className="text-[#1A1A1A] font-bold text-lg">$32.00 &nbsp;</span>$20.99
          </p>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-[12px] ${
                  i < starLength ? 'text-[#FF8A00]' : 'text-[#CCCCCC]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleProduct;
