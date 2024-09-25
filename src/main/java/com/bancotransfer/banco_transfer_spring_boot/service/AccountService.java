package com.bancotransfer.banco_transfer_spring_boot.service;

import java.util.List;

import java.security.SecureRandom;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bancotransfer.banco_transfer_spring_boot.dto.AccountDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.DepostiAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.WithDrawAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.entity.User;
import com.bancotransfer.banco_transfer_spring_boot.repository.AccountRepository;
import com.bancotransfer.banco_transfer_spring_boot.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {
    
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public Account create(User user) {
        Account account = new Account();
        account.setAccountNumber(String.valueOf(Math.abs(new SecureRandom().nextLong())));
        account.setBalance(0.0);
        account.setUser(user);
        Account savedAccount = accountRepository.save(account);
        return savedAccount;
    }

    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    public Account findByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    public AccountDto getAuthenticatedAccount(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).get();
        Account account = accountRepository.findByUser(user);
        return new AccountDto(account.getAccountNumber(), account.getBalance());
    }

    public AccountDto deposit(DepostiAccountDto depostiAccountDto) {
        System.out.println(depostiAccountDto);
        Account account = accountRepository.findByAccountNumber(depostiAccountDto.getAccountNumber());
        if (account != null) {
            account.setBalance(account.getBalance() + depostiAccountDto.getAmount());
            Account updatedAccount = accountRepository.save(account);
            return new AccountDto(updatedAccount.getAccountNumber(), account.getBalance());   
        } else {
            return null;
        }
    }

    public AccountDto withDraw(WithDrawAccountDto withDrawAccountDto) {
        Account account = accountRepository.findByAccountNumber(withDrawAccountDto.getAccountNumber());
        if (account != null) {
            account.setBalance(account.getBalance() - withDrawAccountDto.getAmount());
            Account updatedAccount = accountRepository.save(account);
            return new AccountDto(updatedAccount.getAccountNumber(), account.getBalance());
        } else {
            return null;
        }
    }
}
