//src/redux/slices/productSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '../../utils/api'

const initialState = {
    products: [],
    status: 'idle',
    error: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
            state.status = 'succeeded'
        },
        setLoading: (state) => {
            state.status = 'loading'
        },
        setError: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(p => p.id === action.payload.id)
            if (index !== -1) {
                state.products[index] = action.payload
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload)
        }
    }
})

// Async action to fetch products
export const loadProducts = () => async (dispatch) => {
    try {
        dispatch(setLoading())
        const products = await fetchProducts()
        dispatch(setProducts(products))
    } catch (err) {
        dispatch(setError(err.message))
    }
}

export const {
    setProducts,
    setLoading,
    setError,
    addProduct,
    updateProduct,
    deleteProduct
} = productSlice.actions

export default productSlice.reducer