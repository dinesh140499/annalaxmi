import Breadcrumbs from '../../components/reusable/Breadcrumps';
import { FaTruck, FaClock, FaBoxOpen, FaShieldAlt, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';

const ShippingPolicy = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      <div className="max-w-[95%] lg:max-w-4xl mx-auto py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
            <FaTruck className="text-amber-500" />
            <span>Express Delivery & Packaging</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Shipping & Dispatch Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Last Updated: August 2026 • GrainPulse Pure Essentials
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaClock className="text-emerald-800" />
              <span>1. Express 2-Hour Delivery Promise</span>
            </h2>
            <p>
              We operate localized farm-fulfillment hubs across key metropolitan clusters. Orders placed before 7:00 PM for eligible pin codes are picked, packed in nitrogen-sealed eco pouches, and delivered to your doorstep within <strong>2 hours</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaBoxOpen className="text-emerald-800" />
              <span>2. Delivery Charges & Free Shipping Threshold</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Orders ₹499 and above:</strong> 100% FREE Express Delivery.</li>
              <li><strong>Orders below ₹499:</strong> A nominal nominal logistics fee of ₹49 is charged to cover climate-neutral transport.</li>
              <li>No surge pricing or hidden rain fees are ever applied.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaLeaf className="text-emerald-800" />
              <span>3. Sustainable Eco-Sealed Packaging</span>
            </h2>
            <p>
              To maintain farm freshness without chemical preservatives, our unpolished pulses and millets are flushed with food-grade nitrogen in 100% biodegradable multilayer paper pouches. Cold-pressed oils are shipped in UV-protected glass bottles or food-grade tin containers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-800" />
              <span>4. Real-Time Transit Tracking</span>
            </h2>
            <p>
              Once your harvest order is dispatched, you will receive an SMS and WhatsApp notification containing a live GPS tracking link. You can also track your status anytime at our <a href="/track-order" className="text-emerald-800 font-bold hover:underline">Live Track Order</a> page.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaShieldAlt className="text-emerald-800" />
              <span>5. Safe Delivery & Contactless Handoff</span>
            </h2>
            <p>
              Our delivery personnel undergo daily health checks. You can request contactless drop-off at your security gate or doorstep during checkout in the Order Notes section.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default ShippingPolicy;
