package com.github.shibadog.kjivan;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class KJivanApplication {

	public static void main(String[] args) {
		SpringApplication.run(KJivanApplication.class, args);
	}

}
