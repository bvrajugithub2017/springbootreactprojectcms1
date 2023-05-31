package com.bvraju.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bvraju.dao.CustomerDAO;
import com.bvraju.model.Customer;
import com.bvraju.myexceptions.ResourceNotFoundException;

//@CrossOrigin("*") //from any client
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/customers")
public class CustomerController {
	
	@Autowired
	private CustomerDAO dao;
	
	//To get all the Customers
	@GetMapping
	public List<Customer> getAllCustomers(){
		return dao.findAll();
	}
	
	//To get a particular Customer useful for delete and update customer
	@GetMapping("{id}")
	public ResponseEntity<Optional<Customer>> getCustomerById(@PathVariable int id){
		Optional<Customer> customer =  dao.findById(id);
		
		customer.orElseThrow(() -> new ResourceNotFoundException("Customer doesn't exit with id: " + id));
		//If a value is present, returns the value, 
		//otherwise throws an exception produced by the exception supplying function.
		
		return ResponseEntity.ok(customer);
	}
	
	//To insert a new Customer record
	@PostMapping
	public Customer createCustomer(@RequestBody Customer customer) {
		//@RequestBody Converts JSON Object received from the client into a Customer object
		return dao.save(customer);
		
	}
	
	//To update a Customer
	@PutMapping("{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable int id, @RequestBody Customer customerNewData){
		Customer customerToUpdate =  dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer doesn't exit with id: " + id));
		
		//Optional<Customer> doesn't have setter methods
		customerToUpdate.setCname(customerNewData.getCname());
		customerToUpdate.setCity(customerNewData.getCity());
		customerToUpdate.setPhone(customerNewData.getPhone());
		
		dao.save(customerToUpdate);
		
		return ResponseEntity.ok(customerToUpdate);
	}
	
	//To delete a Customer
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable int id){
		
		Customer customerToDelete =  dao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer doesn't exit with id: " + id));
		
		dao.delete(customerToDelete);
		
		return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT); //because we have deleted it now
		
	}
}
