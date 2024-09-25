package com.bancotransfer.banco_transfer_spring_boot.dto;

import com.bancotransfer.banco_transfer_spring_boot.validator.WithDrawLimit;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@GroupSequence({WithDrawAccountDto.class, FirstValidationWithDrawAccountDto.class, SecondValidationWithDrawAccountDto.class})
@WithDrawLimit(groups = SecondValidationWithDrawAccountDto.class)
public class WithDrawAccountDto {
    private String accountNumber;
    
    @Min(value = 1, message = "El monto a retirar deber ser mayor que cero (0).", groups = FirstValidationWithDrawAccountDto.class)
    private Double amount;
}

interface FirstValidationWithDrawAccountDto {}
interface SecondValidationWithDrawAccountDto {}