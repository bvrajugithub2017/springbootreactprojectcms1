import axios from 'axios';

const MY_SPRING_BOOT_REST_API_URL = "http://localhost:8080/api/customers";

class CustomerService{

    getAllCustomers(){
        return axios.get(MY_SPRING_BOOT_REST_API_URL);
    }

    createCustomer(customer){
        return axios.post(MY_SPRING_BOOT_REST_API_URL, customer);
    }

    getCustomerById(customerId){
        return axios.get(MY_SPRING_BOOT_REST_API_URL + "/" + customerId);
    }

    updateCustomer(customerId, customer){
        return axios.put(MY_SPRING_BOOT_REST_API_URL + "/" + customerId, customer);
    }    

    deleteCustomer(customerId){
        return axios.delete(MY_SPRING_BOOT_REST_API_URL + "/" + customerId);
    }
}

const customerServiceObj = new CustomerService();

export default customerServiceObj;