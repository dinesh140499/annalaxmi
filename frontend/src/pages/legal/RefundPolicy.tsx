import Breadcrumbs from '../../components/reusable/Breadcrumps';
import { FaShieldAlt, FaUndoAlt, FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      <div className="max-w-[95%] lg:max-w-4xl mx-auto py-10 sm:py-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
            <FaShieldAlt className="text-amber-500" />
            <span>100% Purity & Satisfaction Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Returns, Replacements & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Last Updated: August 2026 • GrainPulse Pure Essentials
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-800" />
              <span>1. 100% Organic Purity Promise</span>
            </h2>
            <p>
              At GrainPulse, we stand behind the laboratory purity and unpolished quality of every grain, oil, and spice. If you ever feel the quality is not 100% genuine and farm-fresh, we will replace or refund your order with zero hassle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaUndoAlt className="text-emerald-800" />
              <span>2. Return Window & Eligible Conditions</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Fresh Staples & Grains:</strong> Eligible for return or instant replacement within <strong>48 hours</strong> of delivery if seal is intact or if transit damage occurred.</li>
              <li><strong>Damaged or Leaked Packaging:</strong> Instant replacement dispatched within 2 hours upon submitting a quick photo to our WhatsApp desk.</li>
              <li><strong>Wrong Item Received:</strong> Free return pickup and immediate dispatch of correct items.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaExclamationCircle className="text-emerald-800" />
              <span>3. Refund Processing Timeline</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>UPI / Instant Wallets:</strong> Processed within 2 to 4 hours directly back to your source account.</li>
              <li><strong>Credit / Debit Cards:</strong> Processed within 2 to 5 business days depending on your bank.</li>
              <li><strong>Cash on Delivery Orders:</strong> Refunded via instant UPI transfer or GrainPulse Store Credit upon return verification.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FaPhoneAlt className="text-emerald-800" />
              <span>4. How to Raise a Refund / Replacement Request</span>
            </h2>
            <p>
              You can raise a return or quality ticket directly through your <a href="/account/orders" className="text-emerald-800 font-bold hover:underline">Order History</a>, or contact our customer support desk:
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-1 text-slate-800 border border-slate-200">
              <p>• <strong>WhatsApp Support:</strong> +91 90000-00000 (Instant 5-minute reply)</p>
              <p>• <strong>Toll-Free Helpline:</strong> 1800-000-0000 (Mon - Sun, 8:00 AM - 9:00 PM)</p>
              <p>• <strong>Support Email:</strong> care@grainpulse.com</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;
