import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DeviceListItem from './DeviceListItem/DeviceListItem';

const DeviceList = () => {
    const devices = useSelector((state) => state.device.devices);

    return (
        <Row>
            {devices.map((device) => (
                <DeviceListItem key={device.id} device={device} />
            ))}
        </Row>
    );
};

export default DeviceList;
