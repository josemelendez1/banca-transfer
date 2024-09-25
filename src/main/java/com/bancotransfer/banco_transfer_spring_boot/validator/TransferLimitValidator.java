package com.bancotransfer.banco_transfer_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bancotransfer.banco_transfer_spring_boot.dto.TransferDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.service.AccountService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class TransferLimitValidator implements ConstraintValidator<TransferLimit, TransferDto> {

    @Autowired
    private AccountService accountService;

    @Override
    public boolean isValid(TransferDto transferDto, ConstraintValidatorContext context) {
        
        if (accountService == null) {
            return true;
        }

        boolean isValid = transferDto != null;

        if (isValid) {
            Account account = accountService.findByAccountNumber(transferDto.getOriginAccount());
            isValid = account != null && account.getBalance() >= transferDto.getAmount();
        }

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode("transferLimit")
            .addConstraintViolation();
        }

        return isValid;
    }
    
}
