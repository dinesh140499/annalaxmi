import { FaFacebookF, FaPinterestP, FaInstagram, FaLeaf } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface SocialLink {
    name: string;
    icon: IconType;
    link: string;
}

const socialLinks: SocialLink[] = [
    { name: "Facebook", icon: FaFacebookF, link: "https://facebook.com" },
    { name: "Twitter", icon: FaXTwitter, link: "https://twitter.com" },
    { name: "Pinterest", icon: FaPinterestP, link: "https://pinterest.com" },
    { name: "Instagram", icon: FaInstagram, link: "https://instagram.com" },
];

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <section className="py-8 sm:py-12">
            <div className="max-w-[95%] mx-auto w-full">
                <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-lg relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                        
                        {/* Left: Copy */}
                        <div className="lg:col-span-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-2">
                                <FaLeaf className="text-xs" />
                                <span>Weekly Organic Digest</span>
                            </div>
                            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                                Stay Connected to Farm Fresh Harvests
                            </h2>
                            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 max-w-lg leading-relaxed">
                                Subscribe for harvest updates, healthy grain recipes, and exclusive seasonal member discounts.
                            </p>
                        </div>

                        {/* Right: Input Form & Socials */}
                        <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-end">
                            {subscribed ? (
                                <div className="bg-emerald-700/80 border border-emerald-500/50 text-amber-300 px-6 py-3 rounded-2xl text-xs font-semibold">
                                    🎉 Thank you for subscribing to GrainPulse updates!
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md bg-white rounded-2xl p-1.5 shadow-sm">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address..."
                                        required
                                        className="w-full bg-transparent px-4 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs whitespace-nowrap transition cursor-pointer shadow-sm"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}

                            {/* Social Icons */}
                            <div className="flex gap-2">
                                {socialLinks.map(({ name, icon: Icon, link }) => (
                                    <Link
                                        key={name}
                                        to={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-9 w-9 rounded-xl bg-emerald-800/80 hover:bg-amber-400 text-emerald-100 hover:text-emerald-950 transition flex items-center justify-center text-sm shadow-xs"
                                        aria-label={name}
                                    >
                                        <Icon />
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;
