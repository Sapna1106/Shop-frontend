import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // customers: [
  //   { id: 1, name: 'Sapna', address: 'Dewas', contact: '42616' },
  //   { id: 2, name: 'Shona', address: 'Dewas', contact: '42616' },
  //   { id: 3, name: 'Shivi', address: 'Dewas', contact: '42616' },
  // ],
  customers:[],
};

const customerSlice = createSlice({
  name: 'customers',
  initialState: initialState, // Pass the initialState here
  reducers: {
    addCustomer: (state, action) => {
        console.log(action);
      return {
        ...state,
        customers : [...state.customers, action.payload],
    }

    },
    updateCustomer: (state, action) => {
      const { id, updatedCustomer } = action.payload;
      return {
        ...state,
        customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      ),
      };
    },
    deleteCustomer: (state, action) => {
      const id = action.payload;
      return{
        ...state,
        customers: state.customers.filter((customer) => customer.id !== id
        ),
      };
    },
    setCustomers: (state, action) => {
      return {
        ...state,
        customers: action.payload,
      };
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer, setCustomers } = customerSlice.actions;
export default customerSlice.reducer;