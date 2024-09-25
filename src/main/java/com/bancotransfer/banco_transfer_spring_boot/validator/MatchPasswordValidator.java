package com.bancotransfer.banco_transfer_spring_boot.validator;

import com.bancotransfer.banco_transfer_spring_boot.dto.RegisterUserDto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MatchPasswordValidator implements ConstraintValidator<MatchPassword, RegisterUserDto> {
    @Override
    public boolean isValid(RegisterUserDto registerUserDto, ConstraintValidatorContext context) {
        boolean isValid = registerUserDto.getConfirmPassword() != null && registerUserDto.getConfirmPassword().equals(registerUserDto.getPassword());

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode("matchPassword")
            .addConstraintViolation();
        }

        return isValid;
    }
}
