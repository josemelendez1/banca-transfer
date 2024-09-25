package com.bancotransfer.banco_transfer_spring_boot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bancotransfer.banco_transfer_spring_boot.dto.DepostiAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.TransferDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.WithDrawAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.entity.Transfer;
import com.bancotransfer.banco_transfer_spring_boot.repository.AccountRepository;
import com.bancotransfer.banco_transfer_spring_boot.repository.TransferRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransferService {
    private final AccountRepository accountRepository;
    private final TransferRepository transferRepository;
    private final AccountService accountService;

    public List<Transfer> getAllOriginTransfer(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        return transferRepository.findByOriginAccount(account);
    }

    public List<Transfer> getAllDestTransfer(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        return transferRepository.findByDestAccount(account);
    }

    public Transfer transfer(TransferDto transferDto) {
        Transfer transfer = new Transfer();
        transfer.setOriginAccount(accountRepository.findByAccountNumber(transferDto.getOriginAccount()));
        transfer.setDestAccount(accountRepository.findByAccountNumber(transferDto.getDestAccount()));
        transfer.setDescription(transferDto.getDescription());
        transfer.setAmount(transferDto.getAmount());

        Transfer savedTransfer = transferRepository.save(transfer);

        accountService.deposit(new DepostiAccountDto(savedTransfer.getDestAccount().getAccountNumber(), savedTransfer.getAmount()));
        accountService.withDraw(new WithDrawAccountDto(savedTransfer.getOriginAccount().getAccountNumber(), savedTransfer.getAmount()));

        return savedTransfer;
    }
}