package com.music.note.recommend.dto.type;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ResponseReport {
	private LocalDateTime cratedAt;
	private String reportId;
	private TypeDto typeDto;
}
