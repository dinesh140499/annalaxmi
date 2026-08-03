import { useState } from 'react'
import dummyImg from '../../assets/images/products/freeimg.png'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';




const Checkout = () => {
    const [cartItems, setCartItems] = useState([
        { productName: "Pulses", price: 14, quantity: 1 },
        { productName: "Pulses", price: 14, quantity: 1 },
        { productName: "Pulses", price: 14, quantity: 1 },
        { productName: "Pulses", price: 14, quantity: 1 },
        { productName: "Pulses", price: 14, quantity: 1 },
    ]);

    const shipping = 5;
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + shipping;

    const handleQuantityChange = (index: number, newQty: number) => {
        const updated = [...cartItems];
        updated[index].quantity = newQty;
        setCartItems(updated);
    };

    return (
        <div className='max-w-[95%] w-full mx-auto lg:relative'>
            <h1 className='capitalize text-[#00603A] font-bold text-lg py-3 pt-5'>My Shopping Cart</h1>

            <div className="lg:flex gap-3">
                <div className='lg:flex-1/2'>
                    <div className={`${cartItems.length > 4 ? 'max-h-[400px] overflow-y-auto' : ''} relative`}>
                        <table className="table-fixed w-full text-center border border-[#E6E6E6] rounded-lg">
                            <thead className="bg-white sticky top-0 z-10">
                                <tr>
                                    {["Product", "Price", "Quantity", "Subtotal", ""].map((item, i) => (
                                        <th key={i} className={`text-[#808080] text-sm uppercase py-3 px-4 border-b font-light border-[#E6E6E6] w-1/5 ${i === 0 ? 'text-left' : ''}`}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <CardDetails
                                        key={index}
                                        price={item.price}
                                        productImg={dummyImg}
                                        quantity={item.quantity}
                                        subTotal={item.price * item.quantity}
                                        productName={item.productName}
                                        onQuantityChange={(newQty) => handleQuantityChange(index, newQty)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='flex justify-between items-center pt-4 pb-4 border border-[#E6E6E6] px-3 mb-4'>
                        <button className='text-sm bg-[#F2F2F2] px-5 py-3 rounded-3xl text-[#4D4D4D] font-bold'>
                            Return To Shop
                        </button>
                        <button className='text-sm bg-[#F2F2F2] px-5 py-3 rounded-3xl text-[#4D4D4D] font-bold'>
                            Update Cart
                        </button>
                    </div>
                </div>

                <div className="lg:flex-1/4">
                    <CardTotal shipping={shipping} subtotal={subtotal} total={total} />
                </div>
            </div>
        </div>
    );
};





type CartDetailsType = {
    productName: string
    productImg: string
    price: number
    quantity: number
    subTotal: number
    onQuantityChange: (val: number) => void
}

type CardTotalProps = {
    subtotal: number
    shipping: number
    total: number
}

const CardDetails = ({ price, productImg, quantity, productName, onQuantityChange }: CartDetailsType) => {
    const subtotal = price * quantity;

    return (
        <>
            {/* Desktop (table row) */}
            <tr className='hidden lg:table-row border-b border-[#E6E6E6]'>
                <td className='py-4 px-4 text-left'>
                    <div className="flex items-center gap-3">
                        <img className='h-20 w-20' src={productImg} alt="Product" />
                        <p className='text-md'>{productName}</p>
                    </div>
                </td>
                <td className='py-4 px-4'>${price}</td>
                <td className='py-4 px-4'>
                    <div className="rounded-full py-1 px-3 border border-[#E6E6E6] w-fit flex items-center justify-center mx-auto gap-3">
                        <button
                            className='h-7 w-7 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] text-[#666] text-3xl hover:bg-[#666] hover:text-white'
                            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
                        >-</button>
                        <p>{quantity}</p>
                        <button
                            className='h-7 w-7 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] text-[#666] text-2xl hover:bg-[#666] hover:text-white'
                            onClick={() => onQuantityChange(quantity + 1)}
                        >+</button>
                    </div>
                </td>
                <td className='py-4 px-4'>${subtotal.toFixed(2)}</td>
                <td className='py-4 px-4'>
                    <button className='h-7 w-7 rounded-full flex items-center justify-center border border-[#CCCCCC] text-[#333] hover:bg-red-500 hover:text-white duration-300 mx-auto cursor-pointer'>
                        <IoClose className='text-lg' />
                    </button>
                </td>
            </tr>

            {/* Mobile (card layout) */}
            <div className="lg:hidden border-b border-[#E5E5E5] pb-4 mb-4">
                <div className="flex items-center gap-4 mb-3">
                    <img src={productImg} alt="Product" className="w-20 h-20 object-cover" />
                    <div>
                        <p className="font-semibold text-md">{productName}</p>
                        <p className="text-sm text-[#4D4D4D]">Price: ${price}</p>
                        <p className="text-sm text-[#4D4D4D]">Subtotal: ${subtotal.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <button
                            className='h-7 w-7 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] text-[#666] text-2xl hover:bg-[#666] hover:text-white'
                            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
                        >-</button>
                        <p>{quantity}</p>
                        <button
                            className='h-7 w-7 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] text-[#666] text-2xl hover:bg-[#666] hover:text-white'
                            onClick={() => onQuantityChange(quantity + 1)}
                        >+</button>
                    </div>
                    <button className='h-7 w-7 rounded-full flex items-center justify-center border border-[#CCC] text-[#333] hover:bg-red-500 hover:text-white duration-300'>
                        <IoClose className='text-lg' />
                    </button>
                </div>
            </div>
        </>
    );
};



const CardTotal = ({ shipping, subtotal, total }: CardTotalProps) => {
    const navigate = useNavigate()

    const handleCardTotal = () => {
        navigate('checkout')
    }

    return (
        <div className='border border-[#E6E6E6] py-3 px-3 mb-4 rounded-sm'>
            <h1 className='text-md font-bold mb-1'>Cart Total</h1>
            <ul>
                <li className='border-b py-3 border-[#E5E5E5] flex justify-between'>
                    <h1 className='text-sm text-[#4D4D4D]'>Subtotal</h1>
                    <b className='text-sm'>${subtotal.toFixed(2)}</b>
                </li>
                <li className='border-b py-3 border-[#E5E5E5] flex justify-between'>
                    <h1 className='text-sm text-[#4D4D4D]'>Shipping</h1>
                    <b className='text-sm'>${shipping.toFixed(2)}</b>
                </li>
                <li className='py-3 flex justify-between'>
                    <h1 className='text-sm text-[#4D4D4D]'>Total</h1>
                    <b className='text-sm'>${total.toFixed(2)}</b>
                </li>
            </ul>
            <button onClick={handleCardTotal} className='py-3 w-full rounded-lg cursor-pointer mt-5 text-md bg-[#00603A] duration-75 text-white border border-[#00603A] hover:bg-transparent hover:text-[#00603A] font-bold'>
                Proceed To Checkout
            </button>
        </div>
    )
}


export default Checkout
