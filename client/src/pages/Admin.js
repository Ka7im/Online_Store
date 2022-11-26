import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import DeleteType from '../components/modals/DeleteType';
import DeleteBrand from '../components/modals/DeleteBrand';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);

    return (
        <Container className='d-flex flex-column'>
            <Button
                variant={'outline-dark'}
                className='mt-2 p-2'
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-2 p-2'
                onClick={() => setDeleteTypeVisible(true)}
            >
                Удалить тип
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-2 p-2'
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-2 p-2'
                onClick={() => setDeleteBrandVisible(true)}
            >
                Удалить бренд
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-2 p-2'
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateType
                show={typeVisible}
                onHide={() => setTypeVisible(false)}
            />
            <CreateBrand
                show={brandVisible}
                onHide={() => setBrandVisible(false)}
            />
            <CreateDevice
                show={deviceVisible}
                onHide={() => setDeviceVisible(false)}
            />
            <DeleteType
                show={deleteTypeVisible}
                onHide={() => setDeleteTypeVisible(false)}
            />
            <DeleteBrand
                show={deleteBrandVisible}
                onHide={() => setDeleteBrandVisible(false)}
            />
        </Container>
    );
};

export default Admin;
