import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar(){
  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar"><br/><br/>
        <h4><button onClick={()=> navigate(`/addCustomer`)}>Add Customer</button><br/><br/><br/></h4>
        <h4><button onClick={()=> navigate(`/customerList`)}>Customer List</button></h4>
      </div>
    </>
  );
}
export default Sidebar;

// import React from "react";
// import "./Sidebar.css";
// import Display from "./Display";
// import { useDispatch, useSelector } from "react-redux";
// import { setActiveComponent } from "../store/customerSlice";

// function Sidebar() {
//   const dispatch = useDispatch();
//   // const [activeComponent, setActiveComponent] = useState('AddCustomer');
//   const { activeComponent } = useSelector((state) => state.customers);

//   return (
//     <>
//       <div className="sidebar">
//         <ul>
//           <li onClick={() => dispatch(setActiveComponent("AddCustomer"))}>
//             AddCustomer
//           </li>
//           <li onClick={() => dispatch(setActiveComponent("CustomerList"))}>
//             CustomerList
//           </li>
//         </ul>
//       </div>
//       <div>
//         <Display display={activeComponent} />
//       </div>
//     </>
//   );
// }
// export default Sidebar;
