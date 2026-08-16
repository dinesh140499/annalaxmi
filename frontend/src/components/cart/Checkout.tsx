import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaShieldAlt, FaTruck, FaArrowRight, FaTicketAlt, FaTrash, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { updateQuantity, removeFromCart, applyCoupon, removeCoupon, type CartItem } from '../../features/cartSlice';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: cartItems, coupon } = useSelector((state: RootState) => state.cart);
    const [couponInput, setCouponInput] = useState('');
    const [couponMsg, setCouponMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = coupon.applied ? coupon.discount : 0;
    const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
    const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const freeDeliveryThreshold = 499;
    const progressToFree = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
    const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        const code = couponInput.trim().toUpperCase();
        if (code === 'GRAINPULSE' || code === 'FARMDIRECT20' || code === 'FREESHIP') {
            dispatch(applyCoupon(code));
            setCouponMsg({ text: `Coupon ${code} applied successfully!`, type: 'success' });
            setCouponInput('');
        } else {
            setCouponMsg({ text: 'Invalid promo code. Try GRAINPULSE, FARMDIRECT20 or FREESHIP', type: 'error' });
        }
    };

    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
        setCouponMsg(null);
    };

    return (
        <div className="py-8 sm:py-12 bg-slate-50/50 min-h-screen">
            <div className="max-w-[95%] mx-auto w-full">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-3">
                    <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Your Harvest Basket</span>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Shopping Cart ({totalCount} {totalCount === 1 ? 'item' : 'items'})
                        </h1>
                    </div>

                    <Link to="/shop" className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group">
                        <span>Continue Shopping</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left: Cart Items Table (8 cols) */}
                        <div className="lg:col-span-8 space-y-6">
                            
                            {/* Free Express Shipping Meter */}
                            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs">
                                <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                                    <span className="font-bold text-slate-800 flex items-center gap-2">
                                        <FaTruck className="text-amber-500" />
                                        <span>Express Doorstep Delivery</span>
                                    </span>
                                    <span className="text-xs font-extrabold text-emerald-800">
                                        {amountNeededForFree === 0 ? "Unlocked!" : `₹${amountNeededForFree.toFixed(0)} away`}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-600 rounded-full transition-all duration-300"
                                        style={{ width: `${progressToFree}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-500 mt-2">
                                    {amountNeededForFree === 0
                                        ? "🎉 Your cart qualifies for FREE Express Delivery (saved ₹49)!"
                                        : `Add ₹${amountNeededForFree.toFixed(0)} of staples to your basket to get FREE 2-hour delivery.`}
                                </p>
                            </div>

                            {/* Items List */}
                            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-xs space-y-4">
                                <div className="divide-y divide-slate-100">
                                    {cartItems.map((item: CartItem) => (
                                        <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            
                                            {/* Image & Title */}
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-slate-50 p-2 flex items-center justify-center shrink-0 border border-slate-100">
                                                    <img src={item.image} className="h-full w-full object-contain" alt={item.name} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                                        Pack Size: <span className="font-semibold text-slate-600">{item.weight}</span>
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs sm:text-sm font-extrabold text-emerald-950">
                                                            ₹{item.price}
                                                        </span>
                                                        <span className="text-xs text-slate-400 line-through">
                                                            ₹{item.originalPrice}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity Counter & Total */}
                                            <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                        className="h-8 w-8 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-l-xl transition cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 text-xs font-black text-slate-900">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                        className="h-8 w-8 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-r-xl transition cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-right min-w-[70px]">
                                                    <div className="text-xs sm:text-sm font-black text-slate-900">
                                                        ₹{(item.price * item.quantity).toFixed(0)}
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                    className="h-8 w-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                                                    aria-label="Remove item"
                                                >
                                                    <FaTrash className="text-xs" />
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right: Order Summary & Coupon (4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* Promo Code Card */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-3">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                    <FaTicketAlt className="text-emerald-800" />
                                    <span>Have a Promo Voucher?</span>
                                </h3>

                                {coupon.applied ? (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-emerald-900 font-bold">
                                            <FaCheck className="text-emerald-700" />
                                            <span>{coupon.code} (-₹{coupon.discount})</span>
                                        </div>
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            placeholder="Try GRAINPULSE or FREESHIP"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none text-slate-800 uppercase font-semibold"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition cursor-pointer shrink-0"
                                        >
                                            Apply
                                        </button>
                                    </form>
                                )}

                                {couponMsg && (
                                    <p className={`text-[11px] font-semibold ${couponMsg.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                                        {couponMsg.text}
                                    </p>
                                )}
                            </div>

                            {/* Summary Card */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                                    Order Summary
                                </h3>

                                <div className="space-y-2.5 text-xs text-slate-600">
                                    <div className="flex justify-between">
                                        <span>Basket Subtotal:</span>
                                        <span className="font-semibold text-slate-900">₹{subtotal.toFixed(0)}</span>
                                    </div>

                                    {discountAmount > 0 && (
                                        <div className="flex justify-between text-amber-700 font-semibold">
                                            <span>Applied Discount:</span>
                                            <span>-₹{discountAmount.toFixed(0)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-emerald-800 font-semibold">
                                        <span>Express 2-Hr Delivery:</span>
                                        <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                                    </div>

                                    <div className="flex justify-between pt-3 border-t border-slate-100 text-sm font-bold text-slate-900">
                                        <span>Total Amount:</span>
                                        <span className="text-lg font-black text-emerald-950">₹{finalTotal.toFixed(0)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to Checkout</span>
                                    <FaArrowRight className="text-xs text-amber-300" />
                                </button>

                                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="text-emerald-700" />
                                        <span>100% Certified Chemical-Free Guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaTruck className="text-emerald-700" />
                                        <span>Guaranteed contactless 2-hr delivery slot</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-100 shadow-xs max-w-lg mx-auto space-y-4">
                        <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800 text-3xl">
                            <HiOutlineShoppingBag />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Your Basket is Currently Empty</h2>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            Looks like you haven't added any fresh harvest items yet. Browse our unpolished staples and heirloom grains.
                        </p>
                        <div className="pt-2">
                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl shadow-md transition"
                            >
                                <span>Browse Catalog</span>
                                <FaArrowRight className="text-xs text-amber-300" />
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Checkout;
