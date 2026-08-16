import Breadcrumbs from '../../components/reusable/Breadcrumps';
import { FaFileContract } from 'react-icons/fa';

const TermsConditions = () => {
    return (
        <div className="bg-slate-50/50 min-h-screen">
            <Breadcrumbs />

            <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-0">
                <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-xs space-y-8 text-slate-700 leading-relaxed text-xs sm:text-sm">
                    
                    <div className="border-b border-slate-100 pb-6">
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase mb-2">
                            <FaFileContract />
                            <span>Legal Agreement</span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                            Terms & Conditions
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">Effective Date: January 2025</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or placing an order through the GrainPulse website or mobile application, you agree to be bound by these Terms and Conditions and our Privacy Policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Product Authenticity & Natural Variations</h2>
                        <p>
                            Because GrainPulse products are 100% natural, unpolished, and harvested from regenerative farms without synthetic dyes, slight natural variations in grain size, shade, and texture may occur between batches. This is a natural hallmark of zero-chemical farm harvests.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Pricing & Deliveries</h2>
                        <p>
                            All prices displayed include applicable taxes. We strive for punctual 2-hour express delivery; however, exceptional traffic or weather conditions may occasionally adjust delivery windows.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Cancellations & Return Guarantee</h2>
                        <p>
                            Orders may be cancelled free of charge prior to warehouse dispatch. If you receive an unsealed or damaged package, contact our support team within 48 hours for immediate replacement or refund.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
