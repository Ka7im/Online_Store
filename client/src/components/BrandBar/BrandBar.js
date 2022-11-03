import React from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { brandSelected } from '../../api/deviceSlice';
import styles from './brandBar.module.scss';

const BrandBar = () => {
    const brands = useSelector((state) => state.device.brands);
    const selectedBrand = useSelector((state) => state.device.selectedBrand);
    const dispatch = useDispatch();

    return (
        <Row>
            {brands.map((brand) => (
                <Col key={brand.id}>
                    <Card
                        key={brand.id}
                        className={`p-3 ${styles.card} ${
                            brand.id === selectedBrand.id ? styles.active : null
                        }`}
                        onClick={() => dispatch(brandSelected(brand))}
                    >
                        {brand.name}
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default BrandBar;
