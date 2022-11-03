import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { pageSelected } from '../api/deviceSlice';

const Pages = () => {
    const totalCount = useSelector((state) => state.device.totalCount);
    const limit = useSelector((state) => state.device.limit);
    const currentPage = useSelector((state) => state.device.currentPage);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];
    const dispatch = useDispatch();

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className='mt-5'>
            {pages.map((page) => (
                <Pagination.Item
                    active={page === currentPage}
                    key={page}
                    onClick={() => {
                        dispatch(pageSelected(page));
                    }}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default Pages;
