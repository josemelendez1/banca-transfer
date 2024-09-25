package com.bancotransfer.banco_transfer_spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.entity.User;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByAccountNumber(String accountNumber);
    Account findByUser(User user);
}
