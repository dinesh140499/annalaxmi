import AppStore from '../../../assets/images/apple-support.png';
import Playstore from '../../../assets/images/playstore-support.png';
import { FaCheckCircle, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AvailableDevice = () => {
    return (
        <section className="py-8 sm:py-12">
            <div className="max-w-[95%] mx-auto w-full">
                <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-lg">
                    <div className="max-w-2xl relative z-10">
                        <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-2">
                            <FaLeaf className="text-xs" />
                            <span>GrainPulse Mobile App</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                            Shop Pure Organic Staples Anywhere, Anytime
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100/90 mt-3 leading-relaxed">
                            Order fresh unpolished dals, cold-pressed oils, and heirloom millets with live batch traceability and 2-hour express delivery.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6 text-xs text-emerald-200">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-amber-400 shrink-0" />
                                <span>Real-time harvest batch tracking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-amber-400 shrink-0" />
                                <span>App-exclusive subscriber discounts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-amber-400 shrink-0" />
                                <span>Instant 1-click doorstep reordering</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-amber-400 shrink-0" />
                                <span>Zero-contact express delivery</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-8">
                            <Link to="/" className="hover:opacity-90 transition">
                                <img src={AppStore} alt="App Store" className="h-10 sm:h-11 w-auto rounded-xl" />
                            </Link>
                            <Link to="/" className="hover:opacity-90 transition">
                                <img src={Playstore} alt="Google Play" className="h-10 sm:h-11 w-auto rounded-xl" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AvailableDevice;