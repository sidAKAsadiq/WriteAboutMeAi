import {configureStore} from '@reduxjs/toolkit'
import auth_reducer from './auth_slice.js'


const store = configureStore({
    reducer:{
        auth : auth_reducer,
    }
})

export default store