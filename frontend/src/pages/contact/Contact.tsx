import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLeaf, FaClock, FaCheckCircle } from 'react-icons/fa';
import Breadcrumbs from '../../components/reusable/Breadcrumps';

const contactMethods = [
    {
        icon: <FaPhoneAlt className="text-xl text-emerald-700" />,
        title: "Toll-Free Customer Care",
        subtitle: "Mon - Sat (8:00 AM - 8:00 PM)",
        detail: "1800-000-0000",
        link: "tel:18000000000",
    },
    {
        icon: <FaWhatsapp className="text-xl text-emerald-700" />,
        title: "WhatsApp Order Desk",
        subtitle: "Instant Chat & Live Support",
        detail: "+91 90000-00000",
        link: "#",
    },
    {
        icon: <FaEnvelope className="text-xl text-emerald-700" />,
        title: "Official Email Support",
        subtitle: "Responses within 2 business hours",
        detail: "support@grainpulse.demo",
        link: "mailto:support@grainpulse.demo",
    },
    {
        icon: <FaMapMarkerAlt className="text-xl text-emerald-700" />,
        title: "Main Fulfillment Hub",
        subtitle: "Direct Dispatch Facility",
        detail: "Green Park, New Delhi - 110016",
        link: "#",
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
        }, 3000);
    };

    return (
        <div className="bg-slate-50/50 min-h-screen">
            <Breadcrumbs />

            <div className="max-w-[95%] mx-auto py-10 sm:py-16">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
                        <FaLeaf className="text-amber-500" />
                        <span>We Are Here For You</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Get In Touch With GrainPulse
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Have questions about our unpolished grains, bulk order requests, or farm certifications? Our team is always ready to assist.
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    {contactMethods.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-lg hover:border-emerald-300 transition duration-300 card-hover-effect flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                                <p className="text-[11px] text-slate-400 mt-0.5">{item.subtitle}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-800">
                                {item.detail}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Main Form & Hub Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Contact Form (7 cols) */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                            Send Us a Message
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mb-6">
                            Fill out the form below and an organic nutrition specialist will contact you promptly.
                        </p>

                        {submitted ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl text-center space-y-2">
                                <FaCheckCircle className="text-3xl text-emerald-700 mx-auto" />
                                <h3 className="text-base font-bold">Thank you for reaching out!</h3>
                                <p className="text-xs text-slate-600">
                                    Your message has been received. Our team will get back to you within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Ramesh Kumar"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="e.g. +91 98765-43210"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="e.g. ramesh@gmail.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Inquiry Type</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition"
                                        >
                                            <option value="General Inquiry">General Order Inquiry</option>
                                            <option value="Bulk Purchase">Corporate & Bulk Supply</option>
                                            <option value="Farmer Partnership">Farmer Supply Partnership</option>
                                            <option value="Feedback">Feedback & Suggestions</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">How can we help you? *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Write your question or request details here..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
                                >
                                    Submit Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Operational Details (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-md">
                            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-2">
                                <FaClock />
                                <span>Support Hours</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Operating & Dispatch Schedule</h3>
                            <div className="space-y-2 text-xs text-emerald-100">
                                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                                    <span>Monday - Saturday:</span>
                                    <strong className="text-white">8:00 AM – 9:00 PM</strong>
                                </div>
                                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                                    <span>Sunday Express Dispatch:</span>
                                    <strong className="text-white">9:00 AM – 6:00 PM</strong>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span>Same-Day Cutoff:</span>
                                    <strong className="text-amber-300">Orders before 4:00 PM</strong>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs">
                            <h4 className="text-sm font-bold text-slate-900 mb-2">Corporate & Bulk Supply</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                Supplying certified unpolished pulses, organic millets, and cold-pressed oils for corporate gifting, gourmet restaurants, and retail partners.
                            </p>
                            <a 
                                href="mailto:bulk@grainpulse.com" 
                                className="inline-block text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                            >
                                Contact Bulk Desk → bulk@grainpulse.com
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;
