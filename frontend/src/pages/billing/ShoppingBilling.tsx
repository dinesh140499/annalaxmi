import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/reusable/Breadcrumps";
import { FaCheckCircle, FaLock, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { clearCart, type CartItem } from "../../features/cartSlice";
import { openRazorpayPayment } from "../../components/payment/RazorpayPayment";

const ShoppingBilling = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cartItems, coupon } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = coupon.applied ? coupon.discount : 0;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const [formData, setFormData] = useState({
    firstName: user?.firstname || "",
    lastName: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phoneNo || "",
    street: "",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    paymentMethod: "upi",
    notes: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: prev.firstName || user.firstname || "",
        lastName: prev.lastName || user.lastname || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phoneNo || "",
      }));
    }
  }, [user]);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const completeOrder = () => {
    const orderId = `GP-${Math.floor(10000 + Math.random() * 90000)}`;
    setCreatedOrderId(orderId);
    setOrderPlaced(true);
    navigate(`/order-confirmation/${orderId}`);
    dispatch(clearCart());
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.paymentMethod === "cod") {
      completeOrder();
      return;
    }

    // Online payment via Razorpay
    openRazorpayPayment({
      amount: grandTotal,
      name: "GrainPulse",
      description: "Order Payment",
      customerName: `${formData.firstName} ${formData.lastName}`.trim() || "Customer",
      customerEmail: formData.email || "customer@example.com",
      customerContact: formData.phone || "9876543210",
      themeColor: "#166534",
      onSuccess: () => {
        completeOrder();
      },
    });
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="bg-slate-50/50 min-h-screen">
        <Breadcrumbs />
        <div className="max-w-[95%] mx-auto py-12 sm:py-16">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xs text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800 text-2xl">
              <FaShoppingBag />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Basket is Empty</h2>
            <p className="text-xs text-slate-500">
              Please add items to your harvest basket before proceeding to checkout.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition"
              >
                <span>Browse Organic Catalog</span>
                <FaArrowRight className="text-xs text-amber-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      <div className="max-w-[95%] mx-auto py-8 sm:py-12">
        {orderPlaced ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-lg text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl">
              <FaCheckCircle />
            </div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Order Confirmed</span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Thank You For Choosing GrainPulse!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your order <strong className="text-slate-900 font-bold">#{createdOrderId || "GP-91823"}</strong> has been received and is being prepared for express delivery to <strong className="text-slate-800">{formData.city}</strong>.
            </p>
            <div className="pt-4 space-y-2">
              <Link
                to="/track-order"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition"
              >
                <span>Track Live Order</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                to="/"
                className="w-full inline-block text-xs font-semibold text-slate-600 hover:text-emerald-900 py-2 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Delivery & Address Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Delivery & Billing Information
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Please provide accurate delivery coordinates for your 2-hour harvest dispatch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mobile Phone (for delivery OTP) *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Street Address / Flat / Building *</label>
                  <input
                    type="text"
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="House no, Street name, Landmark"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">City / Region *</label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">State *</label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pincode *</label>
                    <input
                      type="text"
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Order Notes & Delivery Instructions (Optional)</label>
                  <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g., Leave package at security desk or ring the second doorbell"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Order Summary & Payment Selector (5 cols) */}
              <div className="lg:col-span-5 space-y-6">

                {/* Order Review Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Order Items ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                  </h3>

                  <div className="space-y-3 divide-y divide-slate-50 text-xs">
                    {cartItems.map((item: CartItem) => (
                      <div key={item.id} className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={item.image} className="h-10 w-10 object-contain rounded-lg bg-slate-50 p-1 shrink-0" alt="" />
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block truncate">{item.name}</span>
                            <span className="text-slate-400">{item.weight} • ₹{item.price} × {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900 shrink-0 ml-2">₹{(item.price * item.quantity).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-slate-800">₹{subtotal.toFixed(0)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-amber-700 font-semibold">
                        <span>Coupon Discount:</span>
                        <span>-₹{discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Express Shipping (Above ₹499):</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-bold text-slate-900">
                      <span>Grand Total:</span>
                      <span className="text-lg font-extrabold text-emerald-950">₹{grandTotal.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Select Payment Mode
                  </h3>

                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${formData.paymentMethod === 'upi'
                      ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="accent-emerald-700 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold">Instant UPI (Google Pay, PhonePe, Paytm)</div>
                      <div className="text-[11px] text-slate-400">Fastest & contactless payment</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${formData.paymentMethod === 'cod'
                      ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="accent-emerald-700 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold">Cash on Delivery (COD)</div>
                      <div className="text-[11px] text-slate-400">Pay cash or scan QR upon delivery</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${formData.paymentMethod === 'card'
                      ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="accent-emerald-700 h-4 w-4"
                    />
                    <div>
                      <div className="text-xs font-bold">Credit / Debit Card & Net Banking</div>
                      <div className="text-[11px] text-slate-400">Encrypted 256-bit SSL checkout</div>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FaLock className="text-xs text-amber-300" />
                    <span>
                      {formData.paymentMethod === "cod"
                        ? `Place Order (₹${grandTotal.toFixed(0)})`
                        : `Pay Now (₹${grandTotal.toFixed(0)})`}
                    </span>
                  </button>
                </div>

              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShoppingBilling;