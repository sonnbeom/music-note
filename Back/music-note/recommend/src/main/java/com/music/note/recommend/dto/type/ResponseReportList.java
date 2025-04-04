package com.music.note.recommend.dto.type;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ResponseReportList {
	private List<ResponseReport> responseTypeWithReportIds = new ArrayList<>();
	private int listSize;

	public void allocateSize(){
		this.listSize = responseTypeWithReportIds.size();
	}
}

