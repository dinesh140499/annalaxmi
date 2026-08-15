import { FaStar } from "react-icons/fa";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Highlights = () => {
    return (
        <section className='pt-10'>
            <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
                <div className="lg:flex items-center gap-5">
                    <div className="hidden lg:inline-block lg:max-w-[40%] w-full mx-auto h-[2px] bg-[#00603A] border-[#00603A]"></div>
                    <h1 className=" text-green font-bold text-lg pb-2 lg:text-start">When health is organic</h1>
                    <div className="max-w-[55%] lg:max-w-[40%] w-full lg:mx-auto h-[2px] bg-[#00603A] border-[#00603A]"></div>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
                    <div className="text-center">
                        <FaStar className="block mx-auto text-green text-5xl text-center " />
                        <h1 className="mt-1 text-lg">Top Rank Farms</h1>
                        <p className="text-sm px-3"> farm-fresh produce to bring quality and health to your family's table, every day.</p>
                    </div>
                    <div className="text-center">
                        <BsFillPatchCheckFill className="block mx-auto text-green text-5xl text-center " />
                        <h1 className="mt-1 text-lg">Organic Certified</h1>
                        <p className="text-sm px-3"> Guaranteed pure, naturally grown products for a healthier, chemical-free lifestyle.</p>
                    </div>
                    <div className="text-center">
                        <FaShippingFast className="block mx-auto text-green text-5xl text-center " />
                        <h1 className="mt-1 text-lg">Fast Delivery</h1>
                        <p className="text-sm px-3"> Fresh groceries at your doorstep in no time, ensuring convenience without the wait!</p>
                    </div>
                    <div className="text-center">
                        <IoCheckmarkDoneSharp className="block mx-auto text-green text-5xl text-center " />
                        <h1 className="mt-1 text-lg">Trusted Products</h1>
                        <p className="text-sm px-3"> Handpicked, high-quality items you can rely on for your family's well-being </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Highlights