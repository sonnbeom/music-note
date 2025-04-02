package com.music.note.musictype.consumer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

	@Value("${python.base-url}")
	private String baseUrl;

	@Bean
	public RestClient restClient() {
		return RestClient.builder()
			.baseUrl(baseUrl)
			.build();
	}
}
