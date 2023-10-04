import {configureStore} from '@reduxjs/toolkit';
import customerReducer from './customerSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        customers: customerReducer,
        products: productReducer,
    },
});

export default store;