import Breadcrumbs from '../../components/reusable/Breadcrumps';
import { FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
    return (
        <div className="bg-slate-50/50 min-h-screen">
            <Breadcrumbs />

            <div className="max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-0">
                <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-xs space-y-8 text-slate-700 leading-relaxed text-xs sm:text-sm">
                    
                    <div className="border-b border-slate-100 pb-6">
                        <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase mb-2">
                            <FaShieldAlt />
                            <span>Security & Privacy</span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                            GrainPulse Privacy Policy
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">Last Updated: January 2025</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Information We Collect</h2>
                        <p>
                            We collect personal information necessary to fulfill your organic food orders, provide 2-hour delivery updates, and offer tailored dietary recommendations. This includes your name, delivery address, phone number, email address, and payment transaction details.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">2. How We Use Your Data</h2>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>To process, pack, and dispatch your farm-fresh orders safely.</li>
                            <li>To notify you about live order dispatch status and delivery rider OTPs.</li>
                            <li>To provide customer support via our toll-free hotline and WhatsApp desk.</li>
                            <li>To prevent fraudulent transactions and maintain strict security compliance.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Data Security & Storage</h2>
                        <p>
                            We employ enterprise-grade 256-bit SSL encryption for all transaction processing. We do not sell or rent your personal contact information to third-party marketing brokers.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Contact Our Privacy Officer</h2>
                        <p>
                            For inquiries regarding your personal data or to request account deletion, please email us at <strong className="text-emerald-900">privacy@grainpulse.com</strong>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
