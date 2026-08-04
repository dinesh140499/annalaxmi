import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

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
    return (
        <div className="mt-10 mb-10 bg-[#E6E6E6] py-10">
            <div className="max-w-[90%] lg:max-w-[95%] mx-auto w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="capitalize text-[20px] font-bold text-green">
                            Subscribe to our Newsletter
                        </h1>
                        <p className="text-[#999999] text-sm mt-1">
                            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
                            Phasellus imperdiet elit eu magna.
                        </p>
                    </div>
                    <div className="lg:flex flex-1 lg:justify-end items-center gap-3">
                        <div className=" flex flex-wrap items-center ">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="rounded-l-full border border-gray-100 outline-[#E6E6E6] py-2 px-4 bg-white text-md flex-1 min-w-[200px]"
                            />
                            <button className="bg-green text-white py-2 px-4 text-md rounded-r-full cursor-pointer">
                                Subscribe
                            </button>
                        </div>
                        <div className=" flex gap-3 justify-start md:justify-end mt-5 lg:mt-0">
                            {socialLinks.map(({ name, icon: Icon, link }) => (
                                <Link
                                    key={name}
                                    to={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#4D4D4D] p-[5px] transition text-lg rounded-full duration-75 hover:bg-[#00603a] hover:text-white"
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
    );
};

export default Subscribe;
