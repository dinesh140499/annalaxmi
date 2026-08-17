import { useState, useEffect, type JSX } from 'react';
import img1 from '../../../assets/images/products/pulse.png';
import img2 from '../../../assets/images/products/grains.png';
import img3 from '../../../assets/images/products/oils.png';
import img4 from '../../../assets/images/products/spices.png';
import img5 from '../../../assets/images/products/dry-fruit.png';
import { FaInstagram, FaStar, FaFacebookF, FaWhatsapp, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { FaXTwitter, FaRegHeart, FaHeart } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineSparkles } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setButton } from "../../../features/commonSlice";
import { useQuery } from '@tanstack/react-query';
import { get } from '../../../baseUrl';

import { addToCart } from '../../../features/cartSlice';
import { toggleWishlist } from '../../../features/wishlistSlice';
import type { RootState } from '../../../store/store';

// Fallback catalog mapping for mock & demo IDs
const catalogFallbacks: Record<string, {
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  weight: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  gallery: string[];
}> = {
  "1": {
    name: "Organic Toor / Arhar Dal (Unpolished)",
    price: 165,
    originalPrice: 195,
    category: "Unpolished Pulses & Dals",
    weight: "1 Kg",
    rating: 5.0,
    reviews: 48,
    description: "Sourced directly from native non-GMO crop clusters in Maharashtra, our Toor Dal is left unpolished with zero chemical gloss agents, ensuring the nutrient-packed bran layer remains 100% intact.",
    image: img1,
    gallery: [img1, img2, img3, img1],
  },
  "2": {
    name: "Himalayan Red Rice (Single Origin)",
    price: 210,
    originalPrice: 260,
    category: "Ancient Grains & Millets",
    weight: "1 Kg",
    rating: 5.0,
    reviews: 32,
    description: "Grown in glacial spring waters in Himachal Pradesh, this unpolished red rice delivers natural antioxidants, bioavailable zinc, and iron with a delightfully nutty aroma.",
    image: img2,
    gallery: [img2, img1, img3, img2],
  },
  "3": {
    name: "Cold-Pressed Kachi Ghani Mustard Oil",
    price: 175,
    originalPrice: 220,
    category: "Cold-Pressed Virgin Oils",
    weight: "1 Litre",
    rating: 4.8,
    reviews: 56,
    description: "Extracted using traditional wooden Kolhu expellers below 45°C. Pure, pungent, and rich in heart-healthy Omega-3 and natural antioxidants.",
    image: img3,
    gallery: [img3, img1, img2, img3],
  },
  "4": {
    name: "Salem Pure Turmeric Powder (Curcumin 5%)",
    price: 120,
    originalPrice: 150,
    category: "Authentic Indian Spices",
    weight: "250 g",
    rating: 4.9,
    reviews: 39,
    description: "Handpicked rhizomes from Salem, Tamil Nadu, sun-dried and slowly pulverized to retain the natural 5%+ curcumin level and therapeutic properties.",
    image: img4,
    gallery: [img4, img1, img2, img4],
  },
  "5": {
    name: "Kashmiri Mamra Almonds (Raw Harvest)",
    price: 650,
    originalPrice: 799,
    category: "Dry Fruits & Super Seeds",
    weight: "500 g",
    rating: 5.0,
    reviews: 67,
    description: "Authentic non-GMO Mamra almonds from the valley of Kashmir, cold-harvested and completely oil-rich with 0% chemical preservatives.",
    image: img5,
    gallery: [img5, img2, img3, img5],
  },
  "6": {
    name: "Organic Moong Dal (Yellow Split)",
    price: 145,
    originalPrice: 170,
    category: "Unpolished Pulses & Dals",
    weight: "1 Kg",
    rating: 4.7,
    reviews: 18,
    description: "Easy to digest, protein-rich yellow split moong dal, clean-rinsed and sun-dried without artificial polishes.",
    image: img1,
    gallery: [img1, img2, img3, img1],
  },
  "7": {
    name: "Organic Foxtail Millet (Kangni)",
    price: 130,
    originalPrice: 160,
    category: "Ancient Grains & Millets",
    weight: "1 Kg",
    rating: 4.8,
    reviews: 24,
    description: "Traditional gluten-free super grain, low glycemic index, and naturally rich in dietary fiber and essential minerals.",
    image: img2,
    gallery: [img2, img1, img3, img2],
  },
  "8": {
    name: "Single-Origin Whole Black Pepper",
    price: 180,
    originalPrice: 240,
    category: "Authentic Indian Spices",
    weight: "200 g",
    rating: 4.9,
    reviews: 31,
    description: "Bold Malabar black peppercorns, high piperine content, intensely aromatic and sun-dried in Kerala estate farms.",
    image: img4,
    gallery: [img4, img1, img2, img4],
  },
};

type SocialType = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const socialLinks: SocialType[] = [
  { name: "WhatsApp", link: "https://whatsapp.com", icon: <FaWhatsapp /> },
  { name: "Instagram", link: "https://instagram.com", icon: <FaInstagram /> },
  { name: "Facebook", link: "https://facebook.com", icon: <FaFacebookF /> },
  { name: "Twitter", link: "https://twitter.com", icon: <FaXTwitter /> },
];

const weights = ["500 g", "1 Kg", "2 Kg", "5 Kg"];

const ProductView = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const fallback = (productId && catalogFallbacks[productId]) || catalogFallbacks["1"];

  // Fetch product details from backend when productId is a valid identifier
  const isBackendId = Boolean(productId && productId.length > 5);
  const { data: apiData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => get('default', `products/${productId}`),
    enabled: isBackendId,
    retry: false,
  });

  const backendProduct = apiData?.product;

  const name = backendProduct?.name || fallback.name;
  const price = backendProduct?.pricing?.sellingPrice || fallback.price;
  const originalPrice = backendProduct?.pricing?.mrp || fallback.originalPrice;
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const categoryName = backendProduct?.category?.name || fallback.category;
  const rating = backendProduct?.rating?.average || fallback.rating;
  const reviews = backendProduct?.rating?.totalReviews || fallback.reviews;
  const description = backendProduct?.description || fallback.description;

  const initialGallery = backendProduct?.images && backendProduct.images.length > 0
    ? backendProduct.images.map((img: any) => img.url)
    : fallback.gallery;

  const [mainImage, setMainImage] = useState<string>(fallback.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedWeight, setSelectedWeight] = useState<string>(fallback.weight || "1 Kg");

  // Sync main image whenever product data or productId updates
  useEffect(() => {
    if (backendProduct?.images && backendProduct.images.length > 0) {
      setMainImage(backendProduct.images[0].url);
    } else if (productId && catalogFallbacks[productId]) {
      setMainImage(catalogFallbacks[productId].image);
      setSelectedWeight(catalogFallbacks[productId].weight || "1 Kg");
    } else {
      setMainImage(fallback.image);
    }
  }, [productId, backendProduct]);

  const isWishlisted = wishlistItems.some((item) => String(item.id) === String(productId || "1"));

  const handleCart = () => {
    dispatch(addToCart({
      id: productId || "1",
      name,
      price,
      originalPrice,
      weight: selectedWeight,
      image: mainImage || fallback.image,
      quantity,
    }));
    dispatch(setButton({ cart: true }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist({
      id: productId || "1",
      name,
      price,
      originalPrice,
      weight: selectedWeight,
      category: categoryName,
      image: mainImage || fallback.image,
      rating,
      inStock: true,
    }));
  };

  return (
    <div className="py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Gallery (6 cols) */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
            {initialGallery.map((item: string, i: number) => (
              <button
                key={i}
                type="button"
                className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl p-1.5 bg-white border-2 cursor-pointer transition-all duration-200 ${
                  mainImage === item
                    ? 'border-emerald-700 shadow-md scale-105' 
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
                onClick={() => setMainImage(item)}
              >
                <img src={item} className="h-full w-full object-contain" alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>

          {/* Main Image Showcase */}
          <div className="relative flex-1 h-[320px] sm:h-[420px] bg-slate-50/80 rounded-3xl p-6 border border-slate-100 flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              <span className="bg-emerald-800 text-amber-300 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                100% Unpolished
              </span>
              {discount > 0 && (
                <span className="bg-amber-500 text-emerald-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                  {discount}% OFF
                </span>
              )}
            </div>

            <img 
              src={mainImage} 
              alt={name}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right: Product Details & Buying Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-3 py-0.5 rounded-full">
                {categoryName}
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <HiOutlineSparkles /> Certified Farm Harvest
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {name}
            </h1>

            {/* Rating & In-Stock */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200/60">
                <FaStar className="text-amber-500" />
                <span>{rating}</span>
                <span className="text-slate-400 font-normal">({reviews} reviews)</span>
              </div>
              <span className="h-4 w-[1px] bg-slate-200"></span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                In Stock & Farm Fresh
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
            <span className="text-3xl font-black text-emerald-950 font-heading">
              ₹{price * quantity}
            </span>
            <span className="text-sm text-slate-400 line-through font-semibold">
              ₹{originalPrice * quantity}
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
              Save ₹{(originalPrice - price) * quantity}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {description}
          </p>

          {/* Pack Size Selector */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Select Pack Size: <strong className="text-emerald-800">{selectedWeight}</strong>
            </span>
            <div className="flex flex-wrap gap-2.5">
              {weights.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedWeight === w
                      ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-102"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Quantity Counter */}
            <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-white shadow-2xs">
              <button
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 text-base font-bold transition cursor-pointer"
              >
                -
              </button>
              <span className="px-4 font-extrabold text-sm text-slate-800 font-heading">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 text-base font-bold transition cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleCart}
              className="flex-1 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 cursor-pointer transition duration-150"
            >
              <HiOutlineShoppingBag className="text-lg text-amber-300" />
              <span>Add to Harvest Bag</span>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`h-12 w-12 rounded-2xl border flex items-center justify-center text-lg transition cursor-pointer ${
                isWishlisted 
                  ? "bg-red-50 border-red-200 text-red-500 shadow-2xs" 
                  : "bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200"
              }`}
              aria-label="Add to Wishlist"
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <FaTruck className="text-emerald-700 text-sm shrink-0" />
              <span>2-Hour Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-emerald-700 text-sm shrink-0" />
              <span>100% Money-Back Guarantee</span>
            </div>
          </div>

          {/* Share on Socials */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-semibold text-slate-400">Share:</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((item, idx) => (
                <Link 
                  key={idx} 
                  to={item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-8 w-8 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 flex items-center justify-center text-xs transition"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductView;