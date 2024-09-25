package com.bancotransfer.banco_transfer_spring_boot.dto;

import java.util.Set;

import com.bancotransfer.banco_transfer_spring_boot.entity.Authority;

import java.io.Serializable;

public class UserDto implements Serializable {
    private String username;
    private String password;
    private Set<Authority> roles;
    
    public UserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Authority> getRoles() {
        return roles;
    }

    public void setRoles(Set<Authority> roles) {
        this.roles = roles;
    }
}
