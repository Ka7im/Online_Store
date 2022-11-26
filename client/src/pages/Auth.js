import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useForm } from 'react-hook-form';
import { signIn } from '../api/userSlice';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { useDispatch } from 'react-redux';

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: 'onBlur' });

    const onSubmit = async ({ email, password }) => {
        const data = {
            isLogin,
            email,
            password,
            navigate,
        };

        dispatch(signIn(data));
    };

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h2>
                <Form
                    className='d-flex flex-column mt-3'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        {...register('email', { required: true })}
                    />
                    {errors.email && (
                        <div style={{ color: 'red', marginTop: '5px' }}>
                            This field is required!
                        </div>
                    )}
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль...'
                        {...register('password', { required: true })}
                        type='password'
                    />
                    {errors.password && (
                        <div style={{ color: 'red', marginTop: '5px' }}>
                            This field is required!
                        </div>
                    )}
                    <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        <Col>
                            {isLogin ? (
                                <div>
                                    Нет аккаунта?{' '}
                                    <NavLink to={REGISTRATION_ROUTE}>
                                        Зарегистрируйся!
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    Есть аккаунт?{' '}
                                    <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            )}
                        </Col>
                        <Col>
                            <Button
                                variant={'outline-success'}
                                style={{ width: '100%' }}
                                type='submit'
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
