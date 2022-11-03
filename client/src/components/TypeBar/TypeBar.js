import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { typeSelected } from '../../api/deviceSlice';
import styles from './typeBar.module.scss';

const TypeBar = () => {
    const types = useSelector((state) => state.device.types);
    const selectedType = useSelector((state) => state.device.selectedType);
    const dispatch = useDispatch();

    return (
        <ListGroup className={`${styles.ListGroup}`}>
            {types.map((type) => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={type.id === selectedType.id}
                    key={type.id}
                    onClick={() => dispatch(typeSelected(type))}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TypeBar;
