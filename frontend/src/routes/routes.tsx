import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthProvider from "../components/AuthProvider";
import ProtectedPage from "../utils/ProtectedPage";
import PublicRoute from "../utils/PublicRoute";
import RouteLoadingSkeleton from "../components/common/RouteLoadingSkeleton";
import RouteErrorBoundary from "../components/common/RouteErrorBoundary";
import { lazyWithRetry } from "../utils/lazyWithRetry";

// Helper to wrap lazy components in Suspense with graceful fallback
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<RouteLoadingSkeleton />}>
    <Component />
  </Suspense>
);

// Customer Discovery Pages
const Home = lazyWithRetry(() => import("../pages/home/Home"));
const Shop = lazyWithRetry(() => import("../pages/shop/Shop"));
const ProductDetails = lazyWithRetry(() => import("../pages/shop/ProductDetails"));
const ShopLayout = lazyWithRetry(() => import("../pages/shop/Layout"));
const Category = lazyWithRetry(() => import("../components/Category"));
const Search = lazyWithRetry(() => import("../pages/search/Search"));
const Deals = lazyWithRetry(() => import("../pages/deals/Deals"));

// Customer Cart & Checkout Flow
const Checkout = lazyWithRetry(() => import("../pages/cart/Checkout")); // Cart page
const ShoppingBilling = lazyWithRetry(() => import("../pages/billing/ShoppingBilling")); // Checkout & payment page
const OrderConfirmation = lazyWithRetry(() => import("../pages/order-confirmation/OrderConfirmation"));

// Customer Account & Profile (Protected)
const Account = lazyWithRetry(() => import("../pages/accounts/Account"));
const Dashboard = lazyWithRetry(() => import("../components/accounts/dashboard/Dashboard"));
const OrderHistory = lazyWithRetry(() => import("../components/accounts/order-history/OrderHistory"));
const OrderDetails = lazyWithRetry(() => import("../components/accounts/order-history/OrderDetails"));
const ManageAddress = lazyWithRetry(() => import("../components/accounts/manage-address/ManageAddress"));
const Setting = lazyWithRetry(() => import("../components/accounts/setting/Setting"));

// Utility & Support Pages
const TrackOrder = lazyWithRetry(() => import("../pages/track-order/TrackOrder"));
const Wishlist = lazyWithRetry(() => import("../pages/wishlist/Wishlist"));
const About = lazyWithRetry(() => import("../pages/about/About"));
const Contact = lazyWithRetry(() => import("../pages/contact/Contact"));
const Faq = lazyWithRetry(() => import("../pages/faq/Faq"));

// Legal & Trust Policies
const PrivacyPolicy = lazyWithRetry(() => import("../pages/legal/PrivacyPolicy"));
const TermsConditions = lazyWithRetry(() => import("../pages/legal/TermsConditions"));
const ShippingPolicy = lazyWithRetry(() => import("../pages/legal/ShippingPolicy"));
const RefundPolicy = lazyWithRetry(() => import("../pages/legal/RefundPolicy"));

// Customer Authentication
const Login = lazyWithRetry(() => import("../pages/authenticate/Login"));
const Register = lazyWithRetry(() => import("../pages/authenticate/Register"));
const ForgotPassword = lazyWithRetry(() => import("../pages/authenticate/ForgotPassword"));

// =========================================================================
// ADMIN PLATFORM MODULES (admin/)
// =========================================================================
const AdminLogin = lazyWithRetry(() => import("../admin/pages/Login"));
const AdminLayout = lazyWithRetry(() => import("../admin/layouts/AdminLayout"));
const AdminRoute = lazyWithRetry(() => import("../components/common/AdminRoute"));
const AdminDashboard = lazyWithRetry(() => import("../admin/pages/Dashboard"));
const AdminUsers = lazyWithRetry(() => import("../admin/pages/Users"));
const AdminProducts = lazyWithRetry(() => import("../admin/pages/Products"));
const AdminCategories = lazyWithRetry(() => import("../admin/pages/Categories"));
const AdminOrders = lazyWithRetry(() => import("../admin/pages/Orders"));
const AdminSettings = lazyWithRetry(() => import("../admin/pages/Settings"));

// 404 Not Found
const PageNotFound = lazyWithRetry(() => import("../components/PageNotFound"));

export const router = createBrowserRouter([
  // =========================================================================
  // 1. PUBLIC & CUSTOMER STOREFRONT (MainLayout)
  // =========================================================================
  {
    path: "/",
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      // 1. Home / Landing
      { 
        index: true, 
        element: withSuspense(Home) 
      },

      // 2. Customer Authentication Flow (Public Only)
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: withSuspense(Login) },
          { path: "signin", element: <Navigate to="/login" replace /> },
          { path: "register", element: withSuspense(Register) },
          { path: "signup", element: <Navigate to="/register" replace /> },
          { path: "forgot-password", element: withSuspense(ForgotPassword) },
        ],
      },

      // 3. Catalog & Discovery Engine
      {
        path: "shop",
        element: withSuspense(ShopLayout),
        children: [
          { index: true, element: withSuspense(Shop) },
          { path: "product/:productId", element: withSuspense(ProductDetails) },
          { path: ":productId", element: withSuspense(ProductDetails) },
        ],
      },
      {
        path: "catalog",
        element: <Navigate to="/shop" replace />,
      },
      {
        path: "products",
        element: <Navigate to="/shop" replace />,
      },
      {
        path: "product",
        element: <Navigate to="/shop" replace />,
      },
      {
        path: "categories",
        element: withSuspense(Category),
      },
      {
        path: "categories/:productId",
        element: withSuspense(ShopLayout),
        children: [
          { index: true, element: withSuspense(ProductDetails) },
        ],
      },
      {
        path: "product/:productId",
        element: withSuspense(ShopLayout),
        children: [
          { index: true, element: withSuspense(ProductDetails) },
        ],
      },
      {
        path: "products/:productId",
        element: withSuspense(ShopLayout),
        children: [
          { index: true, element: withSuspense(ProductDetails) },
        ],
      },

      // 4. Universal Search & Deals Engine
      {
        path: "search",
        element: withSuspense(Search),
      },
      {
        path: "deals",
        element: withSuspense(Deals),
      },
      {
        path: "offers",
        element: <Navigate to="/deals" replace />,
      },

      // 5. Cart, Checkout & Confirmation Flow
      {
        path: "cart",
        element: withSuspense(Checkout),
      },
      {
        path: "checkout",
        element: withSuspense(ShoppingBilling),
      },
      {
        path: "billing",
        element: withSuspense(ShoppingBilling),
      },
      {
        path: "order-confirmation/:orderId",
        element: withSuspense(OrderConfirmation),
      },
      {
        path: "order-confirmation",
        element: withSuspense(OrderConfirmation),
      },

      // 6. Order Tracking
      {
        path: "track-order/:orderId",
        element: withSuspense(TrackOrder),
      },
      {
        path: "track-order",
        element: withSuspense(TrackOrder),
      },

      // 7. Saved Wishlist
      {
        path: "wishlist",
        element: withSuspense(Wishlist),
      },
      {
        path: "saved",
        element: <Navigate to="/wishlist" replace />,
      },

      // 8. User Account & Self-Service (Protected)
      {
        element: <ProtectedPage />,
        children: [
          {
            path: "account",
            element: withSuspense(Account),
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: withSuspense(Dashboard),
              },
              {
                path: "addresses",
                element: withSuspense(ManageAddress),
              },
              {
                path: "orders",
                element: withSuspense(OrderHistory),
              },
              {
                path: "order-history",
                element: withSuspense(OrderHistory),
              },
              {
                path: "orders/:orderId",
                element: withSuspense(OrderDetails),
              },
              {
                path: "order-history/details",
                element: withSuspense(OrderDetails),
              },
              {
                path: "wishlist",
                element: withSuspense(Wishlist),
              },
              {
                path: "settings",
                element: withSuspense(Setting),
              },
              {
                path: "profile",
                element: <Navigate to="settings" replace />,
              },
            ],
          },
        ],
      },

      // Top-level aliases for direct navigation
      {
        path: "profile",
        element: <Navigate to="/account/settings" replace />,
      },
      {
        path: "dashboard",
        element: <Navigate to="/account/dashboard" replace />,
      },

      // 9. Brand Information & Customer Support
      {
        path: "about",
        element: withSuspense(About),
      },
      {
        path: "story",
        element: <Navigate to="/about" replace />,
      },
      {
        path: "contact",
        element: withSuspense(Contact),
      },
      {
        path: "support",
        element: <Navigate to="/contact" replace />,
      },
      {
        path: "help",
        element: <Navigate to="/contact" replace />,
      },
      {
        path: "faq",
        element: withSuspense(Faq),
      },

      // 10. Legal & Compliance Trust Policies
      {
        path: "privacy-policy",
        element: withSuspense(PrivacyPolicy),
      },
      {
        path: "privacy",
        element: <Navigate to="/privacy-policy" replace />,
      },
      {
        path: "terms",
        element: withSuspense(TermsConditions),
      },
      {
        path: "terms-and-conditions",
        element: <Navigate to="/terms" replace />,
      },
      {
        path: "shipping-policy",
        element: withSuspense(ShippingPolicy),
      },
      {
        path: "shipping",
        element: <Navigate to="/shipping-policy" replace />,
      },
      {
        path: "refund-policy",
        element: withSuspense(RefundPolicy),
      },
      {
        path: "returns",
        element: <Navigate to="/refund-policy" replace />,
      },
      {
        path: "return-refund-policy",
        element: <Navigate to="/refund-policy" replace />,
      },

      // 11. Catch-All 404 Handler
      {
        path: "*",
        element: withSuspense(PageNotFound),
      },
    ],
  },

  // =========================================================================
  // 2. STANDALONE ENTERPRISE ADMIN AUTH GATEWAY
  // =========================================================================
  {
    path: "/admin/login",
    element: (
      <AuthProvider>
        <Suspense fallback={<RouteLoadingSkeleton />}>
          <AdminLogin />
        </Suspense>
      </AuthProvider>
    ),
    errorElement: withSuspense(PageNotFound),
  },

  // =========================================================================
  // 3. STANDALONE ENTERPRISE ADMIN & SUPERADMIN PLATFORM (admin/)
  // =========================================================================
  {
    path: "/admin",
    element: (
      <AuthProvider>
        <Suspense fallback={<RouteLoadingSkeleton />}>
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        </Suspense>
      </AuthProvider>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: withSuspense(AdminDashboard),
      },
      {
        path: "users",
        element: withSuspense(AdminUsers),
      },
      {
        path: "admins",
        element: <Navigate to="/admin/users" replace />,
      },
      {
        path: "staff",
        element: <Navigate to="/admin/users" replace />,
      },
      {
        path: "products",
        element: withSuspense(AdminProducts),
      },
      {
        path: "inventory",
        element: <Navigate to="/admin/products" replace />,
      },
      {
        path: "categories",
        element: withSuspense(AdminCategories),
      },
      {
        path: "taxonomy",
        element: <Navigate to="/admin/categories" replace />,
      },
      {
        path: "orders",
        element: withSuspense(AdminOrders),
      },
      {
        path: "dispatches",
        element: <Navigate to="/admin/orders" replace />,
      },
      {
        path: "settings",
        element: withSuspense(AdminSettings),
      },
    ],
  },
]);
