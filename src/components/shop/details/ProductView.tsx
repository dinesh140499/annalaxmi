import { useState, type JSX } from 'react';
import img1 from '../../../assets/images/products/freeimg.png'
import img2 from '../../../assets/images/products/grains.png'
import { FaInstagram, FaLinkedinIn, FaStar, FaTwitter } from 'react-icons/fa';
import logo from '../../../assets/project-logo.png'
import { FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Divider from '../../reusable/Divider';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setButton } from "../../../features/commonSlice";

let arrImg: string[] = [img1, img2, img1, img2]


type SocialType = {
    name: string;
    link: string;
    icon: JSX.Element;
};

type TagsType = {
    name: string,
    link: string
}

const tags: TagsType[] = [{
    name: 'Vegetables',
    link: 'vegetables'
},
{
    name: 'Healthy',
    link: 'healthy'
},
{
    name: 'Chinese',
    link: 'chinese'
},
{
    name: 'Cabbage',
    link: 'cabbage'
},
{
    name: 'Green',
    link: 'green'
},
{
    name: 'Cabbage',
    link: 'cabbage'
}]

// This enforces exactly 4 items in the array
let socialLinks: [SocialType, SocialType, SocialType, SocialType] = [
    {
        name: "facebook",
        link: "https://facebook.com",
        icon: <FaFacebookF />
    },
    {
        name: "instagram",
        link: "https://instagram.com",
        icon: <FaInstagram />
    },
    {
        name: "twitter",
        link: "https://twitter.com",
        icon: <FaTwitter />
    },
    {
        name: "linkedin",
        link: "https://linkedin.com",
        icon: <FaLinkedinIn />
    }
];

const ProductView = () => {
    const [mainImage, setMainImage] = useState<string>(img1);
    const [stockItem, setStockItem] = useState<number>(1)
    const dispatch = useDispatch()

    const handleImage = (img1: string) => {
        setMainImage(img1)
    }

    const handleCart = () => {
        dispatch(setButton({ cart: true }))
    }


    return (
        <div className='py-5'>
            <div className="lg:flex">
                <div className="flex-1">
                    <div className="flex items-center flex-col-reverse lg:flex-row">
                        <div className="flex gap-3 mt-5 lg:mt-0 lg:gap-0 lg:flex-col">
                            {arrImg.map((item, i) => <div key={i} className='h-20 w-20 mb-2'>
                                <img src={item} className={`rounded-sm h-full w-full object-cover cursor-pointer duration-75 ${item === mainImage && 'shadow-lg border-2 border-[#006039] scale-[1.1]'}`} alt="product" onMouseOver={() => handleImage(item)} />
                            </div>)}
                        </div>
                        <div className='lg:ms-15'>
                            <img src={mainImage} className='h-96 w-96 max-w-none  rounded-sm object-cover lg:max-w-none' alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className='mb-3'>
                        <h1 className='text-green font-bold text-lg mt-5 lg:mt-0 lg:text-lg'>Pulses <span className='font-normal  bg-[#9DCFBB] p-1 rounded-sm ms-1 text-[13px]  lg:text-[12px]'>In Stock</span></h1>
                    </div>
                    <div className='flex items-center gap-3 '>
                        <div className='flex items-center gap-1'>
                            {Array.from({ length: 5 }).map((_, i) =>
                                <FaStar key={i} className='text-[#FF8A00] text-[13px]' />
                            )}
                            <span className='capitalize text-[15px] lg:text-[12px] text-[#666666]'>4 Review</span>
                        </div>
                        <span>.</span>
                        <div>
                            <span className='text-[15px] lg:text-[12px] text-[#666666]'><b>SKU:</b> 2,51,594</span>
                        </div>
                    </div>
                    <p className='text-[#B3B3B3] mt-3 flex items-center '>$48.00 <span className='text-2xl lg:text-lg font-bold text-green ms-1'>$17.28</span> <span className='inline-block bg-[#EA4B481A] text-[#EA4B48] rounded-full p-1 font-bold ms-3  lg:text-[11px]'>64% Off</span></p>

                    <Divider />
                    <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className='text-sm'>Brand:</h1>
                            <div className='rounded-sm p-[2px] h-12 w-12 flex items-center justify-center border border-[#E6E6E6]'>
                                <img src={logo} className='h-full w-full object-contain' alt="logo" />
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <h1 className='text-sm mr-2'>Share Item: </h1>
                            <div className="flex items-center">
                                {socialLinks?.map((items, i) =>
                                    <Link className='flex items-center justify-center w-8 h-8 duration-75  hover:text-white hover:bg-[#006039] rounded-full cursor-pointer text-lg text-[#4D4D4D]' to={items.link} target='_blank' title={items.name} key={i}>
                                        {items.icon}
                                    </Link>)}
                            </div>
                        </div>
                    </div>
                    <p className='text-md lg:text-sm text-[#808080] mt-3'>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar. </p>
                    <Divider />

                    <div className="flex items-center gap-3 mt-5">
                        {/* Stock Item */}
                        <div className="rounded-full py-1 px-3 border border-[#E6E6E6] w-fit flex items-center gap-3">
                            <button className='h-7 w-7 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] duration-75 text-[#666666] text-3xl hover:bg-[#666666] hover:text-white' onClick={() => stockItem >= 2 && setStockItem(stockItem - 1)}>-</button>
                            <p>{stockItem}</p>
                            <button className='h-7 w-7 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] duration-75 text-[#666666] text-2xl hover:bg-[#666666] hover:text-white' onClick={() => setStockItem(stockItem + 1)}>+</button>
                        </div>
                        {/* Button */}
                        <button onClick={handleCart} className=' bg-[#FFD75E] rounded-sm w-full flex items-center justify-center gap-1  py-2 font-bold cursor-pointer border border-[#FFD75E] hover:bg-[white] lg:text-sm'>Add To Cart <HiOutlineShoppingBag className='text-lg' /></button>
                        {/* Wishlist */}
                        <button className="group duration-75 cursor-pointer rounded-full p-2 text-sm bg-[#9DCFBB] hover:bg-[#00603A] active:bg-[#004D30]">
                            <FaRegHeart className="text-[#00603A] text-lg duration-75 group-hover:text-white active:text-md" />
                        </button>
                    </div>

                    <Divider />
                    <div>
                        <h1 className='lg:text-[13px] font-bold'>Category: <span className='text-[#808080] font-medium lg:text-[13px] '>Vegetables</span></h1>
                    </div>
                    <div>
                        <h1 className='lg:text-[13px] font-bold mt-1'>Tags: {tags.map((tag, i) => <Link to={tag.link} key={i} className='text-[#808080]  font-medium capitalize mx-1 cursor-pointer border-b border-white inline-block hover:border-black hover:text-black lg:text-[13px]'>{tag.name}</Link>)}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView