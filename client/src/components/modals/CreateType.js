import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addType } from '../../api/deviceSlice';
import { useDispatch } from 'react-redux';

const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const createType = () => {
        dispatch(addType({ name: value }));
        setValue('');
        onHide();
    };

    return (
        <Modal size='lg' onHide={onHide} centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={'Введите название типа'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    ></Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant='outline-success' onClick={createType}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
