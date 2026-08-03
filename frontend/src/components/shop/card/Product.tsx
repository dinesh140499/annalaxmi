// ProductCard.tsx
import { FaStar } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';

interface ProductCardProps {
    image: string;
    title: string;
    price: string;
    rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, rating }) => {
    return (
        <div className='border border-[#E6E6E6] bg-white rounded-md'>
            <img src={image} className='w-full lg:h-full lg:w-full object-cover rounded-md' alt={title} />
            <div className='bg-white py-3 px-2 rounded-b-md'>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className='text-md'>{title}</h1>
                        <p className='font-bold text-sm'>{price}</p>
                        <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`text-[10px] ${i < rating ? 'text-[#FF8A00]' : 'text-[#CCCCCC]'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center rounded-full bg-[#F2F2F2] h-8 w-8 cursor-pointer duration-75 hover:bg-[#FFD75E] hover:text-white">
                        <HiOutlineShoppingBag />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
