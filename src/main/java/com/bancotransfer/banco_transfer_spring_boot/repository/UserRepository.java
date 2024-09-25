package com.bancotransfer.banco_transfer_spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bancotransfer.banco_transfer_spring_boot.entity.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
