package com.bancotransfer.banco_transfer_spring_boot.security;

import java.util.Optional;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.bancotransfer.banco_transfer_spring_boot.entity.Authority;
import com.bancotransfer.banco_transfer_spring_boot.entity.User;
import com.bancotransfer.banco_transfer_spring_boot.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class CustomUserDetails implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username: "+ username + " not found");
        }

        String userName = user.get().getUsername();
        String password = user.get().getPassword();

        List<SimpleGrantedAuthority> grantedAuthorities = mapSimpleGrantedAuthorities(user.get().getAuthorities());
        return new org.springframework.security.core.userdetails.User(userName, password, grantedAuthorities);
    }

    private List<SimpleGrantedAuthority> mapSimpleGrantedAuthorities(Set<Authority> authorities) {
        return authorities.stream().map(Authority::getAuthority).map(SimpleGrantedAuthority::new).toList();
    }
}