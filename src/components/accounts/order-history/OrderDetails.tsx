import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";


const OrderDetails = () => {
    return (
        <div className="rounded-md border border-[#E6E6E6] ">
            {/* Heading */}
            <div className="flex items-center justify-between gap-5 px-4 border-b border-[#E5E5E5] w-full">
                <div className="flex items-center gap-5 px-4 py-5 border-b border-[#E5E5E5]">
                    <h1 className="text-md font-bold">Order Details</h1>
                    <ul className="flex gap-3 items-center text-sm text-[#4D4D4D]">
                        <li className="text-xl leading-none">•</li>
                        <li className="decoration-2">April 24, 2021</li>
                        <li className="text-xl leading-none">•</li>
                        <li className="decoration-2">3 Products</li>
                    </ul>
                </div>
                <Link to={'/'} className="text-sm text-green cursor-pointer font-semibold">Back To List</Link>
            </div>

            {/* Address Section */}
            <div className="lg:flex gap-5 lg:px-4 lg:py-5">
                {/* Address Table */}
                <div className="flex-1 border border-[#E6E6E6] rounded-md">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="uppercase text-[#999999] text-sm font-light border-b py-3 border-r border-[#E6E6E6] w-1/2 ps-3">Billing Address</th>
                                <th className="uppercase text-[#999999] text-sm font-light border-b py-3 pl-4 border-[#E6E6E6] w-1/2">Shipping Address</th>
                                <th className="uppercase text-[#999999] text-sm font-light border-b py-3 pl-4 border-[#E6E6E6] w-1/2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* Billing Address */}
                                <td className="border-r border-[#E6E6E6] pr-4 align-top">
                                    <div className="py-3 ps-3">
                                        <h1 className="font-semibold">Dainne Russell</h1>
                                        <p className="text-[#666666] text-sm mt-1">4140 Parker Rd. Allentown, New Mexico 31134</p>
                                    </div>
                                    <div className="py-3 ps-3">
                                        <h1 className="text-[#999999] text-[13px] uppercase">Email</h1>
                                        <p className="text-[#1A1A1A] text-sm mt-1">dainne.ressell@gmail.com</p>
                                    </div>
                                    <div className="py-1 ps-3 pb-5">
                                        <h1 className="text-[#999999] text-[13px] uppercase">Phone</h1>
                                        <p className="text-[#1A1A1A] text-sm mt-1">(671) 555-0110</p>
                                    </div>
                                </td>

                                {/* Shipping Address */}
                                <td className="pl-4 align-top">
                                    <div className="py-3">
                                        <h1 className="font-semibold">Dainne Russell</h1>
                                        <p className="text-[#666666] text-sm mt-1">4140 Parker Rd. Allentown, New Mexico 31134</p>
                                    </div>
                                    <div className="py-3">
                                        <h1 className="text-[#999999] text-[13px] uppercase">Email</h1>
                                        <p className="text-[#1A1A1A] text-sm mt-1">dainne.ressell@gmail.com</p>
                                    </div>
                                    <div className="py-1 pb-5">
                                        <h1 className="text-[#999999] text-[13px] uppercase">Phone</h1>
                                        <p className="text-[#1A1A1A] text-sm mt-1">(671) 555-0110</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Summary Section */}
                <div className="w-1/3 border border-[#E6E6E6] rounded-md px-4 py-3">
                    {/* Heading */}
                    <div className="pb-3 border-b border-[#E6E6E6] mb-3 flex justify-between">
                        <h1 className="text-[13px]  mb-1 text-[#999999] uppercase font-light">Order ID: <span className="font-medium text-[#4D4D4D] block capitalize">#123456</span></h1>
                        <h1 className="text-[13px]  text-[#999999] uppercase font-light">Payment Method: <span className="font-medium  block text-[13px] capitalize text-[#1A1A1A]">Paypal</span></h1>
                    </div>

                    {/* Subtotal + Contact */}
                    <div className="border-b border-[#E6E6E6] py-3 flex justify-between items-center">
                        <h1 className="text-[#999999] text-[13px] ">Subtotal:</h1>
                        <p className="text-[#1A1A1A] text-sm ">$365.00</p>
                    </div>
                    <div className="border-b border-[#E6E6E6] py-3 flex justify-between items-center">
                        <h1 className="text-[#999999] text-[13px] ">Discount</h1>
                        <p className="text-[#1A1A1A] text-sm">20%</p>
                    </div>
                    <div className="border-b border-[#E6E6E6] py-3 flex justify-between items-center">
                        <h1 className="text-[#999999] text-[13px] ">Phone</h1>
                        <p className="text-[#1A1A1A] text-sm">Free</p>
                    </div>
                    <div className=" py-3 flex justify-between items-center">
                        <h1 className="text-[Total] text-[16px] font-semibold">Total</h1>
                        <p className="text-[#1A1A1A] text-sm text-green text-green text-[16px] font-semibold">$84.00</p>
                    </div>
                </div>
            </div>

            {/* Status */}
            <Status currentStep={2} />

            {/* Product Total */}
            <ProductTotal />
        </div>
    );
};

type StatusProps = {
    currentStep: number;
};

const Status = ({ currentStep }: StatusProps) => {
    const steps = ["Order Received", "Processing", "Shipped", "Delivered"];

    return (
        <div className="px-4 py-6">
            <div className="relative flex justify-between items-center">
                {/* Progress bar background */}
                <div
                    className="absolute top-5 h-1 bg-[#f2f2f2] z-0 rounded-md"
                    style={{
                        left: 'calc(12.5%)',
                        width: '75%',
                    }}
                />

                {/* Progress bar fill */}
                <div
                    className="absolute top-5 h-1 bg-green z-10 rounded-md transition-all duration-300"
                    style={{
                        left: 'calc(12.5%)',
                        width: `${((currentStep - 1) / (steps.length - 1)) * 75}%`,
                    }}
                />

                {/* Step Indicators */}
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    return (
                        <div key={index} className="relative z-20 flex flex-col items-center w-1/4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isCompleted
                                ? 'bg-green text-white'
                                : 'bg-white border border-dashed border-[#00603a] text-[#00603a]'
                                }`}>
                                {isCompleted ? <FaCheck className="text-sm" /> : `0${index + 1}`}
                            </div>
                            <p className={`text-sm mt-2 text-center ${isCompleted ? 'text-green' : 'text-[#666]'}`}>
                                {step}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};




const ProductTotal = () => {
    const totalPages = 2;
    return (
        <div className="min-w-[800px]">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr >
                        <th className="py-2 px-4 uppercase text-sm w-1/4">Product</th>
                        <th className="py-2 px-4 uppercase text-sm w-1/4">Price</th>
                        <th className="py-2 px-4 uppercase text-sm w-1/4">Quantity</th>
                        <th className="py-2 px-4 uppercase text-sm w-1/4">Subtotal</th>
                    </tr>
                </thead>
            </table>
            {/* Scrollable body in a separate container */}
            <div className="max-h-[80vh] overflow-y-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <tbody>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <Product
                                key={i}
                                productName={`Pulse ${i}`}
                                price={343}
                                quantity={23}
                                subTotal={343 + 23}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

type ProductType = {
    productName: string;
    price: number;
    quantity: number;
    subTotal: number;
};


const Product = ({ productName, price, quantity, subTotal }: ProductType) => (
    <tr className="border-b hover:bg-gray-50 ">
        <td className="py-2 px-4 w-1/4">{productName}</td>

        <td className="py-2 px-4 w-1/4 font-medium text-[#1A1A1A] ">₹{price}</td>
        <td className="py-2 px-4 w-1/4 font-medium text-[#1A1A1A] ">₹{quantity} </td>
        <td className="py-2 px-4 w-1/4 font-medium text-[#1A1A1A]">₹{subTotal} </td>

    </tr>
);

export default OrderDetails;
