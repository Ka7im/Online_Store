import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDevicesInBasket } from '../api/deviceSlice';
import { Image } from 'react-bootstrap';

const Basket = () => {
    const basket = useSelector((state) => state.device.basket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDevicesInBasket());
    }, []);

    return (
        <ul>
            {basket.map((item) => {
                return (
                    <li style={{ listStyle: 'none' }}>
                        <div
                            style={{
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                height={150}
                                width={200}
                                style={{ objectFit: 'contain' }}
                                src={'http://localhost:5000/' + item.img}
                            />
                            <div style={{ marginLeft: '10px' }}>
                                {item.name}
                            </div>
                            <br />
                            <div style={{ marginLeft: '10px' }}>
                                Количество: {item.amount}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Basket;
