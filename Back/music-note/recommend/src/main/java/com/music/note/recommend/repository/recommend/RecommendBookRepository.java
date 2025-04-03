package com.music.note.recommend.repository.recommend;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.music.note.recommend.domain.book.RecommendBook;

public interface RecommendBookRepository extends MongoRepository<RecommendBook, String> {
}
