package com.bancotransfer.banco_transfer_spring_boot.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DepostiAccountDto {
    private String accountNumber;
    
    @Min(value = 1, message = "El monto a depositar deber ser mayor que cero (0).")
    private Double amount;
}