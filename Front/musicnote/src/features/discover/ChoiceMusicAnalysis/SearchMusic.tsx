import { useState, useEffect, useRef } from "react";
import { useGetData } from "@/hooks/useApi";
import SearchIcon from "@/assets/icon/search-icon.svg?react";
import { Track } from "@/pages/discover/ChoiceMusicAnalysis";

interface SearchMusicProps {
  onTrackSelect: (track: Track) => void;
  selectedTracks: Track[];
}

export default function SearchMusic({ onTrackSelect, selectedTracks }: SearchMusicProps) {
  const [query, setQuery] = useState("");
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 검색 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Spotify API 인증 토큰

  const { data } = useGetData(
    "searchMusic" + debouncedQuery,
    `/search?q=${encodeURIComponent(debouncedQuery)}&type=track&limit=20`,
    "spotify",
    { enabled: !!debouncedQuery }
  );

  const searchResults = data?.tracks?.items || [];
  // 검색 결과가 있을 때 결과창 표시
  useEffect(() => {
    if (debouncedQuery.trim() && data) {
      setIsResultsVisible(true);
    }
  }, [debouncedQuery, data]);

  // 외부 클릭 시 검색창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        isResultsVisible
      ) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isResultsVisible]);

  const handleTrackSelect = (track: any) => {
    const convertedTrack: Track = {
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      imageUrl: track.album.images[0]?.url || "",
    };
    onTrackSelect(convertedTrack);
    setIsResultsVisible(false);
    inputRef.current?.blur();
  };

  return (
    <div className="w-full px-5 relative" ref={containerRef}>
      <div className="w-full flex justify-between p-2 text-white gap-x-3">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsResultsVisible(true)} // 인풋 클릭 시 결과창 열기
          placeholder="곡을 입력해주세요."
          className="flex-grow outline-none border-white border-b-1 pl-2 pb-[1px]"
        />
        <SearchIcon className="flex-shrink-0 xs:scale-120" />
      </div>

      {isResultsVisible && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-100 mt-2 mx-[20px] bg-level3 rounded-lg shadow-xl max-h-[300px] overflow-y-auto">
          {searchResults.map((track: any) => (
            <div
              key={track.id}
              className={`p-3 cursor-pointer ${
                selectedTracks.some((t) => t.spotifyId === track.id) ? "bg-sub" : ""
              }`}
              onClick={() => handleTrackSelect(track)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={track.album.images[0].url}
                  alt="album cover"
                  className="w-10 h-10 flex-shrink-0"
                />
                <div className="pt-1 min-w-0 overflow-hidden">
                  <p className="text-light-gray font-light text-sm truncate">
                    {track.artists.map((artist: any) => artist.name).join(", ")}
                  </p>
                  <p className="truncate">{track.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
