import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const isAuth = true;
    return (
        <>
            <Routes>
                {isAuth &&
                    authRoutes.map(({ Component, path }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Component />}
                            />
                        );
                    })}
                {publicRoutes.map(({ Component, path }) => {
                    return (
                        <Route key={path} path={path} element={<Component />} />
                    );
                })}
                <Route path={'*'} element={<Navigate to={SHOP_ROUTE} />} />
            </Routes>
        </>
    );
};

export default AppRouter;
