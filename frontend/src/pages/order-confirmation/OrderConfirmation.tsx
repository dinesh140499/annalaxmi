import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaArrowRight, FaPrint, FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt } from 'react-icons/fa';
import Breadcrumbs from '../../components/reusable/Breadcrumps';
import pulse from '../../assets/images/products/pulse.png';
import grains from '../../assets/images/products/grains.png';
import oils from '../../assets/images/products/oils.png';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const displayOrderId = orderId || "GP-91823";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      <div className="max-w-[95%] lg:max-w-5xl mx-auto py-8 sm:py-12">
        
        {/* Success Header Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm text-center space-y-4 mb-8">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl sm:text-4xl shadow-inner">
            <FaCheckCircle />
          </div>

          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3.5 py-1 rounded-full">
            <FaLeaf className="text-amber-500 text-xs" />
            <span>Order Placed Successfully</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank You For Choosing 100% Pure Organic!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Your harvest order <strong className="text-slate-900 font-bold">#{displayOrderId}</strong> has been registered with our farm fulfillment hub. We have dispatched a confirmation SMS and invoice receipt to your phone and email.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/track-order`}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm shadow-md transition"
            >
              <FaTruck className="text-amber-300" />
              <span>Track Live Delivery Progress</span>
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-2xl text-xs sm:text-sm transition cursor-pointer"
            >
              <FaPrint className="text-slate-500" />
              <span>Print Tax Invoice</span>
            </button>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 py-3 px-4 transition"
            >
              <span>Continue Shopping</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* Itemized Order & Delivery Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Order Items (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Itemized Harvest Summary</h2>
                <p className="text-xs text-slate-400">Freshly packaged under nitrogen seal</p>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                3 Items
              </span>
            </div>

            <div className="space-y-4 divide-y divide-slate-100 text-xs">
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-3">
                  <img src={pulse} className="h-12 w-12 object-contain bg-slate-50 rounded-xl p-1" alt="" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Organic Toor Dal (Unpolished)</span>
                    <span className="text-slate-500">2 × 1 Kg • Farm Code #AP-412</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">₹330.00</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-3">
                  <img src={grains} className="h-12 w-12 object-contain bg-slate-50 rounded-xl p-1" alt="" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Himalayan Red Rice (Single Origin)</span>
                    <span className="text-slate-500">1 × 1 Kg • Uttarakhand Origin</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">₹210.00</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-3">
                  <img src={oils} className="h-12 w-12 object-contain bg-slate-50 rounded-xl p-1" alt="" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Cold-Pressed Mustard Oil</span>
                    <span className="text-slate-500">1 × 1 Litre • Wood Churned</span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">₹175.00</span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">₹715.00</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Express 2-Hour Delivery:</span>
                <span>FREE (Eligible over ₹499)</span>
              </div>
              <div className="flex justify-between">
                <span>Applied Taxes & FSSAI Cess:</span>
                <span>₹0.00 (Inclusive)</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100 text-sm font-bold text-slate-900">
                <span>Total Paid:</span>
                <span className="text-lg font-extrabold text-emerald-950">₹715.00</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Delivery Details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-500" />
                <span>Delivery Address</span>
              </h3>

              <div className="text-xs text-slate-700 space-y-1">
                <p className="font-bold text-slate-900">Ramesh Kumar</p>
                <p>Plot 42, Block B, Main Market</p>
                <p>Sarojini Nagar, New Delhi - 110023</p>
                <div className="flex items-center gap-1.5 pt-1 text-slate-500 font-medium">
                  <FaPhoneAlt className="text-[10px] text-emerald-700" />
                  <span>+91 98765-43210</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-3 text-xs text-emerald-900 border border-emerald-100 flex items-center gap-2.5">
                <FaShieldAlt className="text-base text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold block">Estimated Arrival</span>
                  <span className="text-[11px] text-emerald-800">Today between 3:30 PM – 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-3 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Payment Mode
              </h3>
              <div className="flex items-center justify-between text-slate-700">
                <span>Method:</span>
                <span className="font-bold text-emerald-800">Instant UPI Payment</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Payment Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                  Verified & Paid
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Transaction Ref:</span>
                <span className="font-mono text-slate-500">TXN-UPI-9082348</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
