import React, {useState} from 'react';
import AddCustomer from './AddCustomer';
import CustomerList from './CustomerList';

const Display = (props)=>{
    const {display}=props;

    return(
        <div>
            {display === 'AddCustomer' && <AddCustomer/>}
            {display === 'CustomerList' && <CustomerList />}
        </div>
    )
}
export default Display;