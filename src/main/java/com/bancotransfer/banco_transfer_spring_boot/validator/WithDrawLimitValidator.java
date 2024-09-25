package com.bancotransfer.banco_transfer_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bancotransfer.banco_transfer_spring_boot.dto.WithDrawAccountDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Account;
import com.bancotransfer.banco_transfer_spring_boot.service.AccountService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class WithDrawLimitValidator implements ConstraintValidator<WithDrawLimit, WithDrawAccountDto> {
    
    @Autowired
    private AccountService accountService;

    @Override
    public boolean isValid(WithDrawAccountDto withDrawAccountDto, ConstraintValidatorContext context) {
        if (accountService == null) {
            return true;
        }

        boolean isValid = withDrawAccountDto != null;

        if (isValid) {
            Account account = accountService.findByAccountNumber(withDrawAccountDto.getAccountNumber());

            isValid = account != null && account.getBalance() >= withDrawAccountDto.getAmount();
        }

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode("withDrawLimit")
            .addConstraintViolation();
        }

        return isValid;
    }
}
