import { useState } from "react";
import Pagination from "../../reusable/Pagination";
import { useNavigate } from "react-router-dom";

type RecentOrderType = {
    orderId: number;
    date: string;
    total: number;
    status: "Processing" | "On The Way" | "Completed";
    totalProduct: number;
    viewDetail: () => void;
};

const OrderHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 21;
    const navigate=useNavigate()

    const handleViewDetails = () => {
        navigate('/account/order-history/details')
        // alert(`Viewing details for order #${orderId}`);
    };

    return (
        <div className="rounded-md border border-[#E6E6E6] px-4 py-5">
            <h2 className="text-md font-semibold mb-4">Order History</h2>
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr >
                                <th className="py-2 px-4 uppercase text-sm">Order ID</th>
                                <th className="py-2 px-4 uppercase text-sm">Date</th>
                                <th className="py-2 px-4 uppercase text-sm">Status</th>
                                <th className="py-2 px-4 uppercase text-sm">Total</th>
                                <th className="py-2 px-4 uppercase text-sm text-center">Action</th>
                            </tr>
                        </thead>
                    </table>
                    {/* Scrollable body in a separate container */}
                    <div className="max-h-[80vh] overflow-y-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <tbody>
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <Order
                                        key={i}
                                        orderId={1000 + i}
                                        date="2025-05-25"
                                        status={
                                            i % 3 === 0
                                                ? "Completed"
                                                : i % 2 === 0
                                                    ? "Processing"
                                                    : "On The Way"
                                        }
                                        total={Math.floor(Math.random() * 2000) + 500}
                                        viewDetail={() => handleViewDetails()}
                                        totalProduct={5}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                visibleLimit={10} />
        </div>
    )
};

const Order = ({ date, orderId, status, total, viewDetail, totalProduct }: RecentOrderType) => (
    <tr className="border-b hover:bg-gray-50 ">
        <td className="py-2 px-4 w-1/5">#{orderId}</td>
        <td className="py-2 px-4 w-1/5">{date}</td>
        <td className="py-2 px-4 w-1/5">
            <span
                className={`inline-block  px-2 py-1 text-xs rounded-full font-medium ${status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : status === "On The Way"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-green"
                    }`}
            >
                {status}
            </span>
        </td>
        <td className="py-2 px-4 w-1/5 font-medium text-[#1A1A1A]">₹{total} ({Math.floor(Math.random() * totalProduct)} Products)</td>
        <td className="py-2 px-4 w-1/5 text-center">
            <button
                onClick={viewDetail}
                className="text-sm text-green cursor-pointer hover:underline"
            >
                View Details
            </button>
        </td>
    </tr>
);

export default OrderHistory