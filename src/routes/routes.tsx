import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

// Pages
import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop'
import ProductDetails from '../pages/shop/ProductDetails'
import ShopLayout from '../pages/shop/Layout'
import Checkout from '../pages/cart/Checkout'
import ShoppingBilling from '../pages/billing/ShoppingBilling'
import PageNotFound from '../components/PageNotFound'
import Login from '../pages/authenticate/Login'


// Account Routes
import Account from '../pages/accounts/Account'
import Dashboard from '../components/accounts/dashboard/Dashboard'
import OrderHistory from '../components/accounts/order-history/OrderHistory'
import OrderDetails from '../components/accounts/order-history/OrderDetails'
import Setting from '../components/accounts/setting/Setting'
import Otp from '../pages/authenticate/Otp'
import ProtectedPage from '../utils/ProtectedPage'
import Logout from '../components/accounts/Logout'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'otp',
                element: <Otp />,
            },
            {
                path: 'categories',
                element: <ShopLayout />,
                children: [
                    { index: true, element: <Shop /> },
                    { path: ':productId', element: <ProductDetails /> },
                ],
            },
            {
                path: 'shopping-cart',
                element: <Checkout />,
            },
            {
                path: 'shopping-cart/checkout',
                element: <ShoppingBilling />,
            },
            {
                path: 'account',
                element: (
                    <ProtectedPage >
                        <Account />
                    </ProtectedPage>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to="dashboard" replace />
                    },
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                    },
                    {
                        path: "order-history",
                        element: <OrderHistory />,
                    },
                    {
                        path: 'order-history/details',
                        element: <OrderDetails />
                    },
                    {
                        path: 'settings',
                        element: <Setting />
                    },
                    {
                        path: 'logout',
                        element: <Logout />
                    },
                ],
            },

            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
])
