import React, { useEffect } from 'react';
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap';
import star from '../assets/star.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchOneDevice } from '../api/axios/deviceApi';
import {
    createDeviceInBasket,
    increaseDeviceInBasket,
    decreaseDeviceInBasket,
    getDevicesInBasket,
} from '../api/deviceSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const DevicePage = () => {
    const dispatch = useDispatch();
    const [device, setDevise] = useState({ info: [] });
    const { id } = useParams();
    const amount = useSelector(
        (state) =>
            state.device.basket.find((item) => {
                return item.id == id;
            })?.amount
    );

    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevise(data));
        dispatch(getDevicesInBasket());
    }, []);

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image
                        height={300}
                        width={410}
                        style={{ objectFit: 'contain' }}
                        src={'http://localhost:5000/' + device.img}
                    />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2 style={{ textAlign: 'center' }}>{device.name}</h2>
                        <div className='d-flex align-items-center justify-content-center'>
                            <Image src={star} width={248} height={248} />
                            <div style={{ position: 'absolute', fontSize: 64 }}>
                                {device.rating}
                            </div>
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: '5px solid lightgray',
                        }}
                    >
                        <h3>{`От: ${device.price} руб.`}</h3>
                        {amount ? (
                            <>
                                <div>
                                    <Button
                                        variant='outline-dark'
                                        onClick={() => {
                                            dispatch(
                                                increaseDeviceInBasket(id)
                                            );
                                        }}
                                    >
                                        +
                                    </Button>{' '}
                                    {amount}{' '}
                                    <Button
                                        variant='outline-dark'
                                        onClick={() => {
                                            dispatch(
                                                decreaseDeviceInBasket(id)
                                            );
                                        }}
                                    >
                                        -
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <Button
                                variant='outline-dark'
                                onClick={() => {
                                    dispatch(
                                        createDeviceInBasket({
                                            ...device,
                                            amount: 1,
                                        })
                                    );
                                }}
                            >
                                Добавить в корзину
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device.info.map((info, index) => (
                    <Row
                        key={info.id}
                        style={{
                            background:
                                index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10,
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    );
};

export default DevicePage;
