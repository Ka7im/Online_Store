import Admin from './pages/Admin';
import Auth from './pages/Auth';
import DevicePage from './pages/DevicePage';
import Order from './pages/Order';
import Shop from './pages/Shop';
import {
    ADMIN_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    ORDER_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
} from './utils/consts';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: ORDER_ROUTE,
        Component: Order,
    },
];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage,
    },
];
