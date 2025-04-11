package com.music.note.recommend.repository.recommend.like.music;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import com.music.note.recommend.domain.like.music.RecommendMusicLikes;

@Repository
public interface RecommendMusicLikeRepository extends MongoRepository<RecommendMusicLikes, String> {
	@Query("{ '_id': ?0 }")
	@Update("{ '$addToSet': { 'liked_music_ids': ?1 } }")
	void addMusicLike(String recommendMusicLikesId, String musicId);

	@Query("{ '_id': ?0 }")
	@Update("{ '$addToSet': { 'liked_music_spotify_music_id': ?1 } }")
	void addMusicLikeBySpotifyMusicId(String recommendMusicLikesId, String spotifyMusicId);

	Optional<RecommendMusicLikes> findByUserId(String userId);

	// @Query("{ '_id': ?0 }")
	// @Update("{ '$pull': { 'liked_music_ids': ?1 } }")
	// void removeMusicLike(String recommendMusicLikesId, String musicId);

	@Query("{ '_id': ?0 }")
	@Update("{ '$pull': { 'liked_music_spotify_music_id': ?1 } }")
	void removeMusicLike(String recommendMusicLikesId, String spotifyMusicId);
}
