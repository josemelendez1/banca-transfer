package com.bancotransfer.banco_transfer_spring_boot.validator;

import com.bancotransfer.banco_transfer_spring_boot.dto.TransferDto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TransferSameAccountValidator implements ConstraintValidator<TransferSameAccount, TransferDto> {

    @Override
    public boolean isValid(TransferDto transferDto, ConstraintValidatorContext context) {
        boolean isValid = !transferDto.getOriginAccount().equals(transferDto.getDestAccount());

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode("sameAccount")
            .addConstraintViolation();
        }

        return isValid;
    }
    
}
