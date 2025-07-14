// src/redux/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }

            state.totalQuantity += 1
            state.totalAmount += action.payload.price
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload
            const existingItem = state.items.find(item => item.id === itemId)

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== itemId)
                } else {
                    existingItem.quantity -= 1
                }

                state.totalQuantity -= 1
                state.totalAmount -= existingItem.price
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const existingItem = state.items.find(item => item.id === id)

            if (existingItem) {
                const diff = quantity - existingItem.quantity
                state.totalQuantity += diff
                state.totalAmount += diff * existingItem.price
                existingItem.quantity = quantity
            }
        },
        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer