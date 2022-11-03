import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';
import star from '../../assets/star.svg';
import style from './deviceListItem.module.scss';

const DeviceListItem = ({ device }) => {
    const navigate = useNavigate();

    return (
        <Col
            md={3}
            className='mt-3'
            onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        >
            <Card border={'light'} className={`p-2 ${style.card}`}>
                <Card.Img
                    src={'http://localhost:5000/' + device.img}
                    className={`${style.card_img}`}
                />
                <div className='mt-1 d-flex justify-content-between align-items-center'>
                    <div>{device.name}</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} />
                    </div>
                </div>
                <div className='text-black-50'>{device.price}руб.</div>
            </Card>
        </Col>
    );
};

export default DeviceListItem;
