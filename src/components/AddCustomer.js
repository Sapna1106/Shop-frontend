import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../store/customerSlice';
import './addForm.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const [customerData, setCustomerData] = useState({
    customerName: '', 
    address: '',
    contact: '',
  });

  let navigate= useNavigate();
  const dispatch = useDispatch();

  const handleAddCustomer = async () => {
    if (customerData.customerName && customerData.address && customerData.contact) {
      try {
        // Send a POST request to backend API to save the customer data
        const response = await axios.post('http://localhost:8888/customers/', customerData);

        //backend returns the newly added customer data with an ID
        const newCustomer = response.data;

        // Dispatch the action to add new customer to your Redux store
        dispatch(addCustomer(newCustomer));

        setCustomerData({ customerName: '', address: '', contact: '' }); 
        navigate("/");
      
      } catch (error) {
        console.error('Error saving customer data:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  return (
    <div className="add-container">
      <h2>Add Customer</h2>
      <form>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label> 
          <input
            type="text"
            name="customerName"
            value={customerData.customerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={customerData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label> 
          <input
            type="tel"
            name="contact"
            value={customerData.contact}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleAddCustomer}>Submit</button>


      </form>
    </div>
  );
}

export default AddCustomer;
