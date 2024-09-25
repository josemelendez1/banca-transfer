package com.bancotransfer.banco_transfer_spring_boot.dto;

import com.bancotransfer.banco_transfer_spring_boot.validator.ExistAccount;
import com.bancotransfer.banco_transfer_spring_boot.validator.TransferLimit;
import com.bancotransfer.banco_transfer_spring_boot.validator.TransferSameAccount;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@GroupSequence({TransferDto.class, FirstValidationTransferDto.class, SecondValidationTransferDto.class, ThirdValidationTransferDto.class})
@TransferSameAccount(groups = SecondValidationTransferDto.class)
@TransferLimit(groups = ThirdValidationTransferDto.class)
public class TransferDto {
    @Min(value = 1, message = "El monto a transferir deber ser mayor que cero (0).", groups = FirstValidationTransferDto.class)
    private Double amount;

    private String description;

    @NotBlank(message = "La cuenta de origen es obligatoria.", groups = FirstValidationTransferDto.class)
    @ExistAccount(groups = SecondValidationTransferDto.class)
    private String originAccount;
    
    @NotBlank(message = "La cuenta de destino es obligatoria.", groups = FirstValidationTransferDto.class)
    @ExistAccount(groups = SecondValidationTransferDto.class)
    private String destAccount;
}

interface FirstValidationTransferDto {}
interface SecondValidationTransferDto {}
interface ThirdValidationTransferDto {}