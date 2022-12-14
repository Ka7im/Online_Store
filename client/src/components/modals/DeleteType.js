import React, { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeType } from '../../api/deviceSlice';

const DeleteType = ({ show, onHide }) => {
    const types = useSelector((state) => state.device.types);
    const [type, setType] = useState();
    const dispatch = useDispatch();

    const deleteType = (id) => {
        dispatch(removeType(id));
        onHide();
    };

    return (
        <Modal size='lg' onHide={onHide} centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle>
                        {type?.name || 'Выберите тип'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {types.map((type) => {
                            if (type.name === 'Все') {
                                return null;
                            } else {
                                return (
                                    <Dropdown.Item
                                        key={type.id}
                                        onClick={() => setType(type)}
                                    >
                                        {type.name}
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
                    onClick={() => deleteType(type.id)}
                >
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;
