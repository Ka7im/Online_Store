import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    SHOP_ROUTE,
} from '../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { unauthorized } from '../api/userSlice';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/cart.svg';

const NavBar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const role = useSelector((state) => state.user.user.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <NavLink
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '22px',
                    }}
                    to={SHOP_ROUTE}
                >
                    Online Store
                </NavLink>
                <Nav className='ml-auto' style={{ color: 'white' }}>
                    {isAuth ? (
                        <>
                            <Image
                                src={cart}
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(BASKET_ROUTE)}
                            />
                            {role === 'ADMIN' ? (
                                <Button
                                    variant={'outline-light'}
                                    className='ms-2'
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button>
                            ) : null}
                            <Button
                                variant={'outline-light'}
                                className='ms-2'
                                onClick={() => dispatch(unauthorized())}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant={'outline-light'}
                            className='ms-2'
                            onClick={() => {
                                navigate(LOGIN_ROUTE);
                            }}
                        >
                            Авторизация
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
