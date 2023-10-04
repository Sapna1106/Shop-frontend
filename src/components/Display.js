import React from 'react';
import AddCustomer from './AddCustomer';
import CustomerList from './CustomerList';
import EditCustomer from './EditCustomer';

const Display = (props)=>{
    const {display}=props;
      
    return(
        <div>
            {display === 'AddCustomer' && <AddCustomer/>}
            {display === 'CustomerList' && <CustomerList />}
            {display === 'EditCustomer' && <EditCustomer/>}
        </div>
    )
}
export default Display;