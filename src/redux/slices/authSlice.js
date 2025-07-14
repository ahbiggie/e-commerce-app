// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('adminUser')) || null,
    token: localStorage.getItem('adminToken') || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('adminUser', JSON.stringify(action.payload.user))
            localStorage.setItem('adminToken', action.payload.token)
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('adminUser')
            localStorage.removeItem('adminToken')
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer