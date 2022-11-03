import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    createBrand,
    createType,
    fetchBrands,
    fetchTypes,
    fetchDevices,
    createDevice,
    deleteType,
} from './axios/deviceApi';

const initialState = {
    types: [],
    brands: [],
    devices: [],
    selectedType: {},
    selectedBrand: {},
    currentPage: 1,
    totalCount: 0,
    limit: 8,
};

export const addType = createAsyncThunk('device/addType', async ({ type }) => {
    return await createType(type);
});

export const getTypes = createAsyncThunk('device/getTypes', async () => {
    return await fetchTypes();
});

export const addBrand = createAsyncThunk(
    'device/addBrand',
    async ({ brand }) => {
        return await createBrand(brand);
    }
);

export const getBrands = createAsyncThunk('device/getBrands', async () => {
    return await fetchBrands();
});

export const getDevices = createAsyncThunk(
    'device/getDevices',
    async ({ typeId, brandId, page, limit }) => {
        return await fetchDevices(typeId, brandId, page, limit);
    }
);

export const addDevice = createAsyncThunk('device/addDevice', async (data) => {
    return await createDevice(data);
});

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        typeSelected: (state, action) => {
            state.selectedType = action.payload;
            state.currentPage = 1;
        },
        brandSelected: (state, action) => {
            state.selectedBrand = action.payload;
            state.currentPage = 1;
        },
        pageSelected: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addType.fulfilled, (state, action) => {
                state.types.push(action.payload);
            })
            .addCase(getTypes.fulfilled, (state, action) => {
                state.types = action.payload;
            })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.brands.push(action.payload);
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.devices = action.payload.rows;
                state.totalCount = action.payload.count;
            })
            .addCase(addDevice.fulfilled, (state, action) => {
                state.devices.push(action.payload);
            });
    },
});

const { reducer, actions } = deviceSlice;

export default reducer;

export const { typeSelected, brandSelected, pageSelected } = actions;
