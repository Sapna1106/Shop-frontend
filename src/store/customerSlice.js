import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  activeComponent: "AddCustomer",
  activeEditCustomerId: "",
};

const customerSlice = createSlice({
  name: "customers",
  initialState: initialState,
  reducers: {
    addCustomer: (state, action) => {
      console.log(action);
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
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
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== id),
      };
    },
    setCustomers: (state, action) => {
      return {
        ...state,
        customers: action.payload,
      };
    },
    setProducts: (state, action) => {
      const { customerId, products } = action.payload;
      const customerIndex = state.customers.findIndex(
        (customer) => customer.id === customerId
      );

      if (customerIndex !== -1) {
        state.customers[customerIndex].products = products;
      }
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
    deleteProduct: (state, action) => {
      const { id, pId } = action.payload;
      console.log(id);
      console.log(pId);
      const index = state.customers.findIndex((customer) => customer.id === id);
      if (index !== -1) {
        console.log("index is not null");
        state.customers[index].products = state.customers[
          index
        ].products.filter((item) => item.id !== pId);
      }
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const customerIndex = state.customers.findIndex(
        (customer) => customer.id === id
      );
      console.log(id);
      console.log(updatedProduct.id);
      console.log(customerIndex);
      if (customerIndex !== -1) {
        const updatedProducts = state.customers[customerIndex].products.map(
          (product) =>
            product.id === updatedProduct.id
              ? { ...product, ...updatedProduct }
              : product
        );

        state.customers[customerIndex].products = updatedProducts;
      }
    },
  },
});

export const {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  setCustomers,
  setProducts,
  deleteProduct,
  updateProduct,
  setActiveComponent,
  setEditCustomerId,
} = customerSlice.actions;
export default customerSlice.reducer;
