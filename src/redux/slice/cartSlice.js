import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setNotification } from './notificationSlice';

const initialState = {
    items: [],
    status: 'null',
    error: null,
};

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async (product, {dispatch, rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/carts/add', product); 
            dispatch(setNotification({ message: 'Sản phẩm đã được thêm vào giỏ hàng!', type: 'success' }));
            return response.data?.products; 
        } catch (error) {
            dispatch(setNotification({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng!', type: 'error' }));
            return rejectWithValue(error);
        }
    }
);

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (id) => {
        const response = await axios.get(`http://localhost:8080/api/v1/carts/${id}`); 
        return response.data?.products; 
    }
);
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload
            })
            .addCase(getCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
const cartReducer = cartSlice.reducer;
export  {cartReducer};