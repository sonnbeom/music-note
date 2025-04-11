package com.music.note.recommend.mapper.personality;

import org.springframework.stereotype.Component;

import com.music.note.recommend.dto.request.RequestLatestPersonalityReportDto;
import com.music.note.typedomain.domain.PersonalityReport;

@Component
public class PersonalityMapper {
	public RequestLatestPersonalityReportDto EntityToDto(PersonalityReport report) {
		return RequestLatestPersonalityReportDto.builder()
			.extraversion(report.getExtraversion())
			.agreeableness(report.getAgreeableness())
			.neuroticism(report.getNeuroticism())
			.conscientiousness(report.getConscientiousness())
			.openness(report.getOpenness())
			.build();
	}
}
