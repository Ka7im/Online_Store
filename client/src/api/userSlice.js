import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, registration, check } from '../api/axios/userApi';
import { SHOP_ROUTE } from '../utils/consts';

const initialState = {
    isAuth: false,
    user: {},
    isLoading: true,
};

export const signIn = createAsyncThunk(
    'user/signIn',
    async ({ isLogin, email, password, navigate }, thunkAPI) => {
        try {
            let data;

            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }

            navigate(SHOP_ROUTE);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const checkAuth = createAsyncThunk('user/check', async () => {
    return await check();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        unauthorized: (state) => {
            state.isAuth = false;
            state.user = {};
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                return {
                    ...state,
                    user: action.payload,
                    isAuth: true,
                };
            })
            .addCase(signIn.rejected, (state, action) => {
                alert(action.payload);
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
            }),
});

const { actions, reducer } = userSlice;

export default reducer;

export const { unauthorized } = actions;
