package com.music.note.main.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import com.music.note.common.exception.exception.common.ErrorCode;
import com.music.note.common.exception.exception.domain.music.SpotifyUnauthorizedException;
import com.music.note.kafkaeventmodel.dto.MusicDto;
import com.music.note.main.converter.SpotifyTrackConverter;
import com.music.note.main.dto.SpotifyRecentlyPlayedResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpotifyService {
	private final RestClient restClient;

	public List<MusicDto> fetchRecentTracks(String accessToken) {
		SpotifyRecentlyPlayedResponse response = callSpotifyApi(accessToken);
		List<MusicDto> tracks = SpotifyTrackConverter.convert(response);

		Set<String> seen = new HashSet<>();
		return tracks.stream()
			.filter(track -> track.getSpotifyId() != null)
			.filter(track -> seen.add(track.getSpotifyId()))
			.collect(Collectors.toList());
	}

	private SpotifyRecentlyPlayedResponse callSpotifyApi(String accessToken) {
		try {
			return restClient.get()
				.uri("/v1/me/player/recently-played?limit=30")
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
				.header(HttpHeaders.ACCEPT_LANGUAGE, "ko")
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.body(SpotifyRecentlyPlayedResponse.class);
		} catch (HttpClientErrorException.Unauthorized ex) {
			throw new SpotifyUnauthorizedException(ErrorCode.SPOTIFY_UNAUTHORIZED);
		}
	}
}
