import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer() {
  let navigate = useNavigate();

  const { id } = useParams();

  //  console.log(id);
  useEffect(() => {
    loadCustomer();
  }, []);

  const [editCustomer, setEditCustomer] = useState({
    customerName: "",
    address: "",
    contact: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/customers/${id}`, editCustomer);
    navigate("/customerList");
  };

  const loadCustomer = async (e) => {
    const result = await axios.get(`http://localhost:8888/customers/${id}`);
    // console.log(id);
    setEditCustomer(result.data);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        {id !== null && (
          <div className="form-container">
            <h2 className="form-heading">Edit Customer</h2>
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="Name"
                value={editCustomer.customerName}
                onChange={(e) =>
                  setEditCustomer({
                    ...editCustomer,
                    customerName: e.target.value,
                  })
                }
              />
              <input
                className="form-input"
                type="text"
                placeholder="Address"
                value={editCustomer.address}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, address: e.target.value })
                }
              />
              <input
                className="form-input"
                type="text"
                placeholder="Contact"
                value={editCustomer.contact}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, contact: e.target.value })
                }
              />
              <button className="form-button">Update Customer</button>
              <button
                className="form-button cancel-button"
                onClick={()=> navigate(`/customerList`)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default EditCustomer;

// import axios from "axios";
// import React, {useState, useEffect} from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate} from "react-router-dom";
// import CustomerList from './CustomerList';

// function EditCustomer(){
//     let navigate= useNavigate();

//     const {activeEditCustomerId} = useSelector((state) => state.customers);

//     //  console.log(activeEditCustomerId);
//     useEffect(() => {
//       loadCustomer();
//     },[]);

//     const [newCustomer, setNewCustomer] = useState({
//         customerName: '',
//         address: '',
//         contact: '',
//       });

//       const onSubmit = async (e) => {
//         e.preventDefault();
//         await axios.put(`http://localhost:8888/customers/${activeEditCustomerId}`,newCustomer);
//         navigate("/");
//       }

//       const loadCustomer= async (e) => {
//         const result=await axios.get(`http://localhost:8888/customers/${activeEditCustomerId}`);
//         console.log(activeEditCustomerId);
//         setNewCustomer(result.data);
//       }

//         const handleCancelUpdate = () => {
//             // setCustomer(null);
//             setNewCustomer({
//             customerName: '',
//             address: '',
//             contact: '',
//             });
//         };

//     return (
//         <div>
//           <form onSubmit={(e)=> onSubmit(e)}>
//           {activeEditCustomerId !== null && (
//             <div className="form-container">
//               <h2 className="form-heading">Edit Customer</h2>
//               <div>
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Name"
//                   value={newCustomer.customerName}
//                   onChange={(e) => setNewCustomer({ ...newCustomer, customerName: e.target.value })}
//                 />
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Address"
//                   value={newCustomer.address}
//                   onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
//                 />
//                 <input
//                   className="form-input"
//                   type="text"
//                   placeholder="Contact"
//                   value={newCustomer.contact}
//                   onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
//                 />
//                 <button className="form-button" >
//                   Update Customer
//                 </button>
//                 <button className="form-button cancel-button" onClick={handleCancelUpdate}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//           </form>
//           {/* <button onClick={<CustomerList/>}>Back</button> */}
//         </div>

//       );
// }
// export default EditCustomer;
