package com.bancotransfer.banco_transfer_spring_boot.validator;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bancotransfer.banco_transfer_spring_boot.entity.User;
import com.bancotransfer.banco_transfer_spring_boot.service.UserService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class UniqueUserNameValidator implements ConstraintValidator<UniqueUserName, String> {
    
    @Autowired
    private UserService userService;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        if (userService == null) {
            return true;
        }
        
        if (username == null) {
            return false;
        }

        Optional<User> user = userService.findByUserName(username);
        return user.isEmpty();
    }
}
