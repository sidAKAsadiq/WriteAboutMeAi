import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_data : null,
    is_authenticated : null,
}

const auth_slice = createSlice({
    name : 'auth_slice',
    initialState,
    reducers : {
        login : (state,action) => {
            state.is_authenticated = true
            state.user_data = action.payload
        },
        logout : (state) => {
            state.is_authenticated = false
            state.user_data = null
        }
    }
})

export default auth_slice.reducer
export const {login , logout} = auth_slice.actions