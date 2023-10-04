import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCustomer, setCustomers } from '../store/customerSlice';
import './list.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerList() {
  const { customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from the backend and store it in the Redux store using the setCustomers action
    axios
      .get('http://localhost:8888/customers/')
      .then((response) => {
        // alert(" test "+ response);
        dispatch(setCustomers(response.data));
        // console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, [dispatch, customers]);

  if (!customers) {
    return <div>Loading...</div>; 
  }

  const handleDeleteCustomer = (id) => {
    // Send a DELETE request to remove the customer at the backend
    axios
      .delete(`http://localhost:8888/customers/${id}`)
      .then(() => {
        // Dispatch the action to delete the customer from your Redux store
        dispatch(deleteCustomer(id));
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>CustomerId</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.customerName}</td>
                <td>{customer.address}</td>
                <td>{customer.contact}</td>
                <td>
                  <Link to={`/viewProduct/${customer.id}`}>View Products</Link>
                </td>
                <td>
                  <Link to={`/editCustomer/${customer.id}`}>Update</Link>
                  <Link to={`/addProductById/${customer.id}/products`}>Add Product</Link>
                  <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No customers available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
