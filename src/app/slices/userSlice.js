
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {}
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { login, logout} = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer