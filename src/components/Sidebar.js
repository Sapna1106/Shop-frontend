import React, { useState } from 'react';
import './Sidebar.css';
import Display from './Display';

function Sidebar(){
  const [activeComponent, setActiveComponent] = useState('AddCustomer');

  return (
          <>
          <div className="sidebar">
            <ul>
              <li onClick={() => setActiveComponent('AddCustomer')}>AddCustomer</li>
              <li onClick={() => setActiveComponent('CustomerList')}>CustomerList</li>
            </ul>
          </div>
          <div><Display display={activeComponent}/></div>
          </>
        );
}
export default Sidebar;
