import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [
    //   { id: 1, name: 'Laptop', description: 'Dell', price: '42616', rating:'4' },
    //   { id: 2, name: 'Ear-buds', description: 'Sony', price: '3000', rating:'3' },
    ],
  };

const productSlice = createSlice({
    name:'products',
    initialState: initialState,
    reducers:{
        addProduct:(state, action) => {
            return {
                ...state,
                products : [...state.products, action.payload],
            }
        },
        updateProduct:(state,action) =>{
            const {id,updatedProduct } = action.payload;

            return {
                ...state,
                products: state.products.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
              ),
              };
        },
       
            
    },
});
export const { 
    addProduct,
    updateProduct,

} = productSlice.actions;
export default productSlice.reducer;