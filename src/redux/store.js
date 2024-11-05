import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slice/cartSlice'
import { notificationReducer } from './slice/notificationSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        notification: notificationReducer,
    },
})