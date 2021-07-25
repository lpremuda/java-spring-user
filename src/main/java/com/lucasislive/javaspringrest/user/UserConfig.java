package com.lucasislive.javaspringrest.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserProfileRepository userProfileRepository) {
        return args -> {
            UserProfile lucas = new UserProfile(
                    "lpremuda",
                    "Lucas",
                    "Premuda",
                    "lucas@test.com",
                    LocalDate.of(1992, Month.APRIL, 21),
                    "Male"
            );

            UserProfile chelsea = new UserProfile(
                    "cwieland",
                    "Chelsea",
                    "Wieland",
                    "chelsea@gmail.com",
                    LocalDate.of(1995, Month.JANUARY, 2),
                    "Female"
            );

            UserProfile wilson = new UserProfile(
                    "wvolleyball",
                    "Wilson",
                    "Volleyball",
                    "wilson@yahoo.com",
                    LocalDate.of(1983, Month.JUNE, 18),
                    "Male"
            );

            userProfileRepository.saveAll(
                    List.of(lucas, chelsea, wilson)
            );

        };
    }
}
