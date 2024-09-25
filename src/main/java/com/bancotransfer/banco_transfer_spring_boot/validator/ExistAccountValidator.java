package com.bancotransfer.banco_transfer_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.service.AccountService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistAccountValidator implements ConstraintValidator<ExistAccount, String> {

    @Autowired
    private AccountService accountService;

    @Override
    public boolean isValid(String accountNumber, ConstraintValidatorContext context) {
        if (accountService == null) {
            return true;
        }
        
        if (accountNumber == null) {
            return false;
        }

        Account account = accountService.findByAccountNumber(accountNumber);

        return account != null;
    }   
}
