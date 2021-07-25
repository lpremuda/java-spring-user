package com.lucasislive.javaspringrest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// @SpringBootApplication is a combo of @Configuration, @ComponentScan, and @EnableAutoConfiguration
public class JavaSpringRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaSpringRestApplication.class, args);
	}

}
