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
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar(){

  return (
    <>
      <div className="sidebar"><br/><br/>
        <Link to={`/addCustomer`}>Add Customer</Link><br/><br/><br/>
        <Link to={`/customerList`}>Customer List</Link>
      </div>
    </>
  );
}
export default Sidebar;