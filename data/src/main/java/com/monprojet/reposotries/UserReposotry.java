package com.monprojet.reposotries;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monprojet.entities.User;

public interface UserReposotry extends JpaRepository<User, Integer>  {

}
