import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    createBrand,
    createType,
    fetchBrands,
    fetchTypes,
    fetchDevices,
    createDevice,
    deleteType,
    deleteBrand,
    createBasketDevice,
    increaseBasketDevice,
    getBasketDevices,
} from './axios/deviceApi';

const initialState = {
    types: [],
    brands: [],
    devices: [],
    basket: [],
    selectedType: {},
    selectedBrand: {},
    currentPage: 1,
    totalCount: 0,
    limit: 8,
};

export const getDevicesInBasket = createAsyncThunk(
    'device/getDevicesInBasket',
    async () => {
        return await getBasketDevices();
    }
);

export const createDeviceInBasket = createAsyncThunk(
    'device/createDeviceInBasket',
    async (device) => {
        return await createBasketDevice(device);
    }
);

export const increaseDeviceInBasket = createAsyncThunk(
    'device/increaseDeviceInBasket',
    async (deviceId) => {
        return await increaseBasketDevice({ deviceId });
    }
);

export const addType = createAsyncThunk('device/addType', async (type) => {
    return await createType(type);
});

export const removeType = createAsyncThunk('device/removeType', async (id) => {
    return await deleteType(id);
});

export const getTypes = createAsyncThunk('device/getTypes', async () => {
    return await fetchTypes();
});

export const addBrand = createAsyncThunk('device/addBrand', async (brand) => {
    return await createBrand(brand);
});

export const removeBrand = createAsyncThunk(
    'device/removeBrand',
    async (id) => {
        return await deleteBrand(id);
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
            })
            .addCase(removeType.fulfilled, (state, action) => {
                const index = state.types.indexOf(action.payload);
                state.types.splice(index, 1);
            })
            .addCase(removeBrand.fulfilled, (state, action) => {
                const index = state.brands.indexOf(action.payload);
                state.brands.splice(index, 1);
            })
            .addCase(createDeviceInBasket.fulfilled, (state, action) => {
                state.basket.push(action.payload);
            })
            .addCase(increaseDeviceInBasket.fulfilled, (state, action) => {
                state.basket = state.basket.map((item) => {
                    if (action.payload.deviceId == item.deviceId) {
                        return { ...item, amount: action.payload.amount };
                    }

                    return item;
                });
            })
            .addCase(getDevicesInBasket.fulfilled, (state, action) => {
                state.basket = action.payload;
            });
    },
});

const { reducer, actions } = deviceSlice;

export default reducer;

export const { typeSelected, brandSelected, pageSelected } = actions;
