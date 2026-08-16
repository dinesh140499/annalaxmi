import { FaLeaf, FaSeedling, FaShieldAlt, FaAward, FaTruck, FaUsers } from 'react-icons/fa';
import veg from '../../assets/images/veg.jpg';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/reusable/Breadcrumps';

const stats = [
    { value: "10,000+", label: "Happy Families Fed" },
    { value: "450+", label: "Certified Partner Farmers" },
    { value: "100%", label: "Unpolished & Chemical Free" },
    { value: "0%", label: "Synthetic Additives" },
];

const pillars = [
    {
        icon: <FaSeedling className="text-3xl text-emerald-700" />,
        title: "Regenerative Farming",
        desc: "We work directly with traditional Indian farmers who practice zero-budget natural farming without synthetic pesticides.",
    },
    {
        icon: <FaShieldAlt className="text-3xl text-emerald-700" />,
        title: "Zero Chemical Polishing",
        desc: "Commercial dals are stripped and polished with water, oil, or leather. GrainPulse preserves 100% of the fiber-rich outer bran.",
    },
    {
        icon: <FaAward className="text-3xl text-emerald-700" />,
        title: "Lab-Certified Purity",
        desc: "Every batch is tested for 200+ chemical contaminants and verified for 100% natural organic standards.",
    },
    {
        icon: <FaTruck className="text-3xl text-emerald-700" />,
        title: "2-Hour Express Delivery",
        desc: "Farm-to-kitchen logistics ensuring unadulterated freshness delivered straight to your doorstep.",
    },
];

const About = () => {
    return (
        <div className="bg-slate-50/50 min-h-screen">
            <Breadcrumbs />

            <div className="max-w-[95%] mx-auto py-10 sm:py-16">
                
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3 shadow-xs">
                        <FaLeaf className="text-amber-500" />
                        <span>Our Organic Journey</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Bringing Ancient Nutrition Back to Indian Kitchens
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                        At <strong className="text-emerald-900">GrainPulse</strong>, our mission is simple: reconnect conscious consumers with purest unpolished dals, heirloom millets, cold-pressed oils, and sun-dried spices sourced directly from trusted regenerative soil.
                    </p>
                </div>

                {/* Story Card with Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs mb-14">
                    <div className="lg:col-span-6 space-y-4">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">The GrainPulse Promise</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Why Unpolished Makes All the Difference
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            For decades, supermarkets have normalized polished dals coated with artificial shine for cosmetic appeal. This industrial process removes up to 60% of dietary fiber, natural vitamins, and minerals.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            GrainPulse brings back authentic, unpolished grains that cook faster, smell divine, and nourish your gut with clean bioavailable protein.
                        </p>
                        <div className="pt-2">
                            <Link 
                                to="/categories" 
                                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
                            >
                                <span>Shop Our Clean Harvest</span>
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
                        <img src={veg} className="h-full w-full object-cover" alt="Organic farming harvest" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-6 text-white">
                            <div>
                                <p className="font-bold text-sm">Harvested with Gratitude</p>
                                <p className="text-xs text-emerald-200">Madhya Pradesh & Himalayan Organic Clusters</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Matrix */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
                    {stats.map((st, i) => (
                        <div key={i} className="bg-emerald-900 text-white p-6 rounded-3xl text-center shadow-sm">
                            <div className="text-2xl sm:text-4xl font-extrabold text-amber-300">{st.value}</div>
                            <div className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium">{st.label}</div>
                        </div>
                    ))}
                </div>

                {/* 4 Core Pillars */}
                <div className="mb-14">
                    <div className="text-center max-w-xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Our Four Commitments to You
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Integrity in every single grain that reaches your dining table.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((p, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-lg hover:border-emerald-300 transition duration-300 card-hover-effect">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                                    {p.icon}
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Direct Farmer Collective Banner */}
                <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 text-xs font-semibold mb-2">
                            <FaUsers />
                            <span>Farmer Empowerment</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Fair Compensation for Regenerative Farmers
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
                            We eliminate exploitative middlemen and pay up to 25% above mandi market rates directly into farmer bank accounts.
                        </p>
                    </div>
                    <Link
                        to="/contact"
                        className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm whitespace-nowrap shadow-md transition"
                    >
                        Partner With Us
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;
