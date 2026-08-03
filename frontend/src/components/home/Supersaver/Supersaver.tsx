import pulse from "../../../assets/images/products/pulse.png";
import { MdKeyboardArrowRight } from "react-icons/md";

const FeaturedProducts = () => {

  return (
    <section className="pt-10 lg:pt-20">
      <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex justify-between w-full">
              <div className="w-fit">
                <h1 className="text-green font-bold text-lg pb-2">Supersaver Up to 50% off</h1>
                <div className="border-b-[2px] border-[#00603A]"></div>
              </div>
              <button className="text-sm flex items-center cursor-pointer">View All <MdKeyboardArrowRight className="text-lg"/></button>
            </div>
          </div>
          <div className="relative mt-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="relative">
                  <div className="h-[150px] w-full">
                    <img
                      src={pulse}
                      className="rounded-t-lg rounded-r-lg h-full w-full object-cover"
                      alt={`category`}
                    />
                    <p className="absolute right-0 top-0 bg-[#00603A] w-[50px] text-center rounded-tr-lg rounded-bl-lg text-white text-sm px-2 py-2">40% OFF</p>
                  </div>
                  <div className="border border-[#EDEDED]">
                    <h1 className="text-sm mt-1 mb-1 text-left  px-2">Hen Fruit White Protein Rich Eggs</h1>
                    <div>
                      <div className="flex items-center justify-between mt-3 border-t border-[#EDEDED] py-2 px-2">
                        <p className="text-md">₹165</p>
                        <p className="text-sm line-through text-[#222222]">₹99</p>
                        <button className="w-[70px] border border-[#00603A] flex items-center justify-center text-[#00603A] gap-1 py-1 rounded-sm cursor-pointer"> Add</button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
