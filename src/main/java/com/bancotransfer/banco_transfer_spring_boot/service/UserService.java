package com.bancotransfer.banco_transfer_spring_boot.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Arrays;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bancotransfer.banco_transfer_spring_boot.dto.RegisterUserDto;
import com.bancotransfer.banco_transfer_spring_boot.dto.UserDto;
import com.bancotransfer.banco_transfer_spring_boot.entity.Authority;
import com.bancotransfer.banco_transfer_spring_boot.entity.User;
import com.bancotransfer.banco_transfer_spring_boot.repository.AuthorityRepository;
import com.bancotransfer.banco_transfer_spring_boot.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    
    private static final String AUTHORITY_USER = "ROLE_USER";
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AccountService accountService;
    private AuthenticationManager authenticationManager;

    public UserDto register(RegisterUserDto registerUserDto) {
        User user = new User();
        user.setUsername(registerUserDto.getUsername());
        user.setPassword(registerUserDto.getPassword());

        Set<Authority> Authorities = new HashSet<>(Arrays.asList(getAuthority(AUTHORITY_USER)));
        user.setAuthorities(Authorities);
        
        String unHasedPassword = user.getPassword();
        String hashedPassword = passwordEncoder.encode(unHasedPassword);
        user.setPassword(hashedPassword);
        
        User savedUser = userRepository.save(user);

        accountService.create(savedUser);
        
        return new UserDto(savedUser.getUsername(), unHasedPassword);
    }

    public UserDto faker(String username, String password, String authority) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));

            Set<Authority> Authorities = new HashSet<>(Arrays.asList(getAuthority(authority)));
            user.setAuthorities(Authorities);

            User savedUser = userRepository.save(user);

            accountService.create(savedUser);

            UserDto userDto = new UserDto(savedUser.getUsername(), savedUser.getPassword());
            userDto.setRoles(savedUser.getAuthorities());

            return userDto;
        } else {
            return null;
        }
    }

    public String loginAndGetToken(String username, String password) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            return tokenProvider.createToken(authentication);
        } catch (Exception e) {
            return null;
        }
    }

    public UserDto getAuthenticatedUser(Authentication authentication) {
        User user = findByUserName(authentication.getName()).get();
        if (user != null) {
            UserDto userDto = new UserDto(user.getUsername(), user.getPassword());
            userDto.setRoles(user.getAuthorities());
            return userDto;
        } else {
            return null;
        }
    }

    public Optional<User> findByUserName(String name) {
        return this.userRepository.findByUsername(name);
    }

    private Authority getAuthority(String authority) {
        Authority entityAuthority = authorityRepository.findByAuthority(authority);
        if (entityAuthority != null) {
            return entityAuthority;
        } else {
            return authorityRepository.save(new Authority(authority));
        }
    }
}
