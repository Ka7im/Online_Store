import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getBrands } from '../../api/deviceSlice';
import { addDevice } from '../../api/deviceSlice';

const CreateDevice = ({ show, onHide }) => {
    const types = useSelector((state) => state.device.types);
    const brands = useSelector((state) => state.device.brands);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState(null);
    const [type, setType] = useState(null);
    const [info, setInfo] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getBrands());
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo((info) => info.filter((i) => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(
            info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
        );
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onAdd = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file, file.name);
        formData.append('brandId', brand.id);
        formData.append('typeId', type.id);
        formData.append('info', JSON.stringify(info));
        dispatch(addDevice(formData));
        onHide();
    };

    return (
        <Modal size='lg' onHide={onHide} centered show={show}>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>
                            {brand?.name || 'Выберите бренд'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map((brand) => (
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => setBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите стоймость устройства'
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr />
                    <Button variant='outline-dark' onClick={addInfo}>
                        Добавить новое свойство
                    </Button>
                    {info.map((i) => (
                        <Row className='mt-3' key={i.number}>
                            <Col md={5} className='d-flex align-items-center'>
                                <Form.Label>Название:</Form.Label>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) =>
                                        changeInfo(
                                            'title',
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder='Введите название свойства'
                                    className='ms-2'
                                />
                            </Col>
                            <Col md={5} className='d-flex align-items-center'>
                                <Form.Label>Описание:</Form.Label>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) =>
                                        changeInfo(
                                            'description',
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder='Введите описание свойства'
                                    className='ms-2'
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    variant={'outline-danger'}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant='outline-success' onClick={onAdd}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
