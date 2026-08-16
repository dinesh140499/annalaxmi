import { FaWhatsapp, FaLeaf, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { SocialLink } from "./home/Subscribe";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import AppStore from '../assets/images/apple-support.png';
import Playstore from '../assets/images/playstore-support.png';

const socialLinks: SocialLink[] = [
    { name: "Facebook", icon: FaFacebookF, link: "https://facebook.com" },
    { name: "Twitter", icon: FaXTwitter, link: "https://twitter.com" },
    { name: "Pinterest", icon: FaPinterestP, link: "https://pinterest.com" },
    { name: "Instagram", icon: FaInstagram, link: "https://instagram.com" },
];

interface FooterSection {
    heading: string;
    links: {
        name: string;
        path: string;
    }[];
}

const footerNav: FooterSection[] = [
    {
        heading: "Organic Categories",
        links: [
            { name: "Unpolished Pulses & Dals", path: "/shop" },
            { name: "Ancient Millets & Grains", path: "/shop" },
            { name: "Cold-Pressed Virgin Oils", path: "/shop" },
            { name: "Sun-Dried Authentic Spices", path: "/shop" },
            { name: "Today's Flash Deals", path: "/deals" },
            { name: "Saved Wishlist Essentials", path: "/wishlist" },
        ]
    },
    {
        heading: "Customer Care",
        links: [
            { name: "Track Your Order", path: "/track-order" },
            { name: "Shipping & Express Delivery", path: "/shipping-policy" },
            { name: "Returns & Refund Guarantee", path: "/refund-policy" },
            { name: "Contact & Helpline Desk", path: "/contact" },
            { name: "Frequently Asked Questions", path: "/faq" },
            { name: "Account Dashboard", path: "/account/dashboard" },
        ]
    },
    {
        heading: "About & Compliance",
        links: [
            { name: "Our Organic Farming Story", path: "/about" },
            { name: "Farmer Partner Collectives", path: "/about" },
            { name: "Lab Purity & Certifications", path: "/about" },
            { name: "Terms & Conditions", path: "/terms" },
            { name: "Privacy Policy", path: "/privacy-policy" },
        ]
    },
];

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 pt-12 sm:pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-[95%] mx-auto w-full">
                
                {/* Top Row: Brand & Multi-column Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
                    
                    {/* Brand Column (4 cols) */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="flex items-center gap-2.5 group w-fit">
                            <div className="h-10 w-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-400 shadow-md">
                                <FaLeaf className="text-xl transform -rotate-12" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight text-white">
                                    Grain<span className="text-amber-400">Pulse</span>
                                </span>
                                <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-400 -mt-1">
                                    Pure & Organic Essentials
                                </span>
                            </div>
                        </Link>

                        <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-sm">
                            GrainPulse brings farm-direct, certified unpolished pulses, organic millets, and cold-pressed oils from sustainable farms directly to your doorstep.
                        </p>

                        {/* Contact Quick Info */}
                        <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                            <div className="flex items-center gap-2.5">
                                <FaMapMarkerAlt className="text-amber-400 shrink-0" />
                                <span>Sarojini Nagar, New Delhi, India - 110023</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaPhoneAlt className="text-amber-400 shrink-0" />
                                <span>Toll-Free Support: 1800-000-0000</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaWhatsapp className="text-amber-400 shrink-0" />
                                <span>WhatsApp Order Desk: +91 90000-00000</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaEnvelope className="text-amber-400 shrink-0" />
                                <span>support@grainpulse.demo</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2 mt-6">
                            {socialLinks.map(({ name, icon: Icon, link }) => (
                                <Link
                                    key={name}
                                    to={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 transition flex items-center justify-center text-xs"
                                    aria-label={name}
                                >
                                    <Icon />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns (6 cols) */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {footerNav.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1 border-b border-emerald-800/60 w-fit">
                                    {section.heading}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((item, i) => (
                                        <li key={i}>
                                            <Link 
                                                to={item.path} 
                                                className="text-xs text-slate-400 hover:text-amber-400 transition block leading-normal"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* App & Trust Badges (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1 border-b border-emerald-800/60 w-fit">
                                Mobile App
                            </h3>
                            <p className="text-xs text-slate-400 mb-3">
                                Get exclusive discounts on GrainPulse mobile app.
                            </p>
                            <div className="space-y-2">
                                <Link to="/" className="block">
                                    <img src={AppStore} alt="App Store" className="h-9 w-auto rounded-lg" />
                                </Link>
                                <Link to="/" className="block">
                                    <img src={Playstore} alt="Google Play" className="h-9 w-auto rounded-lg" />
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                                <FaShieldAlt className="text-amber-400 text-base" />
                                <span>100% Certified Organic & Non-GMO</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Payment */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© 2025 GrainPulse. All rights reserved. Grown with nature, delivered with care.</p>
                    <div className="flex items-center gap-4 text-slate-400">
                        <span>100% Quality Guaranteed</span>
                        <span>•</span>
                        <span>Made with ❤️ for healthy living</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
