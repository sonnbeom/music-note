import TopBar from "@/components/layout/TopBar";
import { useNavigate } from "react-router-dom";
import mascot from "@/assets/logo/mascot.webp";
import { useState, useEffect, useRef } from "react";
import "@/styles/RecommendationDetail.css";
import { useGetData, usePostData } from "@/hooks/useApi";
import { Music } from "@/features/recommend/recommendType";

export default function RecommendationMusic() {
  const titleText = "음악 추천";
  const navigate = useNavigate();
  const [musics, setMusics] = useState<Music[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const cardRef = useRef(null);
  const cardWidth = useRef(0);
  const animationRef = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  const currentMusic = musics?.[currentIndex];

  const { data, isLoading, isError } = useGetData("/recommend/music", "recommend/music");
  const { mutate: likeMusic, isError: likeMusicError } = usePostData("recommend/like/music");

  useEffect(() => {
    if (likeMusicError) {
      console.log(likeMusicError);
    }
  }, [likeMusicError]);

  useEffect(() => {
    if (data) {
      setMusics(data?.data?.musics);
    } else if (isError) {
      console.log(isError, data?.message);
    }
  }, [isError, data]);

  useEffect(() => {
    if (cardRef.current) {
      cardWidth.current = (cardRef.current as HTMLElement).offsetWidth;
    }
  }, [currentMusic]);

  // 스와이프 상태 초기화
  const resetSwipeState = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    isDragging.current = false;
    setSwiping(false);
    setDirection("");
    setOffsetX(0);

    if (cardRef.current) {
      (cardRef.current as HTMLElement).style.transition = "transform 0.3s ease";
      (cardRef.current as HTMLElement).style.transform = "translateX(0px)";

      setTimeout(() => {
        if (cardRef.current) {
          (cardRef.current as HTMLElement).style.transition = "";
        }
      }, 300);
    }
  };

  const updateCardPosition = (newOffset: number) => {
    const maxOffset = cardWidth.current * 0.15;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, newOffset));

    if (newOffset > 20) {
      setDirection("right");
    } else if (newOffset < -20) {
      setDirection("left");
    } else {
      setDirection("");
    }

    if (cardRef.current) {
      const card = cardRef.current as HTMLElement;
      card.style.transform = `translateX(${limitedOffset}px)`;
    }

    setOffsetX(limitedOffset);
  };

  // 터치/마우스 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setStartX(e.touches[0].clientX);
    isDragging.current = true;
    setSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      updateCardPosition(diffX);
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    setSwiping(false);

    if (direction === "right") {
      handleLike(musics[currentIndex].id, musics[currentIndex].recommendMusicId);
    } else if (direction === "left") {
      handleDislike();
    } else {
      resetSwipeState();
    }
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setStartX(e.clientX);
    isDragging.current = true;
    setSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const diffX = currentX - startX;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      updateCardPosition(diffX);
    });
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    setSwiping(false);

    if (direction === "right") {
      handleLike(musics[currentIndex].id, musics[currentIndex].recommendMusicId);
    } else if (direction === "left") {
      handleDislike();
    } else {
      resetSwipeState();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      resetSwipeState();
    }
  };

  const handleLike = (spotifyMusicId: string, recommendMusicId: string) => {
    if (!currentMusic) return;
    setIsLikeProcessing(true);
    likeMusic({ recommendMusicId: recommendMusicId, spotifyMusicId: spotifyMusicId });
    resetSwipeState();

    setTimeout(() => {
      goToNextMusic();
      // 스크롤 위치 초기화
      if (cardRef.current) {
        const backContent = (cardRef.current as HTMLElement).querySelector(".bg-level1");
        if (backContent) {
          (backContent as HTMLElement).scrollTop = 0;
        }
      }
      setIsLikeProcessing(false);
    }, 300);
  };

  const handleDislike = () => {
    if (!currentMusic) return;
    setIsLikeProcessing(true);
    resetSwipeState();

    setTimeout(() => {
      goToNextMusic();
      // 스크롤 위치 초기화
      if (cardRef.current) {
        const backContent = (cardRef.current as HTMLElement).querySelector(".bg-level1");
        if (backContent) {
          (backContent as HTMLElement).scrollTop = 0;
        }
      }
      setIsLikeProcessing(false);
    }, 300);
  };

  const goToNextMusic = () => {
    if (currentIndex < musics.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(musics.length);
    }
  };

  // 현재 음악이 바뀔 때마다 다음 음악 이미지 미리 로드
  useEffect(() => {
    const preloadImages = (startIdx: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const idx = startIdx + i;
        if (idx < musics.length) {
          const img = new Image();
          img.src = musics[idx].albumcover_path;
        }
      }
    };
    if (musics?.length > 0 && currentIndex < musics.length) {
      // 현재 음악 이후 3개 음악 이미지 미리 로드
      preloadImages(currentIndex + 1, 3);
    }
  }, [currentIndex, musics]);

  const formatDuration = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}분 ${seconds}초`;
  };

  return (
    <div className="text-white w-full h-full flex flex-col items-center">
      <TopBar title={titleText} />
      <div className="recommendation-container bg-level2 rounded-2xl w-[calc(100%-20px)] xs:w-[calc(100%-40px)] p-4 h-[calc(var(--app-height)-140px)] overflow-hidden flex flex-col justify-center items-center">
        {isLoading ? (
          <div className="flex flex-col w-full h-full items-center justify-center gap-4">
            <img
              src={mascot}
              alt="mascot"
              className="w-[200px] h-[200px] object-cover rounded-lg animate-bounce"
            />
            <h3 className="text-white text-2xl font-bold text-center">음악을 찾고 있짹!</h3>
          </div>
        ) : currentMusic ? (
          <>
            <div
              ref={cardRef}
              className={`movie-card ${direction} relative cursor-pointer flex-shrink-0 w-full aspect-square`}
              style={{
                transition: swiping ? "none" : "transform 0.3s ease",
                cursor: swiping ? "grabbing" : "grab",
                perspective: "1000px",
                transform: `translateX(${offsetX}px)`,
                userSelect: "none",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onDragStart={(e) => e.preventDefault()}
            >
              {direction && (
                <div
                  className={`direction-indicator ${direction}`}
                  style={{ pointerEvents: "none" }}
                >
                  {direction === "right" ? "좋아요" : "싫어요"}
                </div>
              )}
              <div>
                <div className={"absolute w-full h-full backface-hidden"}>
                  <img
                    src={currentMusic.albumcover_path}
                    alt={currentMusic.track_name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute flex flex-col justify-end bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black via-black/80 via-black/60 via-black/40 to-transparent h-[30%] rounded-b-lg">
                    <div className="flex flex-col gap-0">
                      <span className="text-light-gray text-sm font-light">
                        {currentMusic.artist_name}
                      </span>
                      <h3 className="text-white text-xl font-medium">{currentMusic.track_name}</h3>
                      <div className="flex items-center gap-2 text-light-gray text-sm">
                        <span className="text-base text-light-gray">
                          {currentMusic.release_date.split("-")[0]}년 발매
                        </span>
                        <span className="flex items-center gap-1 text-light-gray">
                          {formatDuration(currentMusic.duration_ms)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swipe-buttons flex justify-evenly w-full">
              <button
                className={`swipe-button dislike-button ${direction === "left" ? "bg-red-500/10" : ""} ${isLikeProcessing ? "opacity-50" : ""}`}
                onClick={handleDislike}
                disabled={isLikeProcessing}
              >
                👎 싫어요
              </button>
              <button
                className={`swipe-button like-button ${direction === "right" ? "bg-green-500/10" : ""} ${isLikeProcessing ? "opacity-50" : ""}`}
                onClick={() =>
                  handleLike(musics[currentIndex].id, musics[currentIndex].recommendMusicId)
                }
                disabled={isLikeProcessing}
              >
                👍 좋아요
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center gap-4">
            <img
              src={mascot}
              alt="mascot"
              className="w-[200px] h-[200px] object-cover rounded-lg"
            />
            <h3 className="text-white text-2xl font-bold text-center">
              추천을 다봤짹.
              <br />
              보관함으로 갈짹?
            </h3>
            <button
              className="bg-main text-white text-lg font-bold px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => navigate(`/recommendations/my/music`)}
            >
              보관함으로 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
