package com.bvraju.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bvraju.model.Customer;

public interface CustomerDAO extends JpaRepository<Customer, Integer> {

}
