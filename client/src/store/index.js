import { configureStore } from '@reduxjs/toolkit';
import user from '../api/userSlice';
import device from '../api/deviceSlice';

const store = configureStore({
    reducer: { user, device },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
