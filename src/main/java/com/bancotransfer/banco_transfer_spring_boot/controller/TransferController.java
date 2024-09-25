package com.bancotransfer.banco_transfer_spring_boot.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bancotransfer.banco_transfer_spring_boot.dto.TransferDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Transfer;
import com.bancotransfer.banco_transfer_spring_boot.service.TransferService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/transfer")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping("/origin")
    public List<Transfer> originTransfers(@RequestParam(required = true) String accountNumber) {
        return transferService.getAllOriginTransfer(accountNumber);
    }

    @GetMapping("/dest")
    public List<Transfer> destTransfers(@RequestParam(required = true) String accountNumber) {
        return transferService.getAllDestTransfer(accountNumber);
    }

    @PostMapping("/store")
    public Transfer store(@Valid @RequestBody TransferDto transferDto) {
        return transferService.transfer(transferDto);
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
