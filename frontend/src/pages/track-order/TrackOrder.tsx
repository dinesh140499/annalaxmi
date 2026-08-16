import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTruck, FaCheckCircle, FaSearch, FaLeaf, FaBoxOpen } from 'react-icons/fa';
import Breadcrumbs from '../../components/reusable/Breadcrumps';
import pulse from '../../assets/images/products/pulse.png';
import grains from '../../assets/images/products/grains.png';

const TrackOrder = () => {
    const { orderId: paramOrderId } = useParams<{ orderId?: string }>();
    const [orderId, setOrderId] = useState(paramOrderId || "GP-89421");
    const [searched, setSearched] = useState(true);

    const orderTimeline = [
        { title: "Order Confirmed & Payment Verified", time: "Today, 10:15 AM", done: true, desc: `Order #${orderId} placed successfully.` },
        { title: "Farm Batch & Lab Quality Passed", time: "Today, 11:30 AM", done: true, desc: "0% chemical residue & moisture check verified." },
        { title: "Packed in Sealed Nitrogen Eco-Bag", time: "Today, 1:45 PM", done: true, desc: "Dispatched from Sarojini Fulfillment Hub." },
        { title: "Out for Express Doorstep Delivery", time: "Estimated 3:30 PM", done: false, active: true, desc: "Delivery partner: Rajiv S. (+91 98765-12345)" },
        { title: "Delivered to Customer", time: "Estimated 4:00 PM", done: false, desc: "OTP verification required upon arrival." },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
    };

    return (
        <div className="bg-slate-50/50 min-h-screen">
            <Breadcrumbs />

            <div className="max-w-[95%] mx-auto py-10 sm:py-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
                        <FaTruck className="text-amber-500" />
                        <span>Live Dispatch Tracker</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Track Your Fresh Harvest Order
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Enter your GrainPulse Order ID or registered mobile number to view live transit progress.
                    </p>

                    {/* Tracker Input Bar */}
                    <form onSubmit={handleSearch} className="mt-6 max-w-md mx-auto flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g. GP-89421)..."
                            className="w-full bg-transparent px-4 text-xs sm:text-sm text-slate-800 outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer shrink-0"
                        >
                            <FaSearch className="text-xs" />
                            <span>Track</span>
                        </button>
                    </form>
                </div>

                {/* Tracking Progress & Order Summary */}
                {searched && (
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Timeline (7 cols) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                                <div>
                                    <span className="text-xs text-slate-400 font-semibold">Order Reference:</span>
                                    <h3 className="text-base font-bold text-slate-900">{orderId}</h3>
                                </div>
                                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                                    <FaLeaf className="text-xs" /> Express 2-Hour In-Transit
                                </span>
                            </div>

                            {/* Step list */}
                            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200">
                                {orderTimeline.map((step, idx) => (
                                    <div key={idx} className="relative">
                                        {/* Step Icon */}
                                        <div className={`absolute -left-6 top-0.5 h-5 w-5 rounded-full flex items-center justify-center text-xs ${
                                            step.done 
                                                ? 'bg-emerald-700 text-white shadow-xs' 
                                                : step.active 
                                                    ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-100 animate-pulse font-bold' 
                                                    : 'bg-slate-200 text-slate-400'
                                        }`}>
                                            {step.done ? <FaCheckCircle className="text-[10px]" /> : idx + 1}
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <h4 className={`text-xs sm:text-sm font-bold ${step.active ? 'text-emerald-900' : 'text-slate-800'}`}>
                                                    {step.title}
                                                </h4>
                                                <span className="text-[11px] text-slate-400 font-medium">{step.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Package Preview (5 cols) */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4">
                                    <FaBoxOpen className="text-emerald-700 text-base" />
                                    <span>Items in this Package</span>
                                </div>

                                <div className="space-y-3 divide-y divide-slate-50">
                                    <div className="flex items-center gap-3 pt-2">
                                        <img src={pulse} className="h-12 w-12 rounded-xl bg-slate-50 p-1 object-contain" alt="Toor Dal" />
                                        <div className="flex-1">
                                            <h5 className="text-xs font-bold text-slate-800">Organic Toor Dal (Unpolished)</h5>
                                            <p className="text-[11px] text-slate-400">1 Kg × ₹165</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <img src={grains} className="h-12 w-12 rounded-xl bg-slate-50 p-1 object-contain" alt="Himalayan Rice" />
                                        <div className="flex-1">
                                            <h5 className="text-xs font-bold text-slate-800">Himalayan Red Rice</h5>
                                            <p className="text-[11px] text-slate-400">1 Kg × ₹210</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 text-xs flex justify-between font-bold text-slate-900">
                                    <span>Total Paid (Online UPI):</span>
                                    <span className="text-emerald-900 font-extrabold text-sm">₹375.00</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950">
                                <strong>Delivery Address:</strong>
                                <p className="text-slate-600 mt-0.5">Plot 42, Block B, Sarojini Nagar, New Delhi - 110023</p>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default TrackOrder;
