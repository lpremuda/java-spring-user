package com.lucasislive.javaspringrest.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
@CrossOrigin("*")
public class UserProfileController {

    private UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public List<UserProfile> getUserProfiles() {
        System.out.println("@GetMapping called");
        return userProfileService.getUserProfiles();
    }

    @GetMapping(path="/{userProfileId}")
    public UserProfile getUserProfile(@PathVariable Long userProfileId) {
        System.out.println("@GetMapping called, id = " + userProfileId);
        return userProfileService.getUserProfile(userProfileId);
    }

    @PostMapping(
            path = "add",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public String addUserProfile(@RequestBody UserProfile userProfile) {
        System.out.println("@PostMapping called");
        System.out.println(userProfile.toString());
        userProfileService.addUserProfile(userProfile);
        String ret = "Post return";
        return ret;
    }

    @PutMapping(
            path="/{userProfileId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void updateUserProfile(@PathVariable Long userProfileId, @RequestBody UserProfile userProfile) {
        System.out.println("@PutMapping called");
        System.out.println(userProfile.toString());
        userProfileService.updateUserProfile(userProfileId, userProfile);
    }

    @DeleteMapping(path = "/{userProfileId}")
    public void deleteUserProfile(@PathVariable Long userProfileId) {
        System.out.println("@DeleteMapping called");
        userProfileService.deleteUserProfile(userProfileId);
    }

}
