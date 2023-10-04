import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // customers: [
  //   { id: 1, name: 'Sapna', address: 'Dewas', contact: '42616' },
  //   { id: 2, name: 'Shona', address: 'Dewas', contact: '42616' },
  //   { id: 3, name: 'Shivi', address: 'Dewas', contact: '42616' },
  // ],
  customers:[],
  activeComponent:'AddCustomer',
  activeEditCustomerId: '',
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
    setActiveComponent: (state, action) => {
      return {
        ...state,
        activeComponent: action.payload,
      };
    },
    setEditCustomerId: (state, action) => {
      return {
        ...state,
        activeEditCustomerId: action.payload,
      };
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer, setCustomers, setActiveComponent, setEditCustomerId } = customerSlice.actions;
export default customerSlice.reducer;