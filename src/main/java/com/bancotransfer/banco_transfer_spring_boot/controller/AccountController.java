package com.bancotransfer.banco_transfer_spring_boot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bancotransfer.banco_transfer_spring_boot.dto.AccountDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.DepostiAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.WithDrawAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.service.AccountService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/authenticated")
    public AccountDto authenticatedAccount(Authentication authentication) {
        return accountService.getAuthenticatedAccount(authentication);
    }

    @GetMapping("/")
    public List<Account> getAll() {
        return accountService.getAll();
    }

    @PostMapping("/deposit")
    public AccountDto deposit(@Valid @RequestBody DepostiAccountDto depostiAccountDto) {
        return accountService.deposit(depostiAccountDto);
    }
    
    @PostMapping("/withDraw")
    public AccountDto withDraw(@Valid @RequestBody WithDrawAccountDto withDrawAccountDto) {
        return accountService.withDraw(withDrawAccountDto);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
