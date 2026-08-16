import { useState } from 'react';
import { FaChevronDown, FaLeaf, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/reusable/Breadcrumps';

interface FaqItem {
    id: number;
    category: string;
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        id: 1,
        category: "Purity & Quality",
        question: "What does 'unpolished dal' mean and why is it healthier?",
        answer: "Commercial pulses are mechanically polished using water, mineral oil, or synthetic buffing agents to produce a glossy cosmetic shine. This stripping process destroys the nutrient-dense outer husk (bran), removing dietary fiber, minerals, and natural flavor. GrainPulse dals are 100% unpolished, preserving full bioactive nutrition and natural fiber.",
    },
    {
        id: 2,
        category: "Purity & Quality",
        question: "Are GrainPulse products certified organic?",
        answer: "Yes! Every single product is sourced from certified organic clusters and meets rigorous pesticide-free testing guidelines. We regularly test batches for 200+ chemical and pesticide residues.",
    },
    {
        id: 3,
        category: "Delivery & Shipping",
        question: "How fast is express delivery?",
        answer: "In Delhi NCR and select metropolitan areas, we offer 2-hour express same-day delivery on all orders placed before 4:00 PM. Standard delivery to other pan-India locations takes 2-3 business days.",
    },
    {
        id: 4,
        category: "Delivery & Shipping",
        question: "What is the minimum order for free delivery?",
        answer: "All orders above ₹499 qualify for 100% Free Express Delivery. For orders below ₹499, a nominal shipping charge of ₹49 is applied.",
    },
    {
        id: 5,
        category: "Storage & Shelf Life",
        question: "How should I store unpolished pulses and cold-pressed oils?",
        answer: "Because our products contain zero artificial preservatives, we recommend storing them in a cool, dry place inside an airtight container (glass or stainless steel is ideal). Keep cold-pressed oils away from direct sunlight to preserve active antioxidants.",
    },
    {
        id: 6,
        category: "Ordering & Payment",
        question: "What payment methods do you accept?",
        answer: "We support all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).",
    },
    {
        id: 7,
        category: "Ordering & Payment",
        question: "What is your return and refund policy?",
        answer: "We have a 100% Satisfaction Guarantee. If you receive damaged packaging or are unsatisfied with the quality, you can initiate a hassle-free return within 48 hours of delivery for a full refund or immediate replacement.",
    },
];

const categories = ["All Questions", "Purity & Quality", "Delivery & Shipping", "Storage & Shelf Life", "Ordering & Payment"];

const Faq = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Questions");
    const [openId, setOpenId] = useState<number | null>(1);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqData.filter((item) => {
        const matchesCategory = selectedCategory === "All Questions" || item.category === selectedCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleAccordion = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-slate-50/50 min-h-screen">
            <Breadcrumbs />

            <div className="max-w-[95%] mx-auto py-10 sm:py-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
                        <FaLeaf className="text-amber-500" />
                        <span>Got Questions?</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Everything you need to know about our organic farming, unpolished staples, and express delivery.
                    </p>

                    {/* Search Filter */}
                    <div className="mt-6 max-w-md mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions (e.g., unpolished, shipping)..."
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 shadow-xs transition"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                                selectedCategory === cat
                                    ? "bg-emerald-800 text-amber-300 shadow-sm"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion List */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition"
                            >
                                <button
                                    onClick={() => toggleAccordion(faq.id)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
                                >
                                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                        {faq.question}
                                    </span>
                                    <FaChevronDown
                                        className={`text-slate-400 text-xs shrink-0 transition-transform duration-200 ${
                                            openId === faq.id ? "rotate-180 text-emerald-800" : ""
                                        }`}
                                    />
                                </button>
                                {openId === faq.id && (
                                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 text-slate-400 text-xs sm:text-sm">
                            No answers found matching your query.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Faq;
