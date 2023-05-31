import React, {useState, useEffect } from 'react'
import customerServiceObj from '../services/CustomerService';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

function ListCustomersComponent() {

    const [customers, setCustomers] = useState([]);

    //remember that React Hooks can't be used in Class Component
    useEffect( () => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        customerServiceObj.getAllCustomers().then((response) => {
            setCustomers(response.data);  
        });
    }

    //newly added method
    const deleteCustomer = (empId) => {
        customerServiceObj.deleteCustomer(empId).then( (response) => {
            getAllCustomers();
            toast("Record deleted!");
            
        })
    }

  return (
    <div className="container">
            <h2 className = "text-center"> List Customers </h2>
            {/* Newly added button */}
            <Link to="/add-customer" className="btn btn-primary mb-2">Add Customer</Link>
            <table style = {{marginTop:"30px"}}  className="table table-bordered table-striped">
                <thead style = {{backgroundColor:"gold"}} >
                    <th> Customer Id </th>
                    <th> Customer Name </th>
                    <th> Customer's City </th>
                    <th> Phone Number </th>
                    <th> Actions </th>
                </thead>

                <tbody>
                    {
                        customers.map(
                            customer => 
                            <tr key={customer.cid} >
                                <td>{customer.cid}</td>
                                <td>{customer.cname}</td>
                                <td>{customer.city}</td>
                                <td>{customer.phone}</td>
                                <td style={{textAlign: 'center'}}>
                                   {/* newly added - two lines */}
                                   <Link className="btn btn-info" to={`/edit-customer/${customer.cid}`}>Update</Link>
                                   <button className = "btn btn-danger" onClick={() => deleteCustomer(customer.cid)} style = {{marginLeft:"10px"}}>Delete</button>
                                </td>
                            </tr>
                        )        
                    }
                </tbody>
            </table>
        </div>
  )
}

export default ListCustomersComponent