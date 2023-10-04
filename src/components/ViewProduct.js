import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './list.css';
import { deleteProduct } from '../store/productSlice';
import axios from 'axios';

function ViewProduct() {
  const { id } = useParams();
  const { customers } = useSelector((state) => state.customers);
  const customer = customers.find((c) => c.id === parseInt(id, 10));
  const dispatch = useDispatch();

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  const handleDeleteProduct = (id) => {
    // Send a DELETE request to remove the customer at the backend
    axios
      .delete(`http://localhost:8888/customers/products/${id}`)
      .then(() => {
        // Dispatch the action to delete the customer from your Redux store
        dispatch(deleteProduct(id));
        // console.log(id);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="customer-list-container">
      <h2>Customer Details</h2>
      <table  className="customer-table">
        <tr>
            <td>CustomerId: {customer.id}</td>
            <td>Name: {customer.customerName}</td>
            <td>Address: {customer.address}</td>
            <td>Contact: {customer.contact}</td>
        </tr>
      </table><br/>
      <h3>Products</h3>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {customer.products ? (
          customer.products.map((product, index) => (
            <tr key={index}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.productDesc}</td>
                <td>{product.productPrice}</td>
                <td>{product.rating}</td>
                <td>
                  <Link to={`/editCustomer/${customer.id}`}>Update</Link>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
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
      <Link to="/">Back to Customer List</Link>
    </div>
  );
}

export default ViewProduct;
