package com.bancotransfer.banco_transfer_spring_boot.validator;

import static java.lang.annotation.ElementType.TYPE;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TransferSameAccountValidator.class)
public @interface TransferSameAccount {
    String message() default "No se puede realizar una transferencia a la misma cuenta. Por favor, elige una cuenta diferente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
