package com.lucasislive.javaspringrest.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    List<UserProfile> findByLastName(String lastName);

    @Query("SELECT u FROM UserProfile u WHERE u.username = ?1")
    Optional<UserProfile> findUserProfileByUsername(String username);

    @Query("SELECT u FROM UserProfile u WHERE u.email = ?1")
    Optional<UserProfile> findUserProfileByEmail(String email);

}
