package com.bancotransfer.banco_transfer_spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.entity.Transfer;
import java.util.List;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
    List<Transfer> findByOriginAccount(Account originAccount);
    List<Transfer> findByDestAccount(Account destAccount);
}
