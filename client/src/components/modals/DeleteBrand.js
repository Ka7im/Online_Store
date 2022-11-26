import React, { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeBrand } from '../../api/deviceSlice';

const DeleteBrand = ({ show, onHide }) => {
    const brands = useSelector((state) => state.device.brands);
    const [brand, setBrand] = useState();
    const dispatch = useDispatch();

    const deleteBrand = (id) => {
        dispatch(removeBrand(id));
        onHide();
    };

    return (
        <Modal size='lg' onHide={onHide} centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Удалить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {brand?.name || 'Выберите тип'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {brands.map((brand) => {
                            if (brand.name === 'Все') {
                                return null;
                            } else {
                                return (
                                    <Dropdown.Item
                                        key={brand.id}
                                        onClick={() => setBrand(brand)}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                );
                            }
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>
                    Закрыть
                </Button>
                <Button
                    variant='outline-success'
                    onClick={() => deleteBrand(brand.id)}
                >
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrand;
