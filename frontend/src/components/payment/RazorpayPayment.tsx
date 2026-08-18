import React from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayPaymentProps {
  amount?: number; // Amount in rupees (e.g. 1499)
  orderId?: string;
  name?: string;
  description?: string;
  customerName?: string;
  customerEmail?: string;
  customerContact?: string;
  themeColor?: string;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  onSuccess?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  onDismiss?: () => void;
}

export const openRazorpayPayment = ({
  amount = 1499,
  name = "Annalaxmi",
  description = "Product Payment",
  customerName = "Customer",
  customerEmail = "customer@example.com",
  customerContact = "9876543210",
  themeColor = "#166534", // emerald-800
  onSuccess,
  onDismiss,
}: Omit<RazorpayPaymentProps, "buttonText" | "className" | "disabled">) => {
  if (typeof window === "undefined" || !window.Razorpay) {
    alert("Razorpay SDK failed to load. Please check your internet connection.");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100), // convert rupees to paise
    currency: "INR",
    name: name,
    description: description,
    image: "/logo.png",
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerContact,
    },
    notes: {
      purpose: description,
    },
    theme: {
      color: themeColor,
    },
    handler: function (response: {
      razorpay_payment_id: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    }) {
      console.log("Payment successful:", response);
      if (onSuccess) {
        onSuccess(response);
      } else {
        alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
      }
    },
    modal: {
      ondismiss: function () {
        console.log("Payment popup closed");
        if (onDismiss) {
          onDismiss();
        }
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount = 1499,
  name = "Annalaxmi",
  description = "Dummy Product Payment",
  customerName = "Dinesh Kumar",
  customerEmail = "test@example.com",
  customerContact = "9876543210",
  themeColor = "#3399cc",
  buttonText,
  className = "bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl shadow transition",
  disabled = false,
  onSuccess,
  onDismiss,
}) => {
  const handlePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    openRazorpayPayment({
      amount,
      name,
      description,
      customerName,
      customerEmail,
      customerContact,
      themeColor,
      onSuccess,
      onDismiss,
    });
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled}
      className={className}
    >
      {buttonText || `Pay ₹${amount.toLocaleString("en-IN")}`}
    </button>
  );
};

export default RazorpayPayment;
