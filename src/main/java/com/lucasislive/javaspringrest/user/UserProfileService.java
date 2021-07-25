package com.lucasislive.javaspringrest.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLOutput;
import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {

    private UserProfileRepository userProfileRepository;

    @Autowired
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public List<UserProfile> getUserProfiles() {
        return userProfileRepository.findAll();
    }

    public UserProfile getUserProfile(Long userProfileId) {
        UserProfile foundUserProfile = userProfileRepository.findById(userProfileId)
                .orElseThrow(() -> new IllegalStateException("UserProfile Id " + userProfileId + " does not exist in the database"));

        return foundUserProfile;
    }

    public void addUserProfile(UserProfile userProfile) {
        System.out.println("Saving user profile to database");

        // Check if username has been taken by another user
        Optional<UserProfile> userProfileByUsername = userProfileRepository.findUserProfileByUsername(userProfile.getUsername());
        if (userProfileByUsername.isPresent()) {
            throw new IllegalStateException("Username already taken");
        }

        // Check if email has been taken by another user
        Optional<UserProfile> userProfileByEmail = userProfileRepository.findUserProfileByEmail(userProfile.getEmail());
        if (userProfileByEmail.isPresent()) {
            throw new IllegalStateException("Email already taken");
        }

        userProfileRepository.save(userProfile);
    }

    @Transactional
    public void updateUserProfile(Long userProfileId, UserProfile userProfile) {
        // Check id exists
        System.out.println("Checking if UserProfile Id exists");
        UserProfile foundUserProfile = userProfileRepository.findById(userProfileId)
                .orElseThrow(() -> new IllegalStateException("UserProfile Id " + userProfileId + " does not exist in the database"));

        // Check if username has been taken by another user
        // If submitted username is different from the email from the database
        if (!userProfile.getUsername().equals(foundUserProfile.getUsername())) {
            Optional<UserProfile> userProfileByUsername = userProfileRepository.findUserProfileByUsername(userProfile.getUsername());
            if (userProfileByUsername.isPresent()) {
                throw new IllegalStateException("Username already taken");
            }
        }

        // Check if email has been taken by another user
        // If submitted email is different from the email from the database
        if (!userProfile.getEmail().equals(foundUserProfile.getEmail())) {
            Optional<UserProfile> userProfileByEmail = userProfileRepository.findUserProfileByEmail(userProfile.getEmail());
            if (userProfileByEmail.isPresent()) {
                throw new IllegalStateException("Email already taken");
            }
        }

        foundUserProfile.setUsername(userProfile.getUsername());
        foundUserProfile.setFirstName(userProfile.getFirstName());
        foundUserProfile.setLastName(userProfile.getLastName());
        foundUserProfile.setEmail(userProfile.getEmail());
        foundUserProfile.setDob(userProfile.getDob());
        foundUserProfile.setGender(userProfile.getGender());
    }

    public void deleteUserProfile(Long userProfileId) {
        System.out.println("Checking if UserProfile Id exists");
        boolean userProfileExists = userProfileRepository.existsById(userProfileId);
        if (!userProfileExists)
            throw new IllegalStateException("UserProfile Id " + userProfileId + " does not exist in the database");
        userProfileRepository.deleteById((userProfileId));
    }

}
