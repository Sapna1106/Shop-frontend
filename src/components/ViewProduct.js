import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './list.css';
import { deleteProduct, setProducts } from '../store/customerSlice';
import axios from 'axios';

function ViewProduct() {
  const { id } = useParams();
  // console.log(id);
  const { customers } = useSelector((state) => state.customers);
  const customer = customers.find((c) => c.id === parseInt(id, 10));
  const dispatch = useDispatch();

  useEffect(() => {
    loadProduct();
  },[id]);

  const loadProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/customers/${id}/products`
      );
      const products = response.data;
      dispatch(setProducts({ customerId: parseInt(id, 10), products }));
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!customer) {
    return <div>Customer not found: {id}</div>;
  }

  const handleDeleteProduct = (pId) => {
    axios
      .delete(`http://localhost:8888/customers/products/${pId}`)
      .then(() => {
        console.log("hii");
        dispatch(deleteProduct({id,pId}));
        console.log("hlw");
        // navigate(`/viewProduct/${id}`);
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
                  <Link to={`/editProduct/${customer.id}/products/${product.id}`}>Update</Link>
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
      <Link to="/customerList">Back to Customer List</Link>
    </div>
  );
}

export default ViewProduct;
