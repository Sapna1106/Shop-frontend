import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer, setCustomers } from "../store/customerSlice";
import "./list.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const { customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8888/customers/")
      .then((response) => {
        // alert(" test "+ response);
        dispatch(setCustomers(response.data));
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  });

  if (!customers) {
    return <div>Loading...</div>;
  }

  const handleDeleteCustomer = (id) => {
    axios
      .delete(`http://localhost:8888/customers/${id}`)
      .then(() => {
        dispatch(deleteCustomer(id));
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search customers by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />  ``
      <table className="customer-table">
        <thead>
          <tr>
            <th><center>CustomerId</center></th>
            <th><center>Name</center></th>
            <th><center>Address</center></th>
            <th><center>Contact</center></th>
            <th><center>Products</center></th>
            <th><center>Actions</center></th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers && filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td><center>{customer.id}</center></td>
                <td><center>{customer.customerName}</center></td>
                <td><center>{customer.address}</center></td>
                <td><center>{customer.contact}</center></td>
                <td>
                  <center><button onClick={() => navigate(`/viewProduct/${customer.id}`)}>View Product</button></center>
                </td>
                <td>
                  <center><button onClick={() => navigate(`/editCustomer/${customer.id}`)}>Update</button>
                  <button onClick={() => handleDeleteCustomer(customer.id)}>
                    Delete
                  </button>
                  <button onClick={() => navigate(`/addProductById/${customer.id}/products`)}>Add Product</button></center>
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

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteCustomer, setActiveComponent, setCustomers, setEditCustomerId } from '../store/customerSlice';
// import './list.css';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import useNavigate

// function CustomerList() {
//   const { customers } = useSelector((state) => state.customers);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch data from the backend and store it in the Redux store using the setCustomers action
//     axios
//       .get('http://localhost:8888/customers/')
//       .then((response) => {
//         dispatch(setCustomers(response.data));
//       })
//       .catch((error) => {
//         console.error('Error fetching customers:', error);
//       });
//   }, [dispatch, customers]);

//   if (!customers) {
//     return <div>Loading...</div>;
//   }

//   const handleDeleteCustomer = (id) => {
//     axios
//       .delete(`http://localhost:8888/customers/${id}`)
//       .then(() => {
//         dispatch(deleteCustomer(id));
//       })
//       .catch((error) => {
//         console.error('Error deleting customer:', error);
//       });
//   };

//   const handleOnClickUpdate = (id) => {
//     dispatch(setEditCustomerId(id));
//     dispatch(setActiveComponent('EditCustomer'));
//   }

//   return (
//     <div className="customer-list-container">
//       <h2>Customer List</h2>
//       <table className="customer-table">
//         <thead>
//           <tr>
//             <th>CustomerId</th>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Contact</th>
//             <th>Products</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers && customers.length > 0 ? (
//             customers.map((customer) => (
//               <tr key={customer.id}>
//                 <td>{customer.id}</td>
//                 <td>{customer.customerName}</td>
//                 <td>{customer.address}</td>
//                 <td>{customer.contact}</td>
//                 <td>
//                   <Link to={`/viewProduct/${customer.id}`}>View Products</Link>
//                 </td>
//                 <td>
//                   {/* <Link to={`/editCustomer/${customer.id}`}>Update</Link> */}
//                   <button onClick={()=> handleOnClickUpdate(customer.id)}>Update</button>
//                   <Link to={`/addProductById/${customer.id}/products`}>Add Product</Link>
//                   <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No customers available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CustomerList;
