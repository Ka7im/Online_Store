import { $authHost, $host } from './index';

export const getBasketDevices = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
};

export const increaseBasketDevice = async (deviceId) => {
    const { data } = await $authHost.patch('api/basket/increase', deviceId);
    return data;
};

export const decreaseBasketDevice = async (deviceId) => {
    const { data } = await $authHost.patch('api/basket/decrease', deviceId);
    return data;
};

export const createBasketDevice = async (device) => {
    const { data } = await $authHost.post('api/basket', device);
    return data;
};

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

export const deleteType = async (id) => {
    const { data } = await $authHost.delete('api/type', { data: { id } });
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand);
    return data;
};

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete('api/brand', { data: { id } });
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand');
    return data;
};

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device);
    return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId,
            brandId,
            page,
            limit,
        },
    });
    return data;
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id);
    return data;
};
