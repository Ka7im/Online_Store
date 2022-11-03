import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getBrands, getTypes, getDevices } from '../api/deviceSlice';
import BrandBar from '../components/BrandBar/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar/TypeBar';

const Shop = () => {
    const dispatch = useDispatch();
    const { currentPage, selectedBrand, selectedType, limit } = useSelector(
        (state) => state.device,
        shallowEqual
    );

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getBrands());
    }, []);

    useEffect(() => {
        if (selectedType.name === 'Все') {
            dispatch(
                getDevices({
                    typeId: undefined,
                    brandId: selectedBrand?.id,
                    page: currentPage,
                    limit,
                })
            );
        } else {
            dispatch(
                getDevices({
                    typeId: selectedType?.id,
                    brandId: selectedBrand?.id,
                    page: currentPage,
                    limit,
                })
            );
        }
    }, [currentPage, selectedBrand, selectedType, limit]);

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
