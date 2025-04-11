import DeleteIcon from "../../../assets/icon/delete-icon.svg?react";
import { Track } from "../../../pages/discover/ChoiceMusicAnalysis";

interface SelectMusicListProps {
  selectedTracks: Track[];
  onTrackDelete: (trackId: string) => void;
  onAnalyze: (tracks: Track[]) => void;
}

export default function SelectMusicList({
  selectedTracks,
  onTrackDelete,
  onAnalyze,
}: SelectMusicListProps) {
  return (
    <div className="w-full flex flex-col mt-4 px-[10px] xs:px-5 items-center overflow-hidden">
      <div className="flex flex-col w-full h-[calc(var(--app-height)-264px)] justify-between bg-level2 rounded-lg overflow-y-auto">
        {selectedTracks.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {selectedTracks.map((track) => (
              <li
                key={track.spotifyId}
                className="flex justify-between items-center p-2 border-b border-solid border-border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={track.imageUrl} alt="album cover" className="w-15 h-15 rounded-lg" />
                  <div className="min-w-[120px] flex-1 overflow-hidden">
                    <p className="w-full text-light-gray text-[14px] font-light truncate">
                      {track.artist}
                    </p>
                    <p className="text-white text-[14px] font-medium line-clamp-2 sm:line-clamp-1 sm:text-[16px]">
                      {track.title}
                    </p>
                  </div>
                </div>
                <DeleteIcon
                  className="mr-4 flex-shrink-0 cursor-pointer"
                  onClick={() => onTrackDelete(track.spotifyId)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="pt-10 text-center text-light-gray">선택된 곡이 없습니다.</p>
        )}
      </div>
      <button
        className="w-[160px] h-[40px] mt-5 bg-main rounded-lg cursor-pointer"
        onClick={() => onAnalyze(selectedTracks)}
      >
        <span className="text-white text-base font-medium">분석하기</span>
      </button>
    </div>
  );
}
