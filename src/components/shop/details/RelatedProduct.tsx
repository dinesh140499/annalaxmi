import { type JSX } from 'react'
import ReusableSwiper from '../../ReusableSwiper'
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import freeimg from '../../../assets/images/products/freeimg.png'


const starLength = 4;


const slides: JSX.Element[]=Array.from({length:8}).map((_,i)=> <div key={i} className='border border-[#E6E6E6] bg-white rounded-md'>
        <img src={freeimg} className=' pw-full lg:h-full lg:w-full object-cover rounded-md' alt="product" />
        <div className='bg-white py-3 px-2 rounded-b-md'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className='text-[18px] lg:text-md'>Pulses</h1>
                    <p className='font-bold text-[17px] lg:text-sm'>$14.99</p>
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
    </div>)

const RelatedProduct = () => {
    return (
        <div className='max-w-[90%] w-full lg:max-w-[95%] mx-auto lg:relative mb-15'>
            <ReusableSwiper
                slides={slides}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, type: 'bullets' }}
                paginationClass="feature-pagination"
                navigation={false}
                breakpoints={{
                    480: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                options={{
                    speed: 800,
                    grabCursor: true,
                }}
            />
        </div>
    )
}

export default RelatedProduct