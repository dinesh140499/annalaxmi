import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/shop/ProductDetails";
import ShopLayout from "../pages/shop/Layout";
import Checkout from "../pages/cart/Checkout";
import ShoppingBilling from "../pages/billing/ShoppingBilling";
import PageNotFound from "../components/PageNotFound";
import Login from "../pages/authenticate/Login";

// Account Routes
import Account from "../pages/accounts/Account";
import Dashboard from "../components/accounts/dashboard/Dashboard";
import OrderHistory from "../components/accounts/order-history/OrderHistory";
import OrderDetails from "../components/accounts/order-history/OrderDetails";
import Setting from "../components/accounts/setting/Setting";
import ProtectedPage from "../utils/ProtectedPage";
import PublicRoute from "../utils/PublicRoute";
import AuthProvider from "../components/AuthProvider";
import ManageAddress from "../components/accounts/manage-address/ManageAddress";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "categories",
        element: <ShopLayout />,
        children: [
          { index: true, element: <Shop /> },
          { path: ":productId", element: <ProductDetails /> },
        ],
      },
      {
        path: "shopping-cart",
        element: <Checkout />,
      },
      {
        path: "shopping-cart/checkout",
        element: <ShoppingBilling />,
      },
      {
        element: <ProtectedPage />,
        children: [
          {
            path: "account",
            element: <Account />,
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "addresses",
                element: <ManageAddress />,
              },
              {
                path: "order-history",
                element: <OrderHistory />,
              },
              {
                path: "order-history/details",
                element: <OrderDetails />,
              },
              {
                path: "settings",
                element: <Setting />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
