import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import customerServiceObj from '../services/CustomerService';

import { toast } from 'react-toastify';

function AddCustomerComponent() {

    const [cname, setCname] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    //These setter methods would be executed as and when
    //the data is entered in the form via the onChange() event

    //const history = useHistory();
    const history = useNavigate();
    //the useHistory() hook accesses the ReactRouter history object and navigates to the other routers using push
    

    const {id} = useParams(); 
    //useParams hooks lets us access the parameters of the current route.

    const saveOrUpdateCustomer = (event) => {

        event.preventDefault();

        const customer = {cname, city, phone};
        //fetch the form data from the attributes

        //If "Update" button is pressed, the route contains "id"
        if(id){
            customerServiceObj.updateCustomer(id, customer).then( (response) => {
                history("/customers"); //route for ListCustomersComponent
                //after updating the data in the database, go back to the
                //page where it has come from
                toast("Record updated successfully");
                
            })
        }
        else{
            customerServiceObj.createCustomer(customer).then( (response) => {
                history("/customers");
                toast("Record added successfully");
                
            })
        }
    }

    //As soon as AddCustomerComponent is displayed, the form should be
    //populated with a particular Customer's data if "Update" button is
    //clicked, otherwise the form should contain blank data if "Add Customer" button
    //is clicked
    useEffect( () => {
        //toast("Test toast message");
        //just to see if the toast is displayed when the component renders.
        customerServiceObj.getCustomerById(id).then( (response) => {
            setCname(response.data.cname);
            setCity(response.data.city);
            setPhone(response.data.phone);                
        }).catch(error => {
            console.log("Error in displayed Customer data: " + error);
        })

    }, []);

    const title = () => {
         if(id){
            return <h2 className='text-center'>Update Customer</h2>
         }
         else{
            return <h2 className='text-center'>Add Customer</h2>
         }   
    }

  return (
    <div>
        <br/><br/>
        <div className='container'>
            <div className='row'>
                <div className = "card col-md-6 offset-md-3 offset-md-3" >
                    {
                        title()
                    }

                    <div className="card-body">
                        <form>
                            {/* Customer Name */}
                            <div className = "form-group mb-2">
                                <label className = "form-label"> Customer Name :</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter Customer name"
                                    name = "cname"
                                    className = "form-control"
                                    value = {cname}
                                    onChange = {(e) => setCname(e.target.value)}
                                >
                                </input>
                            </div>

                            {/* Customer's City */}
                            <div className = "form-group mb-2">
                                <label className = "form-label"> Customer's City :</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter Customer City"
                                    name = "city"
                                    className = "form-control"
                                    value = {city}
                                    onChange = {(e) => setCity(e.target.value)}
                                >
                                </input>
                            </div>

                            {/* Phone Number */}
                            <div className = "form-group mb-2">
                                <label className = "form-label"> Phone</label>
                                <input
                                    type = "phone"
                                    placeholder = "Enter Phone Number"
                                    name = "phone"
                                    className = "form-control"
                                    value = {phone}
                                    onChange = {(e) => setPhone(e.target.value)}
                                >
                                </input>
                            </div>

                            <button className='btn btn-primary' style = {{marginRight:"10px"}} onClick={(e) => saveOrUpdateCustomer(e)}>Submit</button>
                            <Link to="/customers" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>    
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AddCustomerComponent