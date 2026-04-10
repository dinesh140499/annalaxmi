import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store';
import { IoClose } from "react-icons/io5";
import dummyImg from '../../assets/images/products/freeimg.png'
import { setButton } from '../../features/commonSlice';
import React from 'react';
import { useNavigate } from 'react-router-dom';


type CardType = {
  productName: string
  image: string,
  price: string | number,
  quantity: string | number,
  quantityType: "Kg" | "Gram" | "Ltr" | "Unit";
}

const ShopCard = () => {
  const navigate = useNavigate()
  const cart = useSelector((state: RootState) => state.common.button.cart);
  const dispatch = useDispatch()

  const handleCart = () => {
    dispatch(setButton({ cart: false }))
    navigate('/shopping-cart')
  }


  return (
    <div
      className={`fixed overflow-hidden h-[100vh] lg:max-w-80 w-full z-50 top-[0%] rounded-l-sm right-0 shadow-lg bg-white py-7 px-3
    transform transition-transform duration-700 ease-in-out
    ${cart ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between">
        <h1 className='lg:text-md font-bold'>Shopping Card (2)</h1>
        <IoClose className='text-lg font-light cursor-pointer' onClick={() => dispatch(setButton({ cart: false }))} />
      </div>
      <div className='mt-5 h-[65vh] lg:h-[60vh] overflow-y-auto'>
        {Array.from({ length: 15 }).map((_, i) =>
          <React.Fragment key={i}>
            <Card image={dummyImg} price={"200.00"} productName='Pulse' quantity={"12"} quantityType={"Kg"} />
          </React.Fragment>
        )}
      </div>
      <div className="py-3 lg:h-[40vh]">
        <div className="flex justify-between items-center   ">
          <span className='capitalize text-sm'>2 Product</span>
          <span className='font-bold'>$26.00</span>
        </div>
        <div className='mt-3'>
          <button className='bg-[#00603A] px-3  py-3 lg:py-3 rounded-lg text-white block w-full text-sm cursor-pointer' onClick={() => { dispatch(setButton({ cart: false })); navigate('/shopping-cart/checkout'); }}>Checkout</button>
          <button onClick={handleCart} className='bg-[#9DCFBB] rounded-full px-3 py-3 lg:py-3 text-[#00603A] block w-full mt-3 text-sm cursor-pointer '>Go To Cart</button>
        </div>
      </div>
    </div>
  )
}

const Card = ({ image, price, productName, quantity, quantityType }: CardType) => {
  return (
    <div className="flex items-center justify-between border-b border-b-[#f3f9fb] py-3 mb-1 cursor-pointer px-3 rounded-lg hover:bg-[#f3f9fb]">
      <div className='flex items-center gap-3'>
        <img src={image} className='h-20 w-25 object-cover' alt="" />
        <div>
          <h1 className='lg:text-[13px]'>{productName}</h1>
          <p className='text-[#808080] lg:text-[14px]'>{quantity} {quantityType} x <span className='text-black font-bold'>{price}</span></p>
        </div>
      </div>
      <button className='h-5 w-5 rounded-full flex items-center justify-center border border-[#CCCCCC] cursor-pointer duration-300 hover:bg-red-500 hover:text-white'>
        <IoClose className='text-lg font-light' />
      </button>
    </div>
  )
}

export default ShopCard