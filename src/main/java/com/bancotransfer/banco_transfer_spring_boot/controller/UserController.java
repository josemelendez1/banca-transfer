package com.bancotransfer.banco_transfer_spring_boot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bancotransfer.banco_transfer_spring_boot.dto.LoginUserDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.RegisterUserDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.UserDto;
import com.bancotransfer.banco_transfer_spring_boot.service.UserService;
import com.github.javafaker.Faker;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserDto register(@Valid @RequestBody RegisterUserDto user) {
        return userService.register(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<Token> login(@Valid @RequestBody LoginUserDto user) {
        String token = userService.loginAndGetToken(user.getUsername(), user.getPassword());
        if (token != null) {
            return new ResponseEntity<>(new Token(token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Token("El nombre de usuario o la contraseña son incorrectas, intentelo nuevamente."), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/authenticated")
    public UserDto userName(Authentication authentication) {
        return userService.getAuthenticatedUser(authentication);
    }

    @PostMapping("/faker")
    public List<UserDto> postMethodName() {
        
        Faker faker = new Faker(new Locale("es", "ES"));

        String username;
        List<UserDto> userDtos = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            username = faker.name().fullName();
            UserDto userDto = userService.faker(username, username, (i < 5) ? "ROLE_USER" : "ROLE_ADMIN");
            userDtos.add(userDto);
        }

        return userDtos;
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

class Token {
    private String token;

    Token(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
