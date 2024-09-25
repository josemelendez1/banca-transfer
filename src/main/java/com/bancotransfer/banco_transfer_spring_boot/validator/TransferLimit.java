package com.bancotransfer.banco_transfer_spring_boot.validator;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import static java.lang.annotation.ElementType.TYPE;

@Target({TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TransferLimitValidator.class)
public @interface TransferLimit {
    String message() default "El monto de transferencia no debe superar el saldo actual de la cuenta. Verifica y prueba nuevamente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
