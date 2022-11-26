import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addBrand } from '../../api/deviceSlice';

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const createBrand = () => {
        dispatch(addBrand({ name: value }));
        setValue('');
        onHide();
    };

    return (
        <Modal size='lg' onHide={onHide} centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={'Введите название бренда'}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    ></Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant='outline-success' onClick={createBrand}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
