import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { setButton } from '../../features/commonSlice';
import { updateQuantity, removeFromCart, type CartItem } from '../../features/cartSlice';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { FaArrowRight } from 'react-icons/fa';

const ShopCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartOpen = useSelector((state: RootState) => state.common.button.cart);
  const { items, coupon } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = coupon.applied ? coupon.discount : 0;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const freeDeliveryThreshold = 499;
  const progressToFree = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleClose = () => {
    dispatch(setButton({ cart: false }));
  };

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    handleClose();
    navigate('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed overflow-hidden h-[100vh] w-[320px] sm:w-[390px] z-50 top-0 right-0 shadow-2xl bg-white flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <HiOutlineShoppingBag className="text-emerald-800 text-xl" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Harvest Basket ({totalCount} {totalCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
            onClick={handleClose}
            aria-label="Close cart"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-emerald-50/80 p-3 mx-4 mt-3 rounded-2xl border border-emerald-100/80 text-xs text-emerald-950">
          {amountNeededForFree === 0 ? (
            <p className="font-bold flex items-center gap-1.5 text-emerald-800">
              <span>🎉 Congratulations! You unlocked <strong>FREE Express Delivery!</strong></span>
            </p>
          ) : (
            <p className="font-medium text-slate-700">
              Add <strong className="text-emerald-800 font-extrabold">₹{amountNeededForFree.toFixed(0)}</strong> more for <strong>FREE Delivery</strong>
            </p>
          )}
          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-emerald-700 rounded-full transition-all duration-300"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
          {items.length > 0 ? (
            items.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 transition shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-14 w-14 rounded-xl bg-slate-50 p-1 flex items-center justify-center shrink-0">
                    <img src={item.image} className="h-full w-full object-contain" alt={item.name} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 truncate">{item.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.weight} • <strong className="text-emerald-900 font-bold">₹{item.price}</strong>
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          type="button"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="h-6 w-6 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-l-lg transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-extrabold text-slate-800">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="h-6 w-6 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-r-lg transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer shrink-0"
                  aria-label="Remove item"
                >
                  <IoTrashOutline className="text-sm" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 text-2xl">
                <HiOutlineShoppingBag />
              </div>
              <p className="text-sm font-bold text-slate-800">Your Basket is Empty</p>
              <p className="text-xs text-slate-400">Discover fresh unpolished staples from our farm catalog.</p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  onClick={handleClose}
                  className="inline-block bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">₹{subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-amber-700 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Delivery:</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-base font-black text-emerald-950">₹{total.toFixed(0)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button 
                className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                onClick={handleCheckout}
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight className="text-xs text-amber-300" />
              </button>
              <button 
                onClick={handleViewCart} 
                className="w-full bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-2xl text-xs border border-slate-200 transition cursor-pointer"
              >
                View Full Basket & Coupons
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopCard;
