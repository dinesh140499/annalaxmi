import { FaStar } from 'react-icons/fa';
import freeimg from '../../assets/images/products/freeimg.png'
import { HiOutlineShoppingBag } from "react-icons/hi";
import Pagination from '../reusable/Pagination';
import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type ProductProps = {
    filterBtnToggle: boolean;
    setFilterBtnToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Product: React.FC<ProductProps> = ({ filterBtnToggle, setFilterBtnToggle }) => {
    const starLength = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 21;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className='text-sm text-[#808080] '> <button className='text-lg lg:sm lg:hidden' onClick={() => setFilterBtnToggle(!filterBtnToggle)}><IoFilter /></button> Sort By : <select name="" id="" className='ms-3 outline-none rounded-md border-[#E6E6E6] border py-2 px-3 '>
                    {['Latest', 'Old']?.map((item, i) => <option key={i}>{item}</option>)}
                </select>
                </h1>
                <h1 className='text-sm font-bold'>52 <span className='text-[#666666] font-normal'>Results Found</span></h1>
            </div>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
                {Array.from({ length: 10 }).map((_, i) =>
                    <Link to={`/categories/${i+1}`} key={i} className='cursor-pointer border border-[#E6E6E6] bg-white rounded-md'>
                        <img src={freeimg} className=' pw-full lg:h-58 lg:w-full object-cover rounded-md' alt="product" />
                        <div className='bg-white py-3 px-2 rounded-b-md'>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className='text-md'>Pulses</h1>
                                    <p className='font-bold text-sm'>$14.99</p>
                                    <div className="lg:flex justify-between items-center">
                                        <div className="flex items-center mt-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`text-[10px] ${i < starLength ? 'text-[#FF8A00]' : 'text-[#CCCCCC]'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center rounded-full bg-[#F2F2F2] h-8 w-8 cursor-pointer duration-75 hover:bg-[#FFD75E] hover:text-white">
                                    <HiOutlineShoppingBag />
                                </div>
                            </div>
                        </div>
                    </Link>)}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                visibleLimit={10} // optional
            />
        </div>
    )
}

export default Product